export default class Column {
  private header: string;
  private values: string[];

  constructor(header: string, values: string[]) {
    this.header = header;
    this.values = values;
  }

  public getHeader() {
    return this.header;
  }

  public getValues() {
    return this.values;
  }
}
