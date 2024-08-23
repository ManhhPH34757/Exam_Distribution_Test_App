import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../class/staff';
import { StaffMajorFacility } from '../class/staff-major-facility';
import { Facility } from '../class/facility';
import { Department } from '../class/department';
import { Major } from '../class/major';
import { DepartmentFacility } from '../class/department-facility';
import { MajorFacility } from '../class/major-facility';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private staffAPI: string = 'http://localhost:8080/api/staffs';

  private facilityAPI: string = 'http://localhost:8080/api/facilities';

  private departmentAPI: string = 'http://localhost:8080/api/departments';

  private majorAPI: string = 'http://localhost:8080/api/majors';

  private departmentFacilityAPI: string = 'http://localhost:8080/api/department-facilities';

  private majorFacilityAPI: string = 'http://localhost:8080/api/major-facilities';

  private staffMajorFacilityAPI: string = 'http://localhost:8080/api/staffs-majors-facilities';

  constructor(private httpClient: HttpClient) { }

  public getAllStaffs(): Observable<Staff[]> {
    return this.httpClient.get<Staff[]>(this.staffAPI);
  }

  public addStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.post<Staff>(this.staffAPI, staff);
  }

  public updateStaff(staff: Staff): Observable<Staff> {
    return this.httpClient.put<Staff>(this.staffAPI + "/" + staff.id, staff);
  }

  public checkStaffCodeDuplicate(staffCode: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.staffAPI + "/check-code/" + staffCode);
  }

  public checkStaffAccountFptDuplicate(accountFpt: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.staffAPI + "/check-email-fpt/" + accountFpt);
  }

  public checkStaffAccountFeDuplicate(accountFe: string): Observable<boolean> {
    return this.httpClient.get<boolean>(this.staffAPI + "/check-email-fe/" + accountFe);
  }

  public getStaffByStaffCode(staffCode: string): Observable<Staff> {
    return this.httpClient.get<Staff>(this.staffAPI + "/code/" + staffCode);
  }

  public getStaffById(id: string): Observable<Staff> {
    return this.httpClient.get<Staff>(this.staffAPI + "/id/" + id);
  }

  public getStaffMajorFacility(id: string): Observable<StaffMajorFacility[]> {
    return this.httpClient.get<StaffMajorFacility[]>(this.staffAPI + "/" + id + "/staff-major-facility");
  }

  public getFacilities(id: string): Observable<Facility[]> {
    return this.httpClient.get<Facility[]>(this.facilityAPI + "/" + id);
  }

  public getDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(this.departmentAPI);
  }

  public getMajors(): Observable<Major[]> {
    return this.httpClient.get<Major[]>(this.majorAPI);
  }

  public saveDepartmentFacility(departmentFacility: DepartmentFacility): Observable<DepartmentFacility> {
    return this.httpClient.post<DepartmentFacility>(this.departmentFacilityAPI, departmentFacility);
  }

  public saveMajorFacility(majorFacility: MajorFacility): Observable<MajorFacility> {
    return this.httpClient.post<MajorFacility>(this.majorFacilityAPI, majorFacility);
  }

  public saveStaffMajorFacility(staffMajorFacility: StaffMajorFacility): Observable<StaffMajorFacility> {
    return this.httpClient.post<StaffMajorFacility>(this.staffMajorFacilityAPI, staffMajorFacility);
  }

  public getDepartmentFacility(): Observable<DepartmentFacility> {
    return this.httpClient.get<DepartmentFacility>(this.departmentFacilityAPI);
  }

  public getMajorFacility(): Observable<MajorFacility> {
    return this.httpClient.get<MajorFacility>(this.majorFacilityAPI);
  }

  public deleteStaffMajorFacility(id: String): Observable<void> {
    return this.httpClient.delete<void>(this.staffMajorFacilityAPI + "/" + id);
  }

}
