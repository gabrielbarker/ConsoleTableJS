import Display from "./Display";

export default class ConsoleDisplay implements Display {
  public print(row: string): void {
    console.log(row);
  }
}
