export type Config = {
  interval: number,
  count: number,
  totalRuntime: number
  currentPage: number,
  totalPages: number
  runtimes: number[]
  running: boolean
}
export const emptyConfig = {
  interval: 0,
  count: 0,
  totalRuntime: 0,
  currentPage: 0,
  totalPages: 0,
  runtimes: [0],
  running: false,
}

export type MaxAnn = {
  disableAnimation: boolean,
  duration: number,
  heading: string,
  imageUrl: string,
  image: HTMLImageElement,
  paragraph: string,
  subhead: string
  name: string
} 
