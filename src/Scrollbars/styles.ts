// Packages:
import type { JSX } from 'solid-js/jsx-runtime'


// Exports:
export const containerStyleDefault = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100%',
} as JSX.CSSProperties

// Overrides containerStyleDefault properties
export const containerStyleAutoHeight = {
  height: 'auto'
} as JSX.CSSProperties

export const viewStyleDefault = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  overflow: 'scroll',
  '-webkit-overflow-scrolling': 'touch'
} as JSX.CSSProperties

// Overrides viewStyleDefault properties
export const viewStyleAutoHeight = {
  position: 'relative',
  top: undefined,
  left: undefined,
  right: undefined,
  bottom: undefined
} as JSX.CSSProperties

export const viewStyleUniversalInitial = {
  overflow: 'hidden',
  'margin-right': 0,
  'margin-bottom': 0,
} as JSX.CSSProperties

export const trackHorizontalStyleDefault = {
  position: 'absolute',
  height: '6px'
} as JSX.CSSProperties

export const trackVerticalStyleDefault = {
  position: 'absolute',
  width: '6px'
} as JSX.CSSProperties

export const thumbHorizontalStyleDefault = {
  position: 'relative',
  display: 'block',
  height: '100%'
} as JSX.CSSProperties

export const thumbVerticalStyleDefault = {
  position: 'relative',
  display: 'block',
  width: '100%'
} as JSX.CSSProperties

export const disableSelectStyle = {
  'user-select': 'none'
} as JSX.CSSProperties

export const disableSelectStyleReset = {
  'user-select': ''
} as JSX.CSSProperties
