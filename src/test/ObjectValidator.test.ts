import { assert } from "chai";
import "mocha";
import ObjectValidator from "../ObjectValidator";

describe("ObjectValidator: isValid", () => {
  it("should return true for valid objects", () => {
    const object = {
      firstField: "first field value",
      objectField: [{ secondField: "second field value1" }, { secondField: "second field value2" }]
    };
    const validator = new ObjectValidator();
    const valid = validator.isValid(object);
    assert(valid);
  });

  it("should return true for array of valid objects", () => {
    const object = [
      {
        fileName: "file name1",
        invalid: [
          { type: "type name1", count: 6, "line numbers": "7, 18" },
          { type: "type name2", count: 2, "line numbers": "17, 9" }
        ]
      },
      {
        fileName: "file name2",
        invalid: [
          { type: "type name3", count: 0, "line numbers": "28" },
          { type: "type name4", count: 3, "line numbers": "1, 9, 12" }
        ]
      }
    ];
    const validator = new ObjectValidator();
    const valid = validator.isValid(object);
    assert(valid);
  });

  it("should return false for invalid valid objects", () => {
    const object = {
      fileName: "file name1",
      invalid: [
        { type: "type name1", count: 6, "line numbers": "7, 18" },
        { type: "type name2", otherField: 2, "line numbers": "17, 9" }
      ]
    };
    const validator = new ObjectValidator();
    const valid = validator.isValid(object);
    assert(!valid);
  });
});
