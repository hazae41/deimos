import { bench } from "../mod.ts";

const result = await bench("bbb", async (context) => {
  const x = 1 + 1
})

result.tableAndSummary()