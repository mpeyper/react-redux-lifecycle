import * as ts from 'typescript'
import * as tt from 'typescript-definition-tester'
import path from 'path'
import fs from 'fs'

describe('TypeScript definitions', function() {
  const options = {
    noEmitOnError: true,
    noImplicitAny: true,
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.React
  }

  fs.readdirSync(path.join(__dirname, 'definitions')).forEach(filename => {
    test(`should compile ${path.basename(filename, path.extname(filename))} against index.d.ts`, done => {
      tt.compile([path.join(__dirname, 'definitions', filename)], options, done)
    }, 20000)
  })
})
