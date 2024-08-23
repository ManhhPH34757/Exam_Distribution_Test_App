import { DepartmentFacility } from "./department-facility";
import { Major } from "./major";

export class MajorFacility {
  id!: string;
  status!: number;
  createdDate!: number;
  lastModifiedDate!: number;
  idDepartmentFacility!: DepartmentFacility;
  idMajor!: Major;
}
