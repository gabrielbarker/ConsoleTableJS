import Column from "./Column";

export default class TablePrinter {
  private columns: Column[] = [];
  private tableRows: string[] = [];

  constructor(columns: Column[]) {
    this.columns = columns;
    this.addHeaderToRows();
    this.addValuesToRows();
    this.addFinalLine();
  }

  public print() {
    this.tableRows.forEach(row => console.log(row));
  }

  private addHeaderToRows(): void {
    for (let i = 0; i < 3; i++) this.tableRows.push("|");
    this.columns.forEach(column => this.addColumnHeaderToRows(column));
  }

  private addValuesToRows(): void {
    const numberOfValues = this.columns[0].getValues().length;
    for (let i = 0; i < numberOfValues; i++) this.tableRows.push("|");
    this.columns.forEach(column => this.addColumnValuesToRows(column));
  }

  private addColumnHeaderToRows(column: Column): void {
    const maxLength = Math.max(column.getHeader().length);
    this.tableRows[0] += "".padEnd(maxLength, "-") + "-|";
    this.tableRows[1] += column.getHeader() + " |";
    this.tableRows[2] += "".padEnd(maxLength, "-") + "-|";
  }

  private addColumnValuesToRows(column: Column): void {
    column.getValues().forEach((value, index) => (this.tableRows[index + 3] += value + " |"));
  }

  private addFinalLine() {
    this.tableRows.push("|");
    this.columns.forEach(column => this.addSectionToFinalLine(column));
  }

  private addSectionToFinalLine(column: Column) {
    const lastIndex = this.tableRows.length - 1;
    const width = column.getHeader().length;
    this.tableRows[lastIndex] += "".padEnd(width, "-") + "-|";
  }
}
