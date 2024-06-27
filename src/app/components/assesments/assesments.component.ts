import { Component, OnInit } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-assesments',
  templateUrl: './assesments.component.html',
  styleUrls: ['./assesments.component.scss'] // Fix typo from styleUrl to styleUrls
})
export class AssesmentsComponent implements OnInit {
  showDetails: boolean = false;
  detailbuttontext: string = "View Details";
  arrassessment: Assessment[] = [];
  Assessment: Assessment = new Assessment("", true, 0, 0, "", "", 0, [], "",0);
  cartitem: Cart = new Cart("", "", [],[], 0, 0);
  arrcart: Cart[] = [];
  userId: string = "0";
  currentPage = 1;
  itemsPerPage = 3;
  pagedData: Assessment[] = [];

  constructor(
    private asservice: AssessmentService,
    private cartservice: CartService,
    private localstorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.localstorage.getUserId() || "0"; 

    this.asservice.getAssessment().subscribe(data => {
      this.arrassessment = data;
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
  async addToCart(aid: number) {
    let addedtocart = false
    const existingCart = this.arrcart.find(cart => cart.id == this.userId);
  
    if (existingCart) { //agar cart existing hai 
      if(existingCart.quantity[aid-1])//basically i am checking agar vo ass aldready cart mein hai ya nhi
        {
          existingCart.quantity[aid-1]++;
         this.asservice.getPrice(aid).subscribe(data=>{
            existingCart.total += data
          }) 
          var price =  this.asservice.getPrice(aid);
          console.log(price)
          console.log(existingCart.total +" : ye tha total or ye jo add hua "+ this.asservice.getPrice(aid))
        }
        else{
          existingCart.quantity[aid-1] = 1;
          existingCart.arrAssessments.push(aid);
           this.asservice.getPrice(aid).subscribe(data=>{
            existingCart.total += data
          })
        }
        existingCart.totalQuantity += 1;
         this.cartservice.updatecart(existingCart).subscribe(updatedCart => {
        console.log('Cart updated:', updatedCart);
        addedtocart = true;
      })
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
       })
      this.cartservice.addtocart(this.cartitem).subscribe(newCart => {
        console.log('New cart created:', newCart);
        this.arrcart.push(newCart); 
        addedtocart = true;
      });
    }
  }
  
  viewDetails() {
    this.showDetails = !this.showDetails;
    this.detailbuttontext = this.showDetails ? "Hide details" : "View details";
  }
}
