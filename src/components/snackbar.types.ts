export type Snack = {
  duration: number,
  heading: string,
  body: string
  isError: boolean
  open: boolean
}
export const emptySnack = {
  duration: 0,
  heading: "",
  body: "",
  isError: false,
  open: false
}
