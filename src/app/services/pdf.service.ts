import { Injectable } from '@angular/core';
import * as jspdf from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePdf(data: any[], fileName: string): void {
    const pdf = new jspdf.jsPDF();

    let yPosition = 10; 

    data.forEach((item, index) => {
      pdf.text(`${index + 1}. ${item}`, 10, yPosition);
      yPosition += 10; 
    });

    pdf.save(`${fileName}.pdf`);
  }
}
