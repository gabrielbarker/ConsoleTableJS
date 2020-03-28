import Messages from "./Messages";

export default class ObjectValidator {
  private valid: boolean = true;
  private message: string = "";
  private object: any;

  public isValid(object: any) {
    this.resetState();
    this.object = this.wrapArrayInObject(object);
    this.validateEachFieldLevel();
    return this.valid;
  }

  public getMessage(): string {
    return this.message;
  }

  private wrapArrayInObject(object: any) {
    return Array.isArray(object) ? { dummyField: object } : object;
  }

  private validateEachFieldLevel() {
    while (this.valid && this.getArrayFields().length > 0) this.validateFieldLevel();
  }

  private validateFieldLevel() {
    const arrayFields = this.getArrayFields();
    this.validateArrayFields(arrayFields);
    if (this.valid) this.object = arrayFields[0][0];
  }

  private validateArrayFields(arrayFields: any[]) {
    if (arrayFields.length > 1) this.invalidate(Messages.ONE_ARRAY_FIELD_PER_OBJECT);
    else if (arrayFields.length === 1) this.validateArrayContainsOneType(arrayFields[0]);
  }

  private validateArrayContainsOneType(array: any[]) {
    if (array.every((value: any) => typeof value === "object")) this.validateKeyStringsMatch(array);
    else this.invalidate(Messages.ARRAY_FIELD_MUST_CONTAIN_OBJECTS);
  }

  private validateKeyStringsMatch(array: any[]) {
    const keysString = Object.keys(array[0]).join("");
    if (!array.every((obj: any) => Object.keys(obj).join("") === keysString))
      this.invalidate(Messages.ARRAY_FIELDS_MUST_HAVE_ONE_TYPE);
  }

  private invalidate(message: string) {
    this.valid = false;
    this.message = message;
  }

  private getArrayFields(): any[] {
    const fields = Object.keys(this.object).map(key => this.object[key]);
    return fields.filter(field => Array.isArray(field) && field !== null);
  }

  private resetState() {
    this.valid = true;
    this.message = "";
  }
}
