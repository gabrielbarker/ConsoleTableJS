export default class Column {
  private header: string;
  private values: string[];

  constructor(header: string, values: string[]) {
    this.header = header;
    this.values = values;
    this.fixWidth();
  }

  public getHeader() {
    return this.header;
  }

  public getValues() {
    return this.values;
  }

  private fixWidth() {
    const maxWidth = this.getMaxWidth();
    this.header = this.header.padEnd(maxWidth, " ");
    this.values = this.values.map(value => value.padEnd(maxWidth, " "));
  }

  private getMaxWidth(): number {
    return Math.max(this.header.length, Math.max(...this.values.map(v => v.length)));
  }
}
