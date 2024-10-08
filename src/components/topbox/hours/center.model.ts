import { PartialDay, formatTimeString, partialDays } from "../../../utils/datetime";
import { ConstantHours, Hours } from "./types";

type Time = {
  h: number, m: number
}

export class Center {
  name: string;
  private hours: Hours;
  start: string;
  end: string;
  closedToday: boolean

  constructor(name: string, hours: Hours) {
    this.name = name;
    this.hours = hours;
    const { s, e } = this.getStartAndEnd(hours);
    this.start = formatTimeString(`${s.h}:${s.m}`);
    this.end = formatTimeString(`${e.h}:${e.m}`);
    this.closedToday = false;
  }
  private getStartAndEnd(hours: Hours): { s: Time, e: Time } {
    if (this.isConstantHours(hours)) {
      const [start, end] = hours.all
      const [sHour, sMin] = start.split(':')
      const [eHour, eMin] = end.split(':')
      const s = { h: +sHour, m: +sMin };
      const e = { h: +eHour, m: +eMin };
      return { s, e }
    }
    const today = partialDays[new Date().getDay()] as PartialDay;
    const todayHours = hours[today];
    if (!todayHours) {
      this.closedToday = true;
      const s = { h: 0, m: 0 };
      const e = { h: 0, m: 0 };
      return { s, e }
    }
    const [start, end] = todayHours
    const [sHour, sMin] = start.split(':')
    const [eHour, eMin] = end.split(':')
    const s = { h: +sHour, m: +sMin };
    const e = { h: +eHour, m: +eMin };
    return { s, e }
  }


  private isConstantHours(hours: Hours = this.hours): hours is ConstantHours {
    return "all" in hours;
  }

  private calcIsOpen(s: Time, e: Time): boolean {
    if (this.closedToday) {
      return false;
    }
    let now = new Date();
    let start = new Date();
    start.setHours(s.h);
    start.setMinutes(s.m)
    let end = new Date();
    end.setHours(e.h)
    end.setMinutes(e.m)
    return start <= now && now <= end
  }

  isOpen(): boolean {
    const { s, e } = this.getStartAndEnd(this.hours);
    if (this.isConstantHours(this.hours)) {
      return this.calcIsOpen(s, e)
    }
    const today = partialDays[new Date().getDay()];
    if (!this.hours[today]) {
      return false;
    }
    return this.calcIsOpen(s, e)
  }
}
