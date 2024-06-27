import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
   arrCategory: Category [] = [];
   tempcategory : Category = new Category("","");
  addCategoryForm : FormGroup;
  maxCatId : string = "0";
   constructor(private fb:FormBuilder,private categoryservice:CategoryService){
    this.addCategoryForm = this.fb.group({
      catdescription:['']
    })
    this.categoryservice.getCategories().subscribe(data =>{
      this.arrCategory = data;
    })
      for(var i=0;i<this.arrCategory.length;i++)
        {
          if(this.arrCategory[i].id > this.maxCatId)
            {
              this.maxCatId = this.arrCategory[i].id + 1
            }
   }
  
}
addCategory(frmValue : any){
  this.tempcategory.id = this.maxCatId;
  this.tempcategory.catDescription = frmValue.catdescription;
  this.categoryservice.addCategory(this.tempcategory).subscribe(data=>{
    console.log("add ho gyi category :" +  data)
  })
}
}
