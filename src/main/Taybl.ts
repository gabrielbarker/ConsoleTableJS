import TableStyleBuilder from "./TableStyleBuilder";
import { VerticalLineCharacter, HorizontalLineCharacter } from "./TableStyleBuilder";
import ObjectValidator from "./ObjectValidator";
import ColumnExtractor from "./ColumnExtractor";
import Column from "./Column";
import TablePrinter from "./TablePrinter";
import ConsoleDisplay from "./ConsoleDisplay";

export default class Taybl {
  private columns: Column[];
  private styleBuilder: TableStyleBuilder = new TableStyleBuilder();
  private validator: ObjectValidator = new ObjectValidator();

  constructor(object: any) {
    object = this.wrapArrayInObject(object);
    if (this.validator.isValid(object)) this.columns = new ColumnExtractor(object).getColumns();
    else throw this.validator.getMessage();
  }

  public print(): void {
    const printer = new TablePrinter(this.columns, new ConsoleDisplay(), this.styleBuilder.build());
    printer.print();
  }

  public withNumberOfSpacesAtStartOfColumns(spaces: number): Taybl {
    this.styleBuilder = this.styleBuilder.withNumberOfSpacesAtStartOfColumns(spaces);
    return this;
  }

  public withNumberOfSpacesAtEndOfColumns(spaces: number): Taybl {
    this.styleBuilder = this.styleBuilder.withNumberOfSpacesAtEndOfColumns(spaces);
    return this;
  }

  public withVerticalLineStyle(style: VerticalLineCharacter): Taybl {
    this.styleBuilder = this.styleBuilder.withVerticalLineStyle(style);
    return this;
  }

  public withHorizontalLineStyle(style: HorizontalLineCharacter): Taybl {
    this.styleBuilder = this.styleBuilder.withHorizontalLineStyle(style);
    return this;
  }

  public withTopLine(drawTopLine: boolean): Taybl {
    this.styleBuilder = this.styleBuilder.withTopLine(drawTopLine);
    return this;
  }

  private wrapArrayInObject(object: any): any {
    return Array.isArray(object) ? { dummyField: object } : object;
  }
}
