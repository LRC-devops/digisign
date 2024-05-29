import { capCase, convDashedStrsToCapCase } from "../../utils/strings"

describe("Tests strings utils", () => {
  test("Should return friendly name for dashed string", () => {
    expect(convDashedStrsToCapCase("this-is-a-test")).toEqual("This is a Test")
    expect(convDashedStrsToCapCase("testing-if-word-capitalization-works")).toEqual("Testing if Word Capitalization Works")
  })
  test("Should not return friendly name for underscore string", () => {
    expect(convDashedStrsToCapCase("this_is_a_test")).toEqual("This_is_a_test")
  })
  test("Should correctly Cap Case string", () => {
    expect(capCase("hello world")).toEqual("Hello World")
    expect(capCase("echo hello world this is a test")).toEqual("Echo Hello World This is a Test")
  })
})
