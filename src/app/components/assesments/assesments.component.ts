import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-assesments',
  templateUrl: './assesments.component.html',
  styleUrls: ['./assesments.component.scss'] 
})
export class AssesmentsComponent implements OnInit {
  showDetails: boolean = false;
  detailbuttontext: string = "View Details";
  arrassessment: Assessment[] = [];
  filteredarrassessment :Assessment[] = []
  Assessment: Assessment = new Assessment("", true, "", 0, "", 0, 0, [], "",0);
  cartitem: Cart = new Cart("", "", [],[], 0, 0);
  arrcart: Cart[] = [];
  userId: string = "0";
  currentPage = 1;
  itemsPerPage = 3;
  pagedData: Assessment[] = [];
  admin : boolean = false;
  buttonText : string = "Active"

  constructor(
    public asservice: AssessmentService,
    private cartservice: CartService,
    public localstorageservice: LocalStorageService
  ) {
    if(localstorageservice.getRole() == "admin" || localstorageservice.getRole() == "faculty")
      {
         this.admin = true
      }

  }

  ngOnInit(): void {
    this.userId = this.localstorageservice.getUserId() || "0"; 

    this.asservice.getAssessment().subscribe(data => {
      this.arrassessment = data;
      console.log(this.localstorageservice.getRole());
      if(this.localstorageservice.getRole() == "faculty")
        {   console.log(JSON.parse(this.userId) + "this is userid")
            this.filteredarrassessment = this.arrassessment.filter(each => (each.facultyid) == JSON.parse(this.userId))  
           this.arrassessment = this.filteredarrassessment;  
        }
      this.updatePagedData(); 
    });

    this.cartservice.getcart().subscribe(data => {
      this.arrcart = data || []; 
    });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedData = this.arrassessment.slice(startIndex, endIndex);
  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.updatePagedData();
  }
  addToCart(a: string) {
    const aid = JSON.parse(a);
    let addedtocart = false
    const existingCart = this.arrcart.find(cart => cart.id == this.userId);
  
    if (existingCart) { //agar cart existing hai 
      if(existingCart.quantity[aid-1] > 0)//basically i am checking agar vo ass aldready cart mein hai ya nhi
        {
          existingCart.quantity[aid-1]++;
          existingCart.totalQuantity += 1;
         this.asservice.getPrice(aid).subscribe(data=>{
            existingCart.total += data
            this.cartservice.updatecart(existingCart).subscribe(data=>{
              alert("added to the cart again")
            })
          }) 
        }
        else{
          existingCart.quantity[aid-1] = 1;
          existingCart.arrAssessments.push(aid);
           this.asservice.getPrice(aid).subscribe(data=>{
            existingCart.total += data
            existingCart.totalQuantity += 1;
            this.cartservice.updatecart(existingCart).subscribe(updatedCart => {
             alert("Added to the cart")
           console.log('Cart updated:', updatedCart);
           addedtocart = true;
         })
          })
        }
    } 

    else { // new cart 
      this.cartitem.arrAssessments = [aid];
      this.cartitem.userId = this.userId;
      this.cartitem.id = this.userId; 
      this.cartitem.totalQuantity = 1;
      this.cartitem.quantity[aid-1] = 1;
       this.asservice.getPrice(aid).subscribe(data=>{
        this.cartitem.total = data;
        console.log(data+"this is new cart ke item ka price jo add nhi ho rha");
        this.cartservice.addtocart(this.cartitem).subscribe(newCart => {
          alert("CART CREATED")
          console.log(':', newCart);
          this.arrcart.push(newCart); 
          addedtocart = true;
        });
       })
    }
  }
  
  viewDetails() {
    this.showDetails = !this.showDetails;
    this.detailbuttontext = this.showDetails ? "Hide details" : "View details";
  }

  // Toggle(flag:boolean,aid:string)
  // { 
  //   const i = JSON.parse(aid);
  //   if(!flag)
  //     {
  //     this.pagedData[i-1].flag = !flag
  //     this.asservice.updateAssessment(this.pagedData[i-1]).subscribe()
  //     // this.buttonText = "Inactive"
  //     }
  //     else
  //     {
  //     this.pagedData[i-1].flag = !flag
  //     // this.buttonText = "Active"
  //     this.asservice.updateAssessment(this.pagedData[i-1]).subscribe()
  //     }
  // }
  Toggle(flag: boolean, aid: string) {
    const assessment = this.pagedData.find(ass => ass.id === aid);
  
    if (assessment) {
      assessment.flag = !flag;
      console.log(`Toggled assessment id ${aid} to ${assessment.flag}`);
    }
  }
  
}
