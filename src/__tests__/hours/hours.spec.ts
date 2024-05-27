import { Center } from "../../components/topbox/hours/center.model";
import { PartialDay, partialDays } from "../../utils/datetime";
import { constantHours, dynamicHours } from "../data/hours.data"

describe("Test Center class for correct hours calculations", () => {
  test("Constant Hours Center should be close", () => {
    var cHours = { ...constantHours };
    cHours.hours.all = [
      "00:00",
      "00:00"
    ]
    var center = new Center(cHours.name, cHours.hours);
    expect(center.isOpen()).toBe(false)
  })
  test("Constant Hours Center should be open", () => {
    var cHours = { ...constantHours };
    cHours.hours.all = [
      "00:00",
      "23:59"
    ]
    var center = new Center(cHours.name, cHours.hours);
    expect(center.isOpen()).toBe(true)
  })
  test("Dynamic Hours Center should be closed", () => {
    var notTodayDay = new Date().getDay();
    if (notTodayDay === 0) {
      notTodayDay = 1
    } else if (notTodayDay === 6) {
      notTodayDay = 5
    } else {
      notTodayDay++
    }
    var day = partialDays[notTodayDay] as PartialDay
    var dHours = { ...dynamicHours };
    dHours.hours = {
      [day]: [
        "10:00",
        "11:00"
      ]
    }
    var center = new Center(dHours.name, dHours.hours);
    expect(center.isOpen()).toBe(false)
  })
  test("Dynamic Hours Center should be open", () => {
    var todayDay = new Date().getDay();
    var day = partialDays[todayDay] as PartialDay
    var dHours = { ...dynamicHours };
    dHours.hours = {
      [day]: [
        "00:00",
        "23:59"
      ]
    }
    var center = new Center(dHours.name, dHours.hours);
    expect(center.isOpen()).toBe(true)
  })
})
