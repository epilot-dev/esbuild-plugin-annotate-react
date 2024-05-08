import fs from 'node:fs/promises'
import * as babel from '@babel/core';
import type { Plugin } from 'esbuild'

const AnnotateReactPlugin: Plugin = {
  name: 'annotate-react',
  setup(build) {
    build.onLoad({ filter: /\.[tj]sx$/ }, async (args) => {
      const inputFile = await fs.readFile(args.path)

      const contents = await new Promise<string>((resolve, reject) => babel.transform(inputFile.toString(), {
        plugins: [
          ['@babel/plugin-transform-typescript',
            { 
              isTSX: true,
              parserOpts: {
                jsx: 'react',
                allowJs: true,
              }
            },
          ],
          'react-component-data-attribute',
        ],
      }, (error, result) => {
        error ? reject(error) : resolve(result?.code as string)
      }))

      return {
        contents,
        loader: 'jsx',
      }
    })
  }
}

export default AnnotateReactPlugin
