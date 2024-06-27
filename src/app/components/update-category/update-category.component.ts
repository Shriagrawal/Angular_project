import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  arrCat: Category[] = [];
  updateCatForm : FormGroup
  tempcat : Category = new Category("","")
  constructor(private categoryservice:CategoryService, private fb:FormBuilder){
     this.categoryservice.getCategories().subscribe(data=>{
      this.arrCat = data;
     })

     this.updateCatForm = this.fb.group({
      Catdes:[''],
      id:['']
     })
  }
  updateForm(frmValue : any){
    console.log(frmValue)
    const selectedCategoryId = frmValue.id;
    const updatedCatDescription = frmValue.Catdes;
    for(var i=0;i<this.arrCat.length;i++)
      {
        if(this.arrCat[i].id == selectedCategoryId)
          {
            this.tempcat = this.arrCat[i];
          }
      }
    if(this.tempcat){
      this.tempcat.catDescription = updatedCatDescription;
      this.tempcat.id = selectedCategoryId
    }
    this.categoryservice.updateCategory(this.tempcat).subscribe(data=>{
      console.log("ho gya update")
    })
  }
  change(event: any) {
    const selectedCategoryId = event.target.value;
    const selectedCategory = this.arrCat.find(cat => cat.id === selectedCategoryId);

    if (selectedCategory) {
      this.updateCatForm.get('Catdes')?.setValue(selectedCategory.catDescription);
    } 
  }

}
