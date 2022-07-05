// Packages:
import withSolid from 'rollup-preset-solid'


// Exports:
export default withSolid([
  {
    input: 'src/index.ts',
    targets: [ 'esm', 'cjs' ]
  }
])
