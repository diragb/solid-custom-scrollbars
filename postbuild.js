// Packages:
const fs = require('fs/promises')


// Functions:
const cleanup = async () => {
  const stringToMatch = 'const _tmpl$ = /*#__PURE__*/_$template(`<div></div>`, 2);\n\n'
  const defaultRenderElements = await fs.readFile('./dist/Scrollbars/defaultRenderElements.js', 'utf-8')
  let count = defaultRenderElements.split(stringToMatch).length - 1
  if (count > 1) await fs.writeFile(
    './dist/Scrollbars/defaultRenderElements.js',
    defaultRenderElements.replace(stringToMatch, '')
  )
  const index = await fs.readFile('./dist/Scrollbars/index.js', 'utf-8')
  count = index.split(stringToMatch).length - 1
  if (count > 1) await fs.writeFile(
    './dist/Scrollbars/index.js',
    index.replace(stringToMatch, '')
  )
}


// Execution:
cleanup()
