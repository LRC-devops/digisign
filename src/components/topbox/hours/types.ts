import { PartialDay } from "../../../utils/datetime"

export type THour = {
  name: string,
  hours: Hours
}

export type ConstantHours = {
  all: string[]
}
// export type DynamicHours = {
//   // Su?: string[]
//   // M?: string[]
//   // Tu?: string[]
//   // W?: string[]
//   // Th?: string[]
//   // F?: string[]
//   // Sa?: string[]
//   [key in PartialDay]: string[]
// }
export type DynamicHours = Partial<Record<PartialDay, string[]>>;
export type Hours = ConstantHours | DynamicHours

