export type MinimizedAnnouncement = {
  duration: number,
  expirationDate: number,
  expires: boolean,
  heading: string,
  image: string,
  subheads: string[]
  details: string[]
  docId: string
  updatedAt?: number | Date
  createdAt: number | Date

}
