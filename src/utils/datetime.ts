// VARS
export const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
export const partialDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"] as const;
export const fullMonths = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] as const;
export type Day = typeof fullDays[number]
export type Month = typeof fullMonths[number]
export type PartialDay = typeof partialDays[number]

export const getFullDay = (intDay: number): Day => {
  return fullDays[intDay]
}

export const getFullMonth = (intMonth: number): Month => {
  return fullMonths[intMonth]
}

export const formateDateString = (date: number): string => {
  // check for teens => always ends in 'th'

  if (date >= 10 && date <= 19) {
    return `${date}th`
  }
  const suffixes: { [key: number]: string } = {
    0: "th",
    1: 'st',
    2: 'nd',
    3: 'rd',
    4: 'th',
    5: 'th',
    6: 'th',
    7: 'th',
    8: 'th',
    9: 'th'
  }
  var split = String(date).split('');
  const lastNum = +split[split.length - 1];

  return `${date}${suffixes[lastNum]}`
}

export const getTime = (date: Date): string => {
  var hours = date.getHours();
  var minutes = date.getMinutes()

  if (hours <= 12) {
    return `${hours}:${minutes} AM`
  }
  return `${hours - 12}:${minutes} PM`
}
export const formatTimeString = (time: string): string => {
  let [h, m] = time.split(':');
  if (+m < 10) {
    m = `0${m}`
  }
  if (+h <= 12) {
    return `${h}:${m} AM`
  }
  return `${+h - 12}:${m} PM`
}

