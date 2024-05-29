export const convDashedStrsToCapCase = (s: string): string => {
  const strs = s.split("-");
  return capCase(strs.join(" "))

}

export const capCase = (s: string): string => {
  const strs = s.split(" ");
  let out = ""
  for (let i = 0; i < strs.length; i++) {
    let str = strs[i];
    out += str.charAt(0).toUpperCase() + str.substring(1) + (i === strs.length - 1 ? "" : " ")
  }
  return out;
}
