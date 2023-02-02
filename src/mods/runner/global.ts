import { Context } from "mods/runner/context.js";
import { BenchError } from "mods/runner/error.js";
import { Result } from "mods/runner/result.js";

export interface BenchParams {
  samples?: number
}

export async function bench(message: string, closure: (context: Context) => Promise<void>, params: BenchParams = {}) {
  try {
    const { samples = 1_000_000 } = params

    const context = new Context(message)
    const results = new Array<number>(samples)

    for (let i = 0; i < samples; i++) {
      const start = performance.now()
      await closure(context)
      const end = performance.now()
      results[i] = (end - start)
    }

    const sum = results.reduce((p, c) => p + c, 0)
    const average = sum / samples

    return new Result(message, samples, average)
  } catch (cause: unknown) {
    throw new BenchError(message, { cause })
  }
}

export function benchSync(message: string, closure: (context: Context) => void, params: BenchParams = {}) {
  try {
    const { samples = 1_000_000 } = params

    const context = new Context(message)
    const results = new Array<number>(samples)

    for (let i = 0; i < samples; i++) {
      const start = performance.now()
      closure(context)
      const end = performance.now()
      results[i] = (end - start)
    }

    const sum = results.reduce((p, c) => p + c, 0)
    const average = sum / samples

    return new Result(message, samples, average)
  } catch (cause: unknown) {
    throw new BenchError(message, { cause })
  }
}