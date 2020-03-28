import { assert } from "chai";
import "mocha";
import ColumnExtractor from "../ColumnExtractor";
import Column from "../Column";

const object = {
  directory: getName(1, 1),
  files: [
    {
      fileName: getName(2, 1),
      invalid: [
        { type: getName(3, 1), count: getName(4, 1), "line numbers": getName(5, 1) },
        { type: getName(3, 2), count: getName(4, 2), "line numbers": getName(5, 2) }
      ]
    },
    {
      fileName: getName(2, 2),
      invalid: [
        { type: getName(3, 3), count: getName(4, 3), "line numbers": getName(5, 3) },
        { type: getName(3, 4), count: getName(4, 4), "line numbers": getName(5, 4) }
      ]
    }
  ]
};

const space = "".padEnd(getName(1, 1).length, " ");
const expectedColumns = [
  new Column("directory", [getName(1, 1), space, space, space]),
  new Column("fileName", [getName(2, 1), space, getName(2, 2), space]),
  new Column("type", [getName(3, 1), getName(3, 2), getName(3, 3), getName(3, 4)]),
  new Column("count", [getName(4, 1), getName(4, 2), getName(4, 3), getName(4, 4)]),
  new Column("line numbers", [getName(5, 1), getName(5, 2), getName(5, 3), getName(5, 4)])
];

describe("ColumnExtractor: getColumns", () => {
  const extractor = new ColumnExtractor(object);
  const columns = extractor.getColumns();
  it("should return the correct columns with spaces", () => {
    assert(columns.length === expectedColumns.length, "wrong number of columns returned");
    for (let i = 0; i < columns.length; i++) assert(areEqual(columns[i], expectedColumns[i]));
  });
});

function getName(level: number, instance: number): string {
  return `level ${level} name ${instance}`;
}

function areEqual(columnA: Column, columnB: Column): boolean {
  if (columnA.getHeader() !== columnB.getHeader()) return false;
  for (let i = 0; i < columnA.getValues().length; i++)
    if (columnA.getValues()[i] !== columnB.getValues()[i]) return false;
  return true;
}
