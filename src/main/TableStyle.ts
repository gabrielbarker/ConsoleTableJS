export default class TableStyle {
  public readonly spaceStart: string;
  public readonly spaceEnd: string;
  public readonly verticalLine: string;
  public readonly horizontalLine: string;

  constructor(spaceStart: string, spaceEnd: string, verticalLine: string, horizontalLine: string) {
    this.spaceStart = spaceStart;
    this.spaceEnd = spaceEnd;
    this.verticalLine = verticalLine;
    this.horizontalLine = horizontalLine;
  }
}
