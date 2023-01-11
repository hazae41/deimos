<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/211883910-b3f96fd6-9a60-45d3-b330-5eb92b8dde0a.png" />
</div>
<h3 align="center">
Modern and minimalist benchmarking library
</h3>

```bash
npm i @hazae41/deimos
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/deimos)

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

console.log(`${a.message} is ${a.ratio(b)} times faster than ${b.message}`)
```

```bash
ts-node --esm ./bench.ts
```

## Setting up 🔧

Most setups will just need a custom entry point that imports all your benchs, that you either run as-is using `ts-node`, or that you transpile using your favorite bundler.

For example, the entry point `index.bench.ts` imports:
  - `some-module/index.bench.ts`, which imports:
    - `some-module/some-file.bench.ts`
    - `some-module/some-other-file.bench.ts`
  - `some-other-module/index.bench.ts`, which imports:
    - `some-other-module/some-file.bench.ts`
    - `some-other-module/some-other-file.bench.ts`

You can see an example on this repository, all benchs are imported in `src/index.bench.ts`, then we use Rollup to transpile it into `dist/test/index.bench.cjs`, which we then run using Node with `node ./dist/test/index.bench.cjs`.

## Running 🏎️

#### Using a bundler

```bash
node ./dist/test/index.bench.cjs
```

#### Using ts-node with ESM

```bash
ts-node --esm ./src/index.bench.ts
```

#### Using ts-node with ESM and ttypescript

```bash
ts-node --esm --compiler ttypescript ./src/index.bench.ts
```

#### Using dynamic import

```typescript
await import("index.bench.ts")
```
