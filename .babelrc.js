const { BABEL_ENV, NODE_ENV } = process.env

const cjs = BABEL_ENV === 'cjs' || NODE_ENV === 'test'

module.exports = {
  presets: [
    ['env', { loose: true, modules: false }],
    "react"
  ],
  plugins: [
    "transform-object-rest-spread",
    cjs && 'transform-es2015-modules-commonjs',
  ].filter(Boolean),
}
