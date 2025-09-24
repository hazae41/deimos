import { bench } from "./mods/mod.ts";

console.log(new Date())

const result = await bench("aaa", async (context) => {
  const x = 1 + 1
})

result.tableAndSummary()

console.log(new Date())