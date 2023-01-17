import { bench } from "mods/runner/global.js";
import { relative, resolve } from "node:path";

const directory = resolve("./dist/test/")
const { pathname } = new URL(import.meta.url)
console.log(relative(directory, pathname.replace(".mjs", ".ts")))

const alpha = Buffer.allocUnsafe(256)
crypto.getRandomValues(alpha)

const beta = Buffer.allocUnsafe(256)
crypto.getRandomValues(beta)

const sum = await bench("BigMath.sum", async () => {
  const bigalpha = BigInt(`0x${alpha.toString("hex")}`)
  const bigbeta = BigInt(`0x${beta.toString("hex")}`)

  bigalpha * bigbeta
})

const sum2 = await bench("BigMath.sum2", async () => {
  const bigalpha = BigInt(`0x${alpha.toString("hex")}`)
  const bigbeta = BigInt(`0x${beta.toString("hex")}`)

  bigalpha * bigbeta
})

console.log(`${sum.message} is ${sum.ratio(sum2).toFixed(2)} times faster than ${sum2.message}`)