import { bench } from "./mods/mod.ts";

const result = await bench("aaa", async (context) => {
  const x = 1 + 1
})

result.tableAndSummary()