import { MaxAnn } from "../../components/MaxAnns/types";
import { sectionAnnouncements } from "../../utils/announcements"
import { announcement } from "../data/announcements.data"

//@ts-ignore
global.Image = class MockImage {
  src: string
  constructor(src: string) {
    this.src = src
  }

}

const getAnns = (count = 3) => {
  let out = [];
  for (let i = 0; i < count; i++) {
    var ann = {
      ...announcement,
      image: new Image()
    };
    out.push(ann as MaxAnn)
  }
  return out;
}



describe("Test Announcement Utilities", () => {
  test("Section Announcements Should return 1 page with 3 announcements", () => {
    expect(sectionAnnouncements(getAnns(3)).anns).toHaveLength(1)
    expect(sectionAnnouncements(getAnns(3)).totalPages).toBe(1)
  })
  test("Section Announcements Should return 3 pages with 8 announcements (last one has 2)", () => {
    expect(sectionAnnouncements(getAnns(8)).anns).toHaveLength(3)
    expect(sectionAnnouncements(getAnns(8)).totalPages).toBe(3)
  })
})
