import TableStyle from "./TableStyle";

export type VerticalLineCharacter = ":" | "|" | "||" | " ";
export type HorizontalLineCharacter = "-" | "=" | "_" | " ";

export default class TableStyleBuilder {
  private spaceStart: string = " ";
  private spaceEnd: string = " ";
  private verticalLine: VerticalLineCharacter = "|";
  private horizontalLine: HorizontalLineCharacter = "-";

  public withNumberOfSpacesAtStartOfColumns(spaces: number): TableStyleBuilder {
    this.spaceStart = " ".repeat(spaces);
    return this;
  }

  public withNumberOfSpacesAtEndOfColumns(spaces: number): TableStyleBuilder {
    this.spaceEnd = " ".repeat(spaces);
    return this;
  }

  public withVerticalLineStyle(style: VerticalLineCharacter): TableStyleBuilder {
    this.verticalLine = style;
    return this;
  }

  public withHorizontalLineStyle(style: HorizontalLineCharacter): TableStyleBuilder {
    this.horizontalLine = style;
    return this;
  }

  public build(): TableStyle {
    return new TableStyle(this.spaceStart, this.spaceEnd, this.verticalLine, this.horizontalLine);
  }
}
