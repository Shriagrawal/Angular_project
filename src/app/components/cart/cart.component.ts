import { Component, EventEmitter, OnInit } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { LocalStorageService } from '../../services/local-storage.service';
import { AssessmentService } from '../../services/assessment.service';
import { EventEmitterService } from '../../services/event-emitter.service';
import { AddToDashboardService } from '../../services/add-to-dashboard.service';
import { userDashboard } from '../../models/userDashboard';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
   cart : Cart[]=[]
   cartItem : Cart = new Cart("","",[],[],0,0)
   cartItemAss : number[] = [];
   arrDash : userDashboard[] = [];
   constructor(private cartservice : CartService,private localstorage:LocalStorageService,private eventemitterservice:EventEmitterService,public addtodashboardservice: AddToDashboardService,public assService:AssessmentService){
    const userId = this.localstorage.getUserId()
  
    this.cartservice.getcart().subscribe(data=>{
      this.cart = data;
      console.log(data);
    })

    for(var i=0;i<this.cart.length;i++)
      {
          if(this.cart[i].id == userId.toString())
            {
              this.cartItem = this.cart[i];
              console.log(this.cartItem);
              break;
            }
      }

    this.cartItemAss = this.cartItem.arrAssessments;
}
  ngOnInit(): void {
     this.addtodashboardservice.getDashboard().subscribe(data=>{
      this.arrDash = data;
     })
    throw new Error('Method not implemented.');
  }

increaseQuantity(assId:number){
   this.cartItem.quantity[assId-1]++;
   this.cartItem.totalQuantity++;
  this.assService.getPrice(assId).subscribe(data =>{
    this.cartItem.total += data
    this.cartservice.updatecart(this.cartItem).subscribe()
  }
  )
}

decreaseQuantity(assId:number){
  this.cartItem.quantity[assId-1]--;
  this.cartItem.totalQuantity--;
  this.assService.getPrice(assId).subscribe(data =>{
    this.cartItem.total -= data
    this.cartservice.updatecart(this.cartItem).subscribe
  }
)
}

onClickCheckOut(quan:number,cartItem:any)
{ 
  alert("CheckedOut")
  this.cartservice.deleteCart(cartItem.id).subscribe(data=>{
    console.log("checkouted from the cart successfully....mic drop")
  })
  this.eventemitterservice.onCheckOut(quan);
  //add ho skta hai ya phir update ho skta hai dashboard 
  const existingDashboard = this.arrDash.find(dash => dash.id == cartItem.id);

  if(existingDashboard) // aldready hai dashboard too jo hai usmein push karo data
    {   //agar mein jo data aaya cartItme mein uske array ke upar loop lga du or phir check karu vo existing cart mein hai ya nhi
        // agar vo assessment present hai too uski quantity increase hogi agar nhi hai too vo add hoga 
        const j = this.cartItem.arrAssessments
        for(var i=0;i<j.length;i++)
          {
            const assExist = existingDashboard.arrAssessments.find(ass => ass == j[i])
            if(assExist)
              {
                existingDashboard.quantity[j[i]-1]++;
              }
              else{ // exist nhi krta too push kro and quantity = 1 karo
                existingDashboard.arrAssessments.push(j[i])
                existingDashboard.quantity[j[i]-1]++;
              }
          }
        this.addtodashboardservice.updateDashboard(existingDashboard).subscribe(data => {
          console.log("ab shi se chl rha hai bhn ..ab chlne de")
        })
    }
    else{  // naya naya dashboard
      this.addtodashboardservice.addAssToDashboard(cartItem).subscribe(data=>{
        console.log(data);
      })
    }
    window.location.reload()
}
}
