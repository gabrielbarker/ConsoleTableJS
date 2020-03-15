export default class TableStyle {
  public readonly spaceStart: string;
  public readonly spaceEnd: string;
  public readonly verticalLine: ":" | "|";
  public readonly horizontalLine: "-" | "=";

  constructor(
    spaceStart: string,
    spaceEnd: string,
    verticalLine: ":" | "|",
    horizontalLine: "-" | "="
  ) {
    this.spaceStart = spaceStart;
    this.spaceEnd = spaceEnd;
    this.verticalLine = verticalLine;
    this.horizontalLine = horizontalLine;
  }
}
