import fs from 'node:fs/promises'
import * as esbuild from 'esbuild'
import { test, describe, expect } from "vitest";
import AnnotateReactPlugin from "./index";

describe("AnnotateReactPlugin", () => {

  test("annotates a React .jsx file", async () => {
    // given

    // when
    await esbuild.build({
      entryPoints: ['test/fixtures/App.jsx'],
      outfile: 'test/out/app-js.js',
      plugins: [AnnotateReactPlugin],
    })

    // then
    const result = await fs.readFile('test/out/app-js.js')

    expect(result.toString()).toContain('data-component')
  })

  test("annotates a React .tsx file", async () => {
    // given

    // when
    await esbuild.build({
      entryPoints: ['test/fixtures/App.tsx'],
      outfile: 'test/out/app-ts.js',
      plugins: [AnnotateReactPlugin],
    })

    // then
    const result = await fs.readFile('test/out/app-ts.js')

    expect(result.toString()).toContain('data-component')
  })
})
