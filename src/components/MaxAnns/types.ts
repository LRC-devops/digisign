export type Config = {
  interval: number,
  count: number,
  totalRuntime: number
  currentPage: number,
  totalPages: number
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
