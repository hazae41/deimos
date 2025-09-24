import { bench } from "../mod.ts";

console.log(new Date())

const result = await bench("bbb", async (context) => {
  const x = 1 + 1
})

result.tableAndSummary()

console.log(new Date())