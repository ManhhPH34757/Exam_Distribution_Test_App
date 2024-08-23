import { Department } from "./department";
import { Facility } from "./facility";
import { Staff } from "./staff";

export class DepartmentFacility {
  id!: string;
  status!: number;
  createdDate!: number;
  lastModifiedDate!: number;
  idDepartment!: Department;
  idFacility!: Facility;
  idStaff!: Staff;
}
