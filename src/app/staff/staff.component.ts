import { Component, OnInit, Injectable } from '@angular/core';
import { StaffService } from '../service/staff.service';
import { Staff } from '../class/staff';
import { v4 as uuidv4 } from 'uuid';
import { WorkToExcelFileService } from '../service/work-to-excel-file.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent implements OnInit {
  staffs: Staff[] = [];
  staff: Staff = new Staff();
  staffUpdate: Staff = new Staff();
  isSuccess: boolean = false;
  isUpdated: boolean = false;

  checkStaffCode: boolean = false;
  checkName: boolean = false;
  checkAccountFpt: boolean = false;
  checkAccountFe: boolean = false;
  checkStaffCodeDuplicate: boolean = false;
  checkAccountFptDuplicate: boolean = false;
  checkAccountFeDuplicate: boolean = false;

  checkNameUpdate: boolean = false;
  checkAccountFptUpdate: boolean = false;
  checkAccountFeUpdate: boolean = false;
  checkAccountFptUpdateDuplicate: boolean = false;
  checkAccountFeUpdateDuplicate: boolean = false;

  checkValidForm: string | boolean = false;
  checkValidFormUpdate: string | boolean = true;

  constructor(private staffService: StaffService, private excelFile: WorkToExcelFileService) {}

  ngOnInit(): void {
    this.staffService.getAllStaffs().subscribe((data) => {
      this.staffs = data;
    });
  }

  edit(item: Staff): void {
    this.staffUpdate = item;
  }

  changeStatus(item: Staff): void {
    if (item.status == 1) {
      item.status = 0;
    } else {
      item.status = 1;
    }

    this.staffService.updateStaff(item).subscribe(() => {
      this.staffService.getAllStaffs().subscribe((data) => {
        this.staffs = data;
      });
    });
  }

  onSubmit(): void {
    this.staff.id = uuidv4();
    this.staff.createdDate = new Date().getTime();
    this.staff.lastModifiedDate = new Date().getTime();
    this.staff.status = 1;
    this.staffService.addStaff(this.staff).subscribe(() => {
      this.staffService.getAllStaffs().subscribe((data) => {
        this.staffs = data;
        this.isSuccess = true;
        this.autoCloseAlert();
      });
    });
  }

  autoCloseAlert(): void {
    setTimeout(() => {
      this.isSuccess = false;
    }, 3000); // Auto-close after 3 seconds

    setTimeout(() => {
      this.isUpdated = false;
    }, 3000); // Auto-close after 3 seconds
  }

  close(): void {
    this.staff = new Staff();
    this.isSuccess = false;
    this.checkStaffCode = false;
    this.checkName = false;
    this.checkAccountFpt = false;
    this.checkAccountFe = false;
    this.checkStaffCodeDuplicate = false;
    this.checkAccountFptDuplicate = false;
    this.checkAccountFeDuplicate = false;
  }

  check_StaffCode(): void {
    let staffCode = document.getElementById('staffCode') as HTMLInputElement;

    if (
      staffCode.value.trim() == '' ||
      staffCode.value.trim() == undefined ||
      staffCode.value.length >= 15
    ) {
      this.checkStaffCode = true;
      this.checkStaffCodeDuplicate = false;
    } else {
      this.staffService
        .checkStaffCodeDuplicate(staffCode.value.trim())
        .subscribe((data) => {
          if (data == true) {
            this.checkStaffCode = false;
            this.checkStaffCodeDuplicate = true;
          } else {
            this.checkStaffCode = false;
            this.checkStaffCodeDuplicate = false;
          }
        });
    }
    this.checkValid_Form();
  }

  check_Name(): void {
    let staffName = document.getElementById('name') as HTMLInputElement;
    if (
      staffName.value.trim() == '' ||
      staffName.value.trim() == undefined ||
      staffName.value.length >= 100
    ) {
      this.checkName = true;
    } else {
      this.checkName = false;
    }
    this.checkValid_Form();
  }

  check_AccountFpt(): void {
    let accountFpt = document.getElementById('accountFpt') as HTMLInputElement;
    if (
      accountFpt.value.trim() == '' ||
      accountFpt.value.trim() == undefined ||
      !accountFpt.value.trim().endsWith('@fpt.edu.vn') ||
      accountFpt.value.trim().length >= 100 ||
      accountFpt.value.includes(' ')
    ) {
      this.checkAccountFpt = true;
      this.checkAccountFptDuplicate = false;
    } else {
      this.staffService
        .checkStaffAccountFptDuplicate(accountFpt.value.trim())
        .subscribe((data) => {
          if (data == true) {
            this.checkAccountFpt = false;
            this.checkAccountFptDuplicate = true;
          } else {
            this.checkAccountFpt = false;
            this.checkAccountFptDuplicate = false;
          }
        });
    }
    this.checkValid_Form();
  }

  check_AccountFe(): void {
    let accountFe = document.getElementById('accountFe') as HTMLInputElement;
    if (
      accountFe.value.trim() == '' ||
      accountFe.value.trim() == undefined ||
      !accountFe.value.trim().endsWith('@fe.edu.vn') ||
      accountFe.value.trim().length >= 100 ||
      accountFe.value.includes(' ')
    ) {
      this.checkAccountFe = true;
      this.checkAccountFeDuplicate = false;
    } else {
      this.staffService
        .checkStaffAccountFeDuplicate(accountFe.value.trim())
        .subscribe((data) => {
          if (data == true) {
            this.checkAccountFe = false;
            this.checkAccountFeDuplicate = true;
          } else {
            this.checkAccountFe = false;
            this.checkAccountFeDuplicate = false;
          }
        });
    }
    this.checkValid_Form();
  }

  checkValid_Form(): void {
    // Kiểm tra xem các trường có hợp lệ hay không
    const isValidFields =
      this.staff.staffCode?.trim() &&
      this.staff.name?.trim() &&
      this.staff.accountFpt?.trim() &&
      this.staff.accountFe?.trim();

    // Kiểm tra xem tất cả các cờ xác nhận đều là false
    const isNoValidationErrors =
      !this.checkStaffCode &&
      !this.checkName &&
      !this.checkAccountFpt &&
      !this.checkAccountFe &&
      !this.checkStaffCodeDuplicate &&
      !this.checkAccountFptDuplicate &&
      !this.checkAccountFeDuplicate;

    // Cả hai điều kiện đều cần phải đúng để form hợp lệ
    this.checkValidForm = isValidFields && isNoValidationErrors;
  }

  check_NameUpdate(): void {
    let staffNameUpdate = document.getElementById('tenNV') as HTMLInputElement;

    if (
      staffNameUpdate.value.trim() == '' ||
      staffNameUpdate.value.trim() == undefined ||
      staffNameUpdate.value.length >= 100
    ) {
      this.checkNameUpdate = true;
    } else {
      this.checkNameUpdate = false;
    }
    this.checkValid_FormUpdate();
  }

  check_AccountFptUpdate(): void {
    let accountFpt = document.getElementById('mailFpt') as HTMLInputElement;
    if (
      accountFpt.value.trim() == '' ||
      accountFpt.value.trim() == undefined ||
      !accountFpt.value.trim().endsWith('@fpt.edu.vn') ||
      accountFpt.value.trim().length >= 100 ||
      accountFpt.value.includes(' ')
    ) {
      this.checkAccountFptUpdate = true;
      this.checkAccountFptUpdateDuplicate = false;
    } else {
      this.staffService
        .getStaffByStaffCode(this.staffUpdate.staffCode)
        .subscribe((data) => {
          if (data.accountFpt == this.staffUpdate.accountFpt) {
            this.checkAccountFptUpdate = false;
            this.checkAccountFptUpdateDuplicate = false;
          } else {
            this.staffService
              .checkStaffAccountFeDuplicate(accountFpt.value.trim())
              .subscribe((data) => {
                if (data == true) {
                  this.checkAccountFptUpdate = false;
                  this.checkAccountFptUpdateDuplicate = true;
                }
              });
          }
        });
    }
    this.checkValid_Form();
  }

  check_AccountFeUpdate(): void {
    let accountFe = document.getElementById('mailFe') as HTMLInputElement;
    if (
      accountFe.value.trim() == '' ||
      accountFe.value.trim() == undefined ||
      !accountFe.value.trim().endsWith('@fe.edu.vn') ||
      accountFe.value.trim().length >= 100 ||
      accountFe.value.includes(' ')
    ) {
      this.checkAccountFeUpdate = true;
      this.checkAccountFeUpdateDuplicate = false;
    } else {
      this.staffService
        .getStaffByStaffCode(this.staffUpdate.staffCode)
        .subscribe((data) => {
          if (data.accountFe == this.staffUpdate.accountFe) {
            this.checkAccountFeUpdate = false;
            this.checkAccountFeUpdateDuplicate = false;
          } else {
            this.staffService
              .checkStaffAccountFeDuplicate(accountFe.value.trim())
              .subscribe((data) => {
                if (data == true) {
                  this.checkAccountFeUpdate = false;
                  this.checkAccountFeUpdateDuplicate = true;
                }
              });
          }
        });
    }
    this.checkValid_Form();
  }

  checkValid_FormUpdate(): void {
    // Kiểm tra xem các trường có hợp lệ hay không
    const isValidFields =
      this.staffUpdate.staffCode?.trim() &&
      this.staffUpdate.name?.trim() &&
      this.staffUpdate.accountFpt?.trim() &&
      this.staffUpdate.accountFe?.trim();

    // Kiểm tra xem tất cả các cờ xác nhận đều là false
    const isNoValidationErrors =
      !this.checkNameUpdate &&
      !this.checkAccountFptUpdate &&
      !this.checkAccountFeUpdate &&
      !this.checkAccountFptUpdateDuplicate &&
      !this.checkAccountFeUpdateDuplicate;

    // Cả hai điều kiện đều cần phải đúng để form hợp lệ
    this.checkValidForm = isValidFields && isNoValidationErrors;
  }

  onSubmitUpdate(): void {
    this.staffService.updateStaff(this.staffUpdate).subscribe(() => {
      this.staffService.getAllStaffs().subscribe((data) => {
        this.staffs = data;
        this.isUpdated = true;
        this.autoCloseAlert();
      });
    })
  }

  exportToExcel(): void {
    // Define the headers
    const headers = ['STT', 'Mã nhân viên', 'Họ tên', 'Email FPT', 'Email FE', 'Bộ môn - Chuyên ngành'];

    // Define the sample data row
    const sampleData = [1, 'ST001', 'Nguyen Van A', 'example@fpt.edu.vn', 'example@fe.edu.vn', 'Bộ môn 1 - Chuyên ngành 1'];

    // Create a worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, sampleData]);

    // Create a workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template');

    // Export the workbook to a file
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'Template_Export');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
