import { Component } from '@angular/core';
import { Assessment } from '../../models/assessment';
import { AssessmentService } from '../../services/assessment.service';
@Component({
  selector: 'app-assesments',
  templateUrl: './assesments.component.html',
  styleUrl: './assesments.component.scss'
})
export class AssesmentsComponent {
  arrassessment : Assessment[] = []

  constructor(private asservice : AssessmentService)
  {
      this.arrassessment = this.asservice.getAssessment();
  }

  currentPage = 1;
  itemsPerPage = 3;
  pagedData: Assessment[] = [];

  ngOnInit() {
    this.updatePagedData();
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

}
