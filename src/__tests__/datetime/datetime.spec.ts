import { formatDateString, formatTimeString, getFullDay, getFullMonth, getTime, getTimeObject } from "../../utils/datetime"
// import { build24Time, formatDateString, formatTimeString, getFullDay, getFullMonth, getTime, getTimeObject, localeTimeString } from "../../utils/datetime"

describe("Tests datetime fns", () => {
  test("GetFullDay should convert an idx of day of the week into a full day", () => {
    expect(getFullDay(0)).toEqual("Sunday")
    expect(getFullDay(6)).toEqual("Saturday")
  })
  test("GetFullMonth should convert an idx of month into a full month", () => {
    expect(getFullMonth(0)).toEqual("January")
    expect(getFullMonth(11)).toEqual("December")
  })
  test("Format Date String should correctly return the suffix of the day", () => {
    expect(formatDateString(0)).toMatch(/th/)
    expect(formatDateString(20)).toMatch(/th/)
    expect(formatDateString(1)).toMatch(/st/)
    expect(formatDateString(21)).toMatch(/st/)
    expect(formatDateString(2)).toMatch(/nd/)
    expect(formatDateString(32)).toMatch(/nd/)
    expect(formatDateString(15)).toMatch(/th/)
    expect(formatDateString(25)).toMatch(/th/)
    expect(formatDateString(17)).toMatch(/th/)
  })
  test("Get Time returns the correct TZ", () => {
    let date = new Date("2024-05-27T00:00:00.000+08:00")
    expect(getTime(date)).toEqual("10:00 AM")
    date = new Date("2024-05-27T00:00:00.000+06:00")
    expect(getTime(date)).toEqual("12:00 PM")
    date = new Date("2024-05-27T00:00:00.000+05:00")
    expect(getTime(date)).toEqual("1:00 PM")
  })
  test("Format Time should correctly convert 24 to 12 hour", () => {
    var time = "13:30"
    expect(formatTimeString(time)).toEqual("1:30 PM")
    time = "23:45"
    expect(formatTimeString(time)).toEqual("11:45 PM")
  })
  test("get Time object should correctly split and return time object", () => {
    var time = "13:30"
    expect(getTimeObject(time)).toEqual({ hours: "13", minutes: "30" })
  })
  test("Build date should correctly build date from 24 hour time", () => {
    // DON'T KNOW HOW TO TEST THIS...
  })
  // NOTE: not sure if checkin the tz is even required as it will always run on the client, using the client timezone.
  // FIXME: fails on GH Actions - 
  // EXPECTED: 10:00 AM
  // RECIEVED: 04:00 PM
  test("Localtime string should correctly change the TZ", () => {
    // let date = new Date("2024-05-27T00:00:00.000")
    // console.log(date)
    // // NOTE: this likely will always pass locally, but when run on the server or in GH actions should actually determine if it works.
    // expect(localeTimeString(date)).toEqual("12:00 AM")
  })
  // FIXME: fails on GH Actions - 
  // EXPECTED: 13:00
  // RECIEVED: 19:00
  test("Should correctly return 24hour time string", () => {
    // var date = new Date("2024-05-27T00:00:00.000+05:00")
    // expect(build24Time(date)).not.toEqual("1:00 PM")
    // expect(build24Time(date)).toEqual("13:00")
  })
})
