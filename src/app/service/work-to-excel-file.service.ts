import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class WorkToExcelFileService {

  constructor() { }

  exportTemplate(headers: string[], fileName: string): void {
    // Create a new workbook and add a sheet
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([headers]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate Excel file and save it
    const wbout: Blob = new Blob(
      [XLSX.write(wb, { bookType: 'xlsx', type: 'array' })],
      { type: 'application/octet-stream' }
    );
    saveAs(wbout, `${fileName}.xlsx`);
  }
  
}
