
// maybe I should instead check the updatedAt field to determine if diff.

export function isDiff(current: Element[], incoming: Element[]): boolean {
  if (current.length !== incoming.length) {
    return true
  }
  var curr = current.map(c => JSON.stringify(c));
  var inc = incoming.map(c => JSON.stringify(c));
  let isDiff = false;

  var seen: { [key: string]: boolean } = {};
  for (let id of curr) {
    seen[id] = true;
  }

  for (let id of inc) {
    if (!seen[id]) {
      isDiff = true;
      break;
    }
  }
  return isDiff

}
// this one is definetly ideal, but I didnt add the updatedAt field to minimizedAnnouncements... so I have to stringify via the method above for announcements.
interface Element {
  updatedAt?: number | Date
  createdAt: number | Date
  docId: string
}
const buildKey = (el: Element) => {
  var id = el.docId;
  var time = el.updatedAt || el.createdAt
  return `${id}:${time}`
}
export function isDiffV2(current: Element[], incoming: Element[]): boolean {
  if (current.length !== incoming.length) {
    console.log(`[isDiffV2]: returned: true`)
    return true
  }
  var curr = current.map(buildKey);
  var inc = incoming.map(buildKey);
  console.log(`[isDiffV2]: curr: `, curr, " inc: ", inc)
  let isDiff = false;

  var seen: { [key: string]: boolean } = {};
  for (let id of curr) {
    seen[id] = true;
  }

  for (let id of inc) {
    if (!seen[id]) {
      isDiff = true;
      break;
    }
  }
  console.log(`[isDiffV2]: returned: ${isDiff}`)
  return isDiff

}
