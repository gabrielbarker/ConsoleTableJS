export default class ColumnExtractor {
  private columns: any = {};
  private rowStrings: string[] = [];

  public printTable(object: any) {
    this.getColumnsFor(object);
    this.replaceNullsWithSpaces();
    this.initialiseRowStrings();
    this.addColumnsToRowStrings();
    this.printRows();
  }

  private getColumnsFor(object: any) {
    const objectFieldKey = Object.keys(object).find(key => typeof object[key] === "object");
    Object.keys(object).forEach(key => {
      if (key !== objectFieldKey) {
        this.addToColumnsForNonObjectFields(key, object, objectFieldKey);
      } else {
        object[objectFieldKey].forEach((obj: any, i: number) => {
          this.getColumnsFor(obj);
        });
      }
    });
  }

  private addToColumnsForNonObjectFields(
    key: string,
    object: any,
    objectFieldKey: string | undefined
  ) {
    if (!this.columns[key]) this.columns[key] = [];
    this.columns[key].push(object[key].toString());
    if (objectFieldKey) {
      const depth = this.depthFromObject(object);
      const numberOfChildObjects = this.numberOfChildObjects(object);
      for (let i = 1; i < depth * numberOfChildObjects; i++) {
        this.columns[key].push(null);
      }
    }
  }

  private depthFromObject(obj: any): number {
    let object = obj;
    let objectFieldKey = Object.keys(object).find((key: any) => typeof object[key] === "object");
    let depth = 0;
    while (objectFieldKey) {
      depth++;
      object = object[objectFieldKey][0];
      objectFieldKey = Object.keys(object).find((key: any) => typeof object[key] === "object");
    }
    return depth;
  }

  private numberOfChildObjects(object: any): number {
    let objectFieldKey = Object.keys(object).find((key: any) => typeof object[key] === "object");
    if (objectFieldKey) return object[objectFieldKey].length;
    return 0;
  }

  private replaceNullsWithSpaces() {
    Object.keys(this.columns).forEach(key => {
      const max = Math.max(
        ...this.columns[key]
          .filter((value: any) => value !== null)
          .map((value: string) => value.length)
      );
      this.columns[key] = this.columns[key].map((value: string) => {
        if (value === null) return " ".repeat(max);
        return value.padEnd(max, " ");
      });
    });
  }

  private addColumnsToRowStrings() {
    Object.keys(this.columns).forEach(key => {
      for (let i = 0; i < this.columns[key].length; i++) {
        this.rowStrings[i] += this.columns[key][i] + " | ";
      }
    });
  }

  private initialiseRowStrings() {
    this.columns[Object.keys(this.columns)[0]].forEach(() => {
      this.rowStrings.push("");
    });
  }

  private printRows() {
    this.rowStrings.forEach(row => console.log(row));
  }
}
