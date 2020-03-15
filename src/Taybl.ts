import TableStyleBuilder from "./TableStyleBuilder";
import { VerticalLineCharacter, HorizontalLineCharacter } from "./TableStyleBuilder";
import ObjectValidator from "./ObjectValidator";
import ColumnExtractor from "./ColumnExtractor";
import Column from "./Column";
import TablePrinter from "./TablePrinter";

export default class Taybl {
  private columns: Column[];
  private styleBuilder: TableStyleBuilder = new TableStyleBuilder();
  private validator: ObjectValidator = new ObjectValidator();

  constructor(object: any) {
    if (this.validator.isValid(object)) {
      this.columns = new ColumnExtractor(object).getColumns();
    } else throw "Invalid Object";
  }

  public print(): void {
    const printer = new TablePrinter(this.columns, this.styleBuilder.build());
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
}
