<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/211883910-b3f96fd6-9a60-45d3-b330-5eb92b8dde0a.png" />
</div>
<h3 align="center">
Modern and minimalist benchmarking library
</h3>

```bash
npm install @hazae41/deimos
```

```bash
deno install jsr:@hazae41/deimos
```

[**📦 NPM**](https://www.npmjs.com/package/@hazae41/deimos) • [**📦 JSR**](https://jsr.io/@hazae41/deimos)

## Philosophy 🧠

Deimos aims to be minimalist and to always work no matter the:
- runtime (Node, Deno, browser)
- module resolution (ESM, CommonJS)
- language (TypeScript, JavaScript)
- bundler (Rollup, Vite)

It's just a library you can import everywhere! That's it, no CLI, no configuration file, just JavaScript.

## Features 🔥

### Current features

- 100% TypeScript and ESM
- No external dependency
- Runnable in the browser

## Usage 🚀

```typescript
import { bench } from "@hazae41/deimos"

const a = await bench("my library", async () => {
  await compute()
})

const b = await bench("some other library", async () => {
  await compute2()
})

a.tableAndSummary(b)

console.log(`${a.name} is ${a.ratio(b)} times faster than ${b.name}`)
```

## Running 🏎️

#### Node

```bash
node --test --test-concurrency=1 ./out/**/*.bench.js
```

#### Deno

```bash
deno test ./src/**/*.bench.ts
```

#### Other

```typescript
await import("./mymodule.bench.ts")
```
