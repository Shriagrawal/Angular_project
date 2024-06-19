import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent{
 a =20;
 b =15;

 constructor()
 {}

 myfunc(){
  return true;
 }
}
