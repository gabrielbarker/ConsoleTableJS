import { expect } from "chai";
import "mocha";
import TablePrinter from "../TablePrinter";
import * as TypeMoq from "typemoq";
import ConsoleDisplay from "../ConsoleDisplay";
import Column from "../Column";

describe("TablePrinter: print", () => {
  const rowsInOrderThatTheyWerePrinted: string[] = [];

  const mockDisplay: TypeMoq.IMock<ConsoleDisplay> = TypeMoq.Mock.ofType(ConsoleDisplay);
  mockDisplay.object.print = (row: string) => rowsInOrderThatTheyWerePrinted.push(row);

  const columns = getColumns();

  it("should print a valid table", () => {
    const printer = new TablePrinter(columns, mockDisplay.object);
    printer.print();

    for (let i = 0; i < rowsInOrderThatTheyWerePrinted.length; i++)
      expect(rowsInOrderThatTheyWerePrinted[i]).to.equal(expectedRows[i]);
  });
});

const expectedRows = [
  "|------------|---------------|------------|------------|-------|--------------|",
  "| fileSystem | directoryName | fileName   | type       | count | line numbers |",
  "|------------|---------------|------------|------------|-------|--------------|",
  "| OSX        | directory1    | file name1 | type name1 | 8     | 1, 6         |",
  "|            |               |            | type name2 | 7     | 2, 7         |",
  "|            |               | file name2 | type name3 | 6     | 3, 8         |",
  "|            |               |            | type name4 | 5     | 4, 9         |",
  "|            | directory2    | file name3 | type name5 | 4     | 5, 10        |",
  "|            |               |            | type name6 | 3     | 6, 11        |",
  "|            |               | file name4 | type name7 | 2     | 7, 12        |",
  "|            |               |            | type name8 | 1     | 8, 13        |",
  "|------------|---------------|------------|------------|-------|--------------|"
];

function getColumns() {
  const columns = [];
  columns.push(new Column("fileSystem", firstColumnValues()));
  columns.push(new Column("directoryName", secondColumnValues()));
  columns.push(new Column("fileName", thirdColumnValues()));
  columns.push(new Column("type", fourthColumnValues()));
  columns.push(new Column("count", fifthColumnValues()));
  columns.push(new Column("line numbers", sixthColumnValues()));
  return columns;
}

function firstColumnValues() {
  const columnValues = new Array(8);
  columnValues.fill("");
  columnValues[0] = "OSX";
  return columnValues;
}

function secondColumnValues() {
  const columnValues = new Array(8);
  columnValues.fill("");
  columnValues[0] = "directory1";
  columnValues[4] = "directory2";
  return columnValues;
}

function thirdColumnValues() {
  const columnValues = new Array(8);
  columnValues.fill("");
  for (let i = 0; 2 * i < 8; i++) columnValues[2 * i] = "file name" + (i + 1);
  return columnValues;
}

function fourthColumnValues() {
  const columnValues = new Array(8);
  for (let i = 0; i < 8; i++) columnValues[i] = "type name" + (i + 1);
  return columnValues;
}

function fifthColumnValues() {
  const columnValues = new Array(8);
  for (let i = 0; i < 8; i++) columnValues[i] = `${8 - i}`;
  return columnValues;
}

function sixthColumnValues() {
  const columnValues = new Array(8);
  for (let i = 0; i < 8; i++) columnValues[i] = `${i + 1}, ${i + 6}`;
  return columnValues;
}
