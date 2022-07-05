// Packages:
import withSolid from 'rollup-preset-solid'


// Exports:
export default withSolid([
  {
    input: 'src/index.tsx',
    targets: [ 'esm', 'cjs' ]
  }
])
