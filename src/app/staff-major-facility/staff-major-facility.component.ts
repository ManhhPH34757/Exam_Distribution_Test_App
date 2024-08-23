import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from '../service/staff.service';
import { Staff } from '../class/staff';
import { StaffMajorFacility } from '../class/staff-major-facility';
import { Facility } from '../class/facility';
import { Department } from '../class/department';
import { Major } from '../class/major';
import { NgForm } from '@angular/forms';
import { DepartmentFacility } from '../class/department-facility';
import { v4 as uuidv4 } from 'uuid';
import { MajorFacility } from '../class/major-facility';

@Component({
  selector: 'app-staff-major-facility',
  templateUrl: './staff-major-facility.component.html',
  styleUrl: './staff-major-facility.component.css',
})
export class StaffMajorFacilityComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService
  ) {}

  staffId!: string;
  staff: Staff = new Staff();

  facilities: Facility[] = [];
  departments: Department[] = [];
  majors: Major[] = [];

  staffMajorFacilitys: StaffMajorFacility[] = [];

  departmentFacility: DepartmentFacility = new DepartmentFacility();
  majorFacility: MajorFacility = new MajorFacility();
  staffMajorFacility: StaffMajorFacility = new StaffMajorFacility();

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.staffId = params.get('id')!;
      this.staffService.getStaffById(this.staffId).subscribe((data) => {
        this.staff = data;
        this.staffService
          .getStaffMajorFacility(this.staffId)
          .subscribe((data) => {
            this.staffMajorFacilitys = data;
            this.staffService.getFacilities(this.staffId).subscribe((data) => {
              this.facilities = data;
            });
          });
      });
    });
  }

  changeFacilities(): void {
    let facility = document.getElementById('facility') as HTMLSelectElement;
    if (facility.value != '') {
      this.staffService.getDepartments().subscribe((data) => {
        this.departments = data;
        this.staffService.getMajors().subscribe((data) => {
          this.majors = data;
        });
      });
    }
  }

  submit(staffForm: NgForm): void {
    const facility = staffForm.value.facility; // Lấy đối tượng facility từ form
    const department = staffForm.value.department; // Lấy đối tượng department từ form
    const major = staffForm.value.major; // Lấy đối tượng major từ form
    // Gọi API để thêm mới StaffMajorFacility
    this.departmentFacility.id = uuidv4();
    this.departmentFacility.idFacility = facility;
    this.departmentFacility.idDepartment = department;
    this.departmentFacility.idStaff = this.staff;
    this.departmentFacility.createdDate = new Date().getTime();
    this.departmentFacility.lastModifiedDate = new Date().getTime();
    this.departmentFacility.status = 1;

    this.majorFacility.id = uuidv4();
    this.majorFacility.idMajor = major;
    this.majorFacility.idDepartmentFacility = this.departmentFacility;
    this.majorFacility.createdDate = new Date().getTime();
    this.majorFacility.lastModifiedDate = new Date().getTime();
    this.majorFacility.status = 1;

    this.staffMajorFacility.id = uuidv4();
    this.staffMajorFacility.idStaff = this.staff;
    this.staffMajorFacility.idMajorFacility = this.majorFacility;
    this.staffMajorFacility.createdDate = new Date().getTime();
    this.staffMajorFacility.lastModifiedDate = new Date().getTime();
    this.staffMajorFacility.status = 1;

    this.staffService
      .saveDepartmentFacility(this.departmentFacility)
      .subscribe(() => {
        this.staffService
          .saveMajorFacility(this.majorFacility)
          .subscribe(() => {
            this.staffService
              .saveStaffMajorFacility(this.staffMajorFacility)
              .subscribe(() => {
                this.route.paramMap.subscribe((params) => {
                  this.staffId = params.get('id')!;
                  this.staffService.getStaffById(this.staffId).subscribe((data) => {
                    this.staff = data;
                    this.staffService
                      .getStaffMajorFacility(this.staffId)
                      .subscribe((data) => {
                        this.staffMajorFacilitys = data;
                        this.staffService.getFacilities(this.staffId).subscribe((data) => {
                          this.facilities = data;
                        });
                      });
                  });
                });
              });
          });
      });
  }

  remove(item: StaffMajorFacility) {
    this.staffService.deleteStaffMajorFacility(item.id).subscribe(() => {
      this.route.paramMap.subscribe((params) => {
        this.staffId = params.get('id')!;
        this.staffService.getStaffById(this.staffId).subscribe((data) => {
          this.staff = data;
          this.staffService
            .getStaffMajorFacility(this.staffId)
            .subscribe((data) => {
              this.staffMajorFacilitys = data;
              this.staffService.getFacilities(this.staffId).subscribe((data) => {
                this.facilities = data;
              });
            });
        });
      });
    })
  }
}
