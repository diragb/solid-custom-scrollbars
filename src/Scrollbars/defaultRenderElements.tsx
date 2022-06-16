// Packages:
import {
  Component,
  JSX,
  splitProps
} from 'solid-js'


// Typescript:
import { RenderComponentProps } from './types'


// Exports:
export const renderViewDefault: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => <div { ...props } />

export const renderTrackHorizontalDefault: Component<RenderComponentProps> = (props_) => {
  const [ styleProp, props ] = splitProps(props_, ['style'])
  const finalStyle = {
    ...styleProp.style as JSX.CSSProperties,
    right: '2px',
    bottom: '2px',
    left: '2px',
    'border-radius': '3px'
  } as JSX.CSSProperties
  return <div style={ finalStyle } { ...props } />
}

export const renderTrackVerticalDefault: Component<RenderComponentProps> = (props_) => {
  const [ styleProp, props ] = splitProps(props_, ['style'])
  const finalStyle = {
    ...styleProp.style as JSX.CSSProperties,
    'right': '2px',
    'bottom': '2px',
    'top': '2px',
    'border-radius': '3px'
  } as JSX.CSSProperties
  return <div style={ finalStyle } { ...props } />
}

export const renderThumbHorizontalDefault: Component<RenderComponentProps> = (props_) => {
  const [ styleProp, props ] = splitProps(props_, ['style'])
  const finalStyle = {
    ...styleProp.style as JSX.CSSProperties,
    'cursor': 'pointer',
    'border-radius': 'inherit',
    'background-color': 'rgba(0,0,0,.2)'
  } as JSX.CSSProperties
  return <div style={ finalStyle } { ...props } />
}

export const renderThumbVerticalDefault: Component<RenderComponentProps> = (props_) => {
  const [ styleProp, props ] = splitProps(props_, ['style'])
  const finalStyle = {
    ...styleProp.style as JSX.CSSProperties,
    'cursor': 'pointer',
    'border-radius': 'inherit',
    'background-color': 'rgba(0,0,0,.2)'
  } as JSX.CSSProperties
  return <div style={ finalStyle } { ...props } />
}
