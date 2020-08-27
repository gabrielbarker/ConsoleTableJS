export default class TableStyle {
  public readonly spaceStart: string;
  public readonly spaceEnd: string;
  public readonly verticalLine: string;
  public readonly horizontalLine: string;
  public readonly drawTopLine: boolean;

  constructor(
    spaceStart: string,
    spaceEnd: string,
    verticalLine: string,
    horizontalLine: string,
    drawTopLine: boolean
  ) {
    this.spaceStart = spaceStart;
    this.spaceEnd = spaceEnd;
    this.verticalLine = verticalLine;
    this.horizontalLine = horizontalLine;
    this.drawTopLine = drawTopLine;
  }
}
