export class Result {

  constructor(
    readonly message: string,
    readonly samples: number,
    readonly average: number,
  ) { }

  ratio(other: Result) {
    return this.average / other.average
  }
}