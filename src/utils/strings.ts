const dontCap: { [key: string]: boolean } = {
  "a": true,
  "an": true,
  "and": true,
  "as": true,
  "at": true,
  "but": true,
  "by": true,
  "for": true,
  "if": true,
  "in": true,
  "is": true,
  "nor": true,
  "of": true,
  "on": true,
  "or": true,
  "so": true,
  "the": true,
  "to": true,
  "up": true,
  "yet": true
};

export const convDashedStrsToCapCase = (s: string): string => {
  const strs = s.split("-");
  return capCase(strs.join(" "))

}

export const capCase = (s: string): string => {
  const strs = s.split(" ");
  let out = ""
  for (let i = 0; i < strs.length; i++) {
    let str = strs[i];
    if (i !== 0 && dontCap[str]) {
      // dont cap word
      out += str + (i === strs.length - 1 ? "" : " ")
      continue;
    }
    // do cap word
    out += str.charAt(0).toUpperCase() + str.substring(1) + (i === strs.length - 1 ? "" : " ")
  }
  return out;
}
