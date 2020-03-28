import Column from "./Column";
import TableStyle from "./TableStyle";
import TableStyleBuilder from "./TableStyleBuilder";
import Display from "./Display";

export default class TablePrinter {
  private display: Display;
  private columns: Column[] = [];
  private tableRows: string[] = [];
  private style: TableStyle;

  constructor(columns: Column[], display: Display, style?: TableStyle) {
    this.columns = columns;
    this.display = display;
    this.style = style || new TableStyleBuilder().build();
    this.addHeaderToRows();
    this.addValuesToRows();
    this.addFinalLine();
  }

  public print(): void {
    this.tableRows.forEach(row => this.display.print(row));
  }

  private addHeaderToRows(): void {
    for (let i = 0; i < 3; i++) this.tableRows.push(this.style.verticalLine);
    this.columns.forEach(column => this.addColumnHeaderToRows(column));
  }

  private addValuesToRows(): void {
    const numberOfValues = this.columns[0].getValues().length;
    for (let i = 0; i < numberOfValues; i++) this.tableRows.push(this.style.verticalLine);
    this.columns.forEach(column => this.addColumnValuesToRows(column));
  }

  private addColumnHeaderToRows(column: Column): void {
    const headerText: string = this.addSpaces(column.getHeader());
    const topAndBottomLine = this.getHorizontalLineOfLength(headerText.length);
    this.tableRows[0] += topAndBottomLine + this.style.verticalLine;
    this.tableRows[1] += headerText + this.style.verticalLine;
    this.tableRows[2] += topAndBottomLine + this.style.verticalLine;
  }

  private addColumnValuesToRows(column: Column): void {
    column.getValues().forEach((value, index) => {
      const row = this.addSpaces(value) + this.style.verticalLine;
      this.tableRows[index + 3] += row;
    });
  }

  private addFinalLine(): void {
    this.tableRows.push(this.style.verticalLine);
    this.columns.forEach(column => this.addSectionToFinalLine(column));
  }

  private addSectionToFinalLine(column: Column): void {
    const last = this.tableRows.length - 1;
    const width = this.addSpaces(column.getHeader()).length;
    this.tableRows[last] += this.getHorizontalLineOfLength(width) + this.style.verticalLine;
  }

  private addSpaces(value: string): string {
    return this.style.spaceStart + value + this.style.spaceEnd;
  }

  private getHorizontalLineOfLength(length: number): string {
    return "".padEnd(length, this.style.horizontalLine);
  }
}
