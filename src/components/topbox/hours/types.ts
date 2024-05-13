import { PartialDay } from "../../../utils/datetime"

export type THour = {
  name: string,
  hours: Hours
}

export type ConstantHours = {
  all: string[]
}
export type DynamicHours = {
  [key in PartialDay]: string[]
}
export type Hours = ConstantHours | DynamicHours

