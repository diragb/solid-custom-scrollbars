// Typescript:
import {
  Component,
  JSX,
  JSXElement
} from 'solid-js'


// Exports:
export interface RenderComponentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  style?: string | JSX.CSSProperties
  props?: JSX.HTMLAttributes<HTMLDivElement>
}

export interface IValues {
  left: number
  top: number
  scrollLeft: number
  scrollTop: number
  scrollWidth: number
  scrollHeight: number
  clientWidth: number
  clientHeight: number
}

export interface ScrollbarsProps extends JSX.HTMLAttributes<HTMLDivElement> {
  onScroll?: (event?: Event) => any
  onScrollFrame?: (values: IValues) => any
  onScrollStart?: () => any
  onScrollStop?: () => any
  onUpdate?: (values: IValues) => any
  renderView?: Component<JSX.HTMLAttributes<HTMLDivElement>>
  renderTrackHorizontal?: Component<RenderComponentProps>
  renderTrackVertical?: Component<RenderComponentProps>
  renderThumbHorizontal?: Component<RenderComponentProps>
  renderThumbVertical?: Component<RenderComponentProps>
  thumbSize?: number
  thumbMinSize?: number
  hideTracksWhenNotNeeded?: boolean
  autoHide?: boolean
  autoHideTimeout?: number
  autoHideDuration?: number
  autoHeight?: boolean
  autoHeightMin?: number | string
  autoHeightMax?: number | string
  universal?: boolean
  style?: JSX.CSSProperties
  children?: JSXElement
}

export type TRef = HTMLDivElement

export type TContainerRef = TRef & {
  functions: {
    [ key: string ]: (...props: any) => any
  }
}
