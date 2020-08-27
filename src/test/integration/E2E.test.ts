import { expect } from "chai";
import "mocha";
import Taybl from "../..";

describe("System", () => {
  const rowsInOrderThatTheyWerePrinted: string[] = [];
  console.log = () => (row: string) => rowsInOrderThatTheyWerePrinted.push(row);

  const tayblObject = getTaybleObject();
  const taybl: Taybl = new Taybl(tayblObject)
    .withHorizontalLineStyle("=")
    .withVerticalLineStyle(":")
    .withNumberOfSpacesAtEndOfColumns(3)
    .withNumberOfSpacesAtStartOfColumns(4);

  it("should print a valid table", () => {
    const expectedRows: string[] = getExpectedRows();
    taybl.print();
    for (let i = 0; i < rowsInOrderThatTheyWerePrinted.length; i++)
      expect(rowsInOrderThatTheyWerePrinted[i]).to.equal(expectedRows[i]);
  });

  it("should print without top line", () => {
    const expectedRows: string[] = getExpectedRows().slice(1);
    taybl.withTopLine(false).print();
    for (let i = 0; i < rowsInOrderThatTheyWerePrinted.length; i++)
      expect(rowsInOrderThatTheyWerePrinted[i]).to.equal(expectedRows[i]);
  });
});

function getExpectedRows(): string[] {
  return [
    ":=================:====================:=================:=================:============:===================:",
    ":   fileSystem    :   directoryName    :   fileName      :   type          :   count    :   line numbers    :",
    ":=================:====================:=================:=================:============:===================:",
    ":   OSX           :   directory1       :   file name1    :   type name1    :   8        :   1, 6            :",
    ":                 :                    :                 :   type name2    :   7        :   2, 7            :",
    ":                 :                    :   file name2    :   type name3    :   6        :   3, 8            :",
    ":                 :                    :                 :   type name4    :   5        :   4, 9            :",
    ":                 :   directory2       :   file name3    :   type name5    :   4        :   5, 10           :",
    ":                 :                    :                 :   type name6    :   3        :   6, 11           :",
    ":                 :                    :   file name4    :   type name7    :   2        :   7, 12           :",
    ":                 :                    :                 :   type name8    :   1        :   8, 13           :",
    ":=================:====================:=================:=================:============:===================:",
  ];
}

function getTaybleObject(): {} {
  return {
    fileSystem: "OSX",
    directories: [
      {
        directoryName: "directory1",
        directory: [
          {
            fileName: "file name1",
            invalid: [
              { type: "type name1", count: 8, "line numbers": "1, 6" },
              { type: "type name2", count: 7, "line numbers": "2, 7" },
            ],
          },
          {
            fileName: "file name2",
            invalid: [
              { type: "type name3", count: 6, "line numbers": "3, 8" },
              { type: "type name4", count: 5, "line numbers": "4, 9" },
            ],
          },
        ],
      },
      {
        directoryName: "directory2",
        directory: [
          {
            fileName: "file name3",
            invalid: [
              { type: "type name5", count: 4, "line numbers": "5, 10" },
              { type: "type name6", count: 3, "line numbers": "6, 11" },
            ],
          },
          {
            fileName: "file name4",
            invalid: [
              { type: "type name7", count: 2, "line numbers": "7, 12" },
              { type: "type name8", count: 1, "line numbers": "8, 13" },
            ],
          },
        ],
      },
    ],
  };
}
