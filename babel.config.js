module.exports = {
  env: {
    development: {
      presets: [ '@babel/preset-typescript', 'solid' ],
      plugins: [
        [
          'babel-plugin-jsx-dom-expressions',
          {
            moduleName: 'solid-js/web',
            contextToCustomElements: true,
            wrapConditionals: true,
            builtIns: [ 'For', 'Show', 'Switch', 'Match', 'Suspense', 'SuspenseList', 'Portal' ]
          }
        ]
      ]
    }
  }
}
