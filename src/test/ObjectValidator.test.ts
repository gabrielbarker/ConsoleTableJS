import { assert, expect } from "chai";
import "mocha";
import ObjectValidator from "../main/ObjectValidator";
import Messages from "../main/Messages";

describe("ObjectValidator: isValid - with valid objects", () => {
  it("should return true for valid objects", () => {
    const validator = new ObjectValidator();
    const valid = validator.isValid(VALID_OBJECT);
    assert(valid);
  });

  it("should return true for array of valid objects", () => {
    const validator = new ObjectValidator();
    const valid = validator.isValid(ARRAY_OF_VALID_OBJECTS);
    assert(valid);
  });
});

describe("ObjectValidator: isValid, getMessage - with invalid objects", () => {
  it("should return false for objects with different fields", () => {
    const validator = new ObjectValidator();
    const valid = validator.isValid(IVALID_OBJECT_DIFFERENT_FIELDS);
    assert(!valid, "Arrays contianing objects with different fields should be invalid");
    expect(validator.getMessage()).to.equal(Messages.ARRAY_FIELDS_MUST_HAVE_ONE_TYPE);
  });

  it("should return false for objects with multiple array fields", () => {
    const validator = new ObjectValidator();
    const valid = validator.isValid(IVALID_OBJECT_MULTIPLE_ARRAY_FIELDS);
    assert(!valid, "Objects with more than one array field should be invalid");
    expect(validator.getMessage()).to.equal(Messages.ONE_ARRAY_FIELD_PER_OBJECT);
  });

  it("should return false for objects whose array fields contain primitives", () => {
    const validator = new ObjectValidator();
    const valid = validator.isValid(IVALID_OBJECT_ARRAY_WITH_PRIMITIVES);
    assert(!valid, "Objects more than one array field should be invalid");
    expect(validator.getMessage()).to.equal(Messages.ARRAY_FIELD_MUST_CONTAIN_OBJECTS);
  });
});

const VALID_OBJECT = {
  firstField: "first field value",
  objectField: [{ secondField: "second field value1" }, { secondField: "second field value2" }]
};

const ARRAY_OF_VALID_OBJECTS = [
  {
    firstField: "first field value1",
    objectField: [{ secondField: "second field value1" }, { secondField: "second field value2" }]
  },
  {
    firstField: "first field value2",
    objectField: [{ secondField: "second field value3" }, { secondField: "second field value4" }]
  }
];

const IVALID_OBJECT_DIFFERENT_FIELDS = {
  fileName: "file name1",
  invalid: [
    { type: "type name1", count: 6, "line numbers": "7, 18" },
    { type: "type name2", otherField: 2, "line numbers": "17, 9" }
  ]
};

const IVALID_OBJECT_MULTIPLE_ARRAY_FIELDS = {
  fileName: "file name1",
  invalid: [
    { type: "type name1", count: 6, "line numbers": "7, 18" },
    { type: "type name2", otherField: 2, "line numbers": "17, 9" }
  ],
  valid: [
    { type: "type name1", count: 6, "line numbers": "7, 18" },
    { type: "type name2", otherField: 2, "line numbers": "17, 9" }
  ]
};

const IVALID_OBJECT_ARRAY_WITH_PRIMITIVES = {
  fileName: "file name1",
  invalid: ["value1", "value2", "value3"]
};
