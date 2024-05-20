import { MaxAnn as IMaxAnn } from "../components/MaxAnns/types";
export const sectionAnnouncements = (anns: IMaxAnn[]): { anns: IMaxAnn[][], totalPages: number } => {
  const out = [];
  var page = [];
  const PAGE_SIZE = 3; // NOTE: maybe make this part of the config?
  for (let a of anns) {
    if (page.length >= PAGE_SIZE) {
      out.push(page);
      page = [];
    }
    page.push(a)
  }
  if (page.length > 0) {
    out.push(page);
  }
  return { anns: out, totalPages: out.length };
}
