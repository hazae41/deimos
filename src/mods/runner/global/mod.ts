import { Context } from "../context/mod.ts";
import { Result } from "../result/mod.ts";

export class BenchError extends Error { }

export interface BenchParams {
  readonly samples?: number,
  readonly warmup?: boolean
}

export async function bench(message: string, closure: (context: Context) => Promise<void>, params: BenchParams = {}): Promise<Result> {
  try {
    const { samples = 1_000_000, warmup = true } = params

    const context = new Context(message)

    if (warmup) {
      const warmups = new Array<number>(samples)

      for (let i = 0; i < samples; i++) {
        const start = performance.now()
        await closure(context)
        const end = performance.now()

        const result = (end - start)
        warmups[i] = result
      }
    }

    const results = new Array<number>(samples)

    let minimum = Number.MAX_SAFE_INTEGER
    let maximum = 0

    let sum = 0

    for (let i = 0; i < samples; i++) {
      const start = performance.now()
      await closure(context)
      const end = performance.now()

      const result = (end - start)
      results[i] = result

      if (result < minimum)
        minimum = result
      if (result > maximum)
        maximum = result
      sum += result
    }

    const average = sum / samples

    return new Result(message, samples, average, minimum, maximum, results)
  } catch (cause: unknown) {
    throw new BenchError(message, { cause })
  }
}

export function benchSync(message: string, closure: (context: Context) => void, params: BenchParams = {}): Result {
  try {
    const { samples = 1_000_000, warmup = true } = params

    const context = new Context(message)

    if (warmup) {
      const warmups = new Array<number>(samples)

      for (let i = 0; i < samples; i++) {
        const start = performance.now()
        closure(context)
        const end = performance.now()

        const result = (end - start)
        warmups[i] = result
      }
    }

    const results = new Array<number>(samples)

    let minimum = Number.MAX_SAFE_INTEGER
    let maximum = 0

    let sum = 0

    for (let i = 0; i < samples; i++) {
      const start = performance.now()
      closure(context)
      const end = performance.now()

      const result = (end - start)
      results[i] = result

      if (result < minimum)
        minimum = result
      if (result > maximum)
        maximum = result
      sum += result
    }

    const average = sum / samples

    return new Result(message, samples, average, minimum, maximum, results)
  } catch (cause: unknown) {
    throw new BenchError(message, { cause })
  }
}