<div align="center">
<img width="500" src="https://user-images.githubusercontent.com/4405263/211883910-b3f96fd6-9a60-45d3-b330-5eb92b8dde0a.png" />
</div>
<h3 align="center">
Modern and minimalist benchmarking library
</h3>

```bash
npm i @hazae41/deimos
```

[**Node Package ðĶ**](https://www.npmjs.com/package/@hazae41/deimos)

```
src/node/bench/xor_mod.bench.ts
cpu: Apple M1 Max
runtime: node v18.12.1 (arm64-darwin)

âââââââââââŽâââââââââââââââââââŽââââââââââââââŽââââââââââââââ
â (index) â     average      â   minimum   â   maximum   â
âââââââââââžâââââââââââââââââââžââââââââââââââžââââââââââââââĪ
â  wasm   â '880.48 ns/iter' â '750.00 ns' â '154.00 Îžs' â
â   js    â '17.71 Îžs/iter'  â '17.42 Îžs'  â '610.67 Îžs' â
âââââââââââīâââââââââââââââââââīââââââââââââââīââââââââââââââ

Summary
- wasm is 20.11x faster than js
```

## Philosophy ð§ 

Deimos aims to be minimalist and to always work no matter the:
- runtime (Node, Deno, browser)
- module resolution (ESM, CommonJS)
- language (TypeScript, JavaScript)
- bundler (Rollup, Vite)

It's just a library you can import everywhere! That's it, no CLI, no configuration file, just JavaScript.

## Features ðĨ

### Current features

- 100% TypeScript and ESM
- No external dependency
- Runnable in the browser

## Usage ð

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

## Setting up ð§

Most setups will just need a custom entry point that imports all your benchs, that you either run as-is using `ts-node`, or that you transpile using your favorite bundler.

For example, the entry point `index.bench.ts` imports:
  - `some-module/index.bench.ts`, which imports:
    - `some-module/some-file.bench.ts`
    - `some-module/some-other-file.bench.ts`
  - `some-other-module/index.bench.ts`, which imports:
    - `some-other-module/some-file.bench.ts`
    - `some-other-module/some-other-file.bench.ts`

You can see an example on this repository, all benchs are imported in `src/index.bench.ts`, then we use Rollup to transpile it into `dist/test/index.bench.cjs`, which we then run using Node with `node ./dist/test/index.bench.cjs`.

## Running ðïļ

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
