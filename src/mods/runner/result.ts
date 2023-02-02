export class Result {

  constructor(
    readonly message: string,
    readonly samples: number,
    readonly average: number,
  ) { }

  /**
   * How much faster is this compared to other
   * @param other 
   * @returns 
   */
  ratio(other: Result) {
    return other.average / this.average
  }
}