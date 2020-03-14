export default class ObjectValidator {
  private valid: boolean = true;
  private object: any;

  public isValid(object: any) {
    this.object = object;
    this.validateEachFieldLevel();
    return this.valid;
  }

  private validateEachFieldLevel() {
    let numberOfObjectFields = this.numberOfObjectFields();
    while (this.valid && numberOfObjectFields > 0) {
      numberOfObjectFields = this.numberOfObjectFields();
      this.validateFieldLevel(numberOfObjectFields);
    }
  }

  private validateFieldLevel(numberOfObjectFields: number) {
    if (numberOfObjectFields > 1) this.validateMultipleObjectFields();
    else if (numberOfObjectFields === 1) this.object = this.getObjectField();
  }

  private validateMultipleObjectFields() {
    if (Array.isArray(this.object)) this.validateArrayContainsOneType();
    else this.valid = false;
  }

  private validateArrayContainsOneType() {
    const type = typeof this.object[0];
    if (this.object.every((value: any) => typeof value === type)) {
      this.validateArrayOfObjectsContainsOneType();
    } else this.valid = false;
  }

  private validateArrayOfObjectsContainsOneType() {
    if (typeof this.object[0] === "object") {
      this.validateKeyStringsMatch();
      this.object = this.object[0];
    }
  }

  private validateKeyStringsMatch() {
    const keysString = Object.keys(this.object[0]).join("");
    if (!this.object.every((obj: any) => Object.keys(obj).join("") === keysString))
      this.valid = false;
  }

  private numberOfObjectFields(): number {
    const fields = this.getFields();
    return fields.filter(field => typeof field === "object" && field !== null).length;
  }

  private getObjectField(): string | undefined {
    const fields: string[] = this.getFields();
    return fields.find(field => typeof field === "object" && field !== null);
  }

  private getFields(): string[] {
    return Object.keys(this.object).map(key => this.object[key]);
  }
}
