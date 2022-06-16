// Exports:
export default (el: Element) => {
  const { paddingLeft, paddingRight } = getComputedStyle(el)
  return el.clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}
