import type { BaseModel } from ".";

export interface GuardModel extends BaseModel {
  startDate: Date;
  endDate: Date;
  pharmacies: [];
}
