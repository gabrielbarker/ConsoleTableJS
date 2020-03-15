import TableStyle from "./TableStyle";

export default class TableStyleBuilder {
  private spaceStart: string = " ";
  private spaceEnd: string = " ";
  private verticalLine: ":" | "|" = "|";
  private horizontalLine: "-" | "=" = "-";

  public withNumberOfSpacesAtStartOfColumns(spaces: number): TableStyleBuilder {
    this.spaceStart = " ".repeat(spaces);
    return this;
  }

  public withNumberOfSpacesAtEndOfColumns(spaces: number): TableStyleBuilder {
    this.spaceEnd = " ".repeat(spaces);
    return this;
  }

  public withVerticalLineStyle(style: "|" | ":"): TableStyleBuilder {
    this.verticalLine = style;
    return this;
  }

  public withHorizontalLineStyle(style: "-" | "="): TableStyleBuilder {
    this.horizontalLine = style;
    return this;
  }

  public build(): TableStyle {
    return new TableStyle(this.spaceStart, this.spaceEnd, this.verticalLine, this.horizontalLine);
  }
}
