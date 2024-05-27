import { isDiff, isDiffV2 } from "../../utils/stateDiff"

var element = {
  updatedAt: 0,
  createdAt: 0,
  docId: "0"
}
describe("Test isDiff V1", () => {
  test("Should default return true for diff lens", () => {
    var d1 = [{ ...element }, { ...element, docId: "1" }]
    var d2 = [{ ...element }, { ...element, docId: "1" }, { ...element, docId: "2" }]
    expect(isDiff(d1, d2)).toBe(true)
  })
  test("Should return false for identical data", () => {
    var d1 = [{ ...element }, { ...element, docId: "1" }]
    var d2 = [{ ...element }, { ...element, docId: "1" }]
    // var d2 = [{ ...element }, { ...element, docId: "1" }, { ...element, docId: "2" }]
    expect(isDiff(d1, d2)).toBe(false)
  })
  test("Should return true for same len data, but diff content", () => {
    var d1 = [{ ...element }, { ...element, docId: "1" }]
    var d2 = [{ ...element }, { ...element, docId: "2" }]
    expect(isDiff(d1, d2)).toBe(true)
  })
  test("Should return true for same len data, but diff additional content", () => {
    var d1 = [{ ...element }, { ...element, docId: "1", test: false }]
    var d2 = [{ ...element }, { ...element, docId: "1", test: true }]
    expect(isDiff(d1, d2)).toBe(true)
  })
})

describe("Test isDiff V2", () => {
  test("Should default return true for diff lens", () => {
    var d1 = [{ ...element }, { ...element, docId: "1" }]
    var d2 = [{ ...element }, { ...element, docId: "1" }, { ...element, docId: "2" }]
    expect(isDiffV2(d1, d2)).toBe(true)
  })
  test("Should return false for identical data", () => {
    var d1 = [{ ...element }, { ...element, docId: "1" }]
    var d2 = [{ ...element }, { ...element, docId: "1" }]
    expect(isDiffV2(d1, d2)).toBe(false)
  })
  test("Should return false for same len data, but diff additional content (v2 does not check content, just updatedAt)", () => {
    var d1 = [{ ...element }, { ...element, docId: "1", test: false }]
    var d2 = [{ ...element }, { ...element, docId: "1", test: true }]
    expect(isDiffV2(d1, d2)).toBe(false)
  })
  test("Should return false for same len data, but diff docId, and creation data", () => {
    var d1 = [{ ...element }, { ...element, docId: "1", updatedAt: 2, createdAt: 1 }]
    var d2 = [{ ...element }, { ...element, docId: "1", updatedAt: 1, createdAt: 1 }]
    expect(isDiffV2(d1, d2)).toBe(true)
    var d1 = [{ ...element }, { ...element, docId: "1", updatedAt: 1, createdAt: 1 }]
    var d2 = [{ ...element }, { ...element, docId: "2", updatedAt: 1, createdAt: 1 }]
    expect(isDiffV2(d1, d2)).toBe(true)
  })
})
