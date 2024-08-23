import { MajorFacility } from "./major-facility";
import { Staff } from "./staff";

export class StaffMajorFacility {
  id!: string;
  status!: number;
  createdDate!: number;
  lastModifiedDate!: number;
  idMajorFacility!: MajorFacility;
  idStaff!: Staff;
}
