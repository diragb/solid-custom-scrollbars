// Packages:
import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  onMount
} from 'solid-js'
import raf, { cancel as caf } from 'raf'
import css from 'dom-css'
import isString from './utils/isString'
import getScrollbarWidth from './utils/getScrollbarWidth'
import returnFalse from './utils/returnFalse'
import getInnerWidth from './utils/getInnerWidth'
import getInnerHeight from './utils/getInnerHeight'


// Typescript:
import type {
  RenderComponentProps,
  IValues,
  ScrollbarsProps,
  TRef,
  TContainerRef,
} from './types'


// Styles:
import {
  containerStyleDefault,
  containerStyleAutoHeight,
  viewStyleDefault,
  viewStyleAutoHeight,
  viewStyleUniversalInitial,
  trackHorizontalStyleDefault,
  trackVerticalStyleDefault,
  thumbHorizontalStyleDefault,
  thumbVerticalStyleDefault,
  disableSelectStyle,
  disableSelectStyleReset
} from './styles'


// Components:
import {
  renderViewDefault,
  renderTrackHorizontalDefault,
  renderTrackVerticalDefault,
  renderThumbHorizontalDefault,
  renderThumbVerticalDefault
} from './defaultRenderElements'


// Functions:
const Scrollbars: Component<ScrollbarsProps> = (rawProps) => {
  // Constants:
  const props = mergeProps({
    renderView: renderViewDefault,
    renderTrackHorizontal: renderTrackHorizontalDefault,
    renderTrackVertical: renderTrackVerticalDefault,
    renderThumbHorizontal: renderThumbHorizontalDefault,
    renderThumbVertical: renderThumbVerticalDefault,
    thumbMinSize: 30,
    hideTracksWhenNotNeeded: false,
    autoHide: false,
    autoHideTimeout: 1000,
    autoHideDuration: 200,
    autoHeight: false,
    autoHeightMin: 0,
    autoHeightMax: 200,
    universal: false,
  }, rawProps)

  // Refs:
  let
    container: TContainerRef | undefined,
    view: TRef,
    trackHorizontal: TRef,
    thumbHorizontal: TRef,
    trackVertical: TRef,
    thumbVertical: TRef

  // Signals:
  const [ didMountUniversal, setDidMountUniversal ] = createSignal(false)
  const [ viewScrollLeft, setViewScrollLeft ] = createSignal<number>()
  const [ viewScrollTop, setViewScrollTop ] = createSignal<number>()
  const [ lastViewScrollLeft, setLastViewScrollLeft ] = createSignal<number>()
  const [ lastViewScrollTop, setLastViewScrollTop ] = createSignal<number>()
  const [ isScrolling, setIsScrolling ] = createSignal(false)
  const [ isDragging, setIsDragging ] = createSignal(false)
  const [ isTrackMouseOver, setIsTrackMouseOver ] = createSignal(false)
  const [ hideTracksTimeout, setHideTracksTimeout ] = createSignal<number>()
  const [ detectScrollingInterval, setDetectScrollingInterval ] = createSignal<number>()
  const [ prevPageX, setPrevPageX ] = createSignal(0)
  const [ prevPageY, setPrevPageY ] = createSignal(0)
  // const [ requestFrame, setRequestFrame ] = createSignal<number | undefined>()
  let requestFrame: number | undefined

  // Functions:
  const getValues = (): IValues => {
    const {
      scrollLeft = 0,
      scrollTop = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      clientWidth = 0,
      clientHeight = 0
    } = view || {}
    return {
      left: (scrollLeft / (scrollWidth - clientWidth)) || 0,
      top: (scrollTop / (scrollHeight - clientHeight)) || 0,
      scrollLeft,
      scrollTop,
      scrollWidth,
      scrollHeight,
      clientWidth,
      clientHeight
    }
  }

  const getThumbHorizontalWidth = () => {
    const trackWidth = getInnerWidth(trackHorizontal)
    const width = Math.ceil(view.clientWidth / view.scrollWidth * trackWidth)
    if (trackWidth <= width) return 0
    if (props.thumbSize) return props.thumbSize
    return Math.max(width, props.thumbMinSize)
  }

  const getThumbVerticalHeight = () => {
    const trackHeight = getInnerHeight(trackVertical)
    const height = Math.ceil(view.clientHeight / view.scrollHeight * trackHeight)
    if (trackHeight <= height) return 0
    if (props.thumbSize) return props.thumbSize
    return Math.max(height, props.thumbMinSize)
  }

  const _update = (callback?: (values: IValues) => any) => {
    const values = getValues()
    if (getScrollbarWidth()) {
      const { scrollLeft, clientWidth, scrollWidth } = values
      const trackHorizontalWidth = getInnerWidth(trackHorizontal)
      const thumbHorizontalWidth = getThumbHorizontalWidth()
      const thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth)
      const thumbHorizontalStyle = {
        width: `${ thumbHorizontalWidth }px`,
        transform: `translateX(${ thumbHorizontalX }px)`
      }
      const { scrollTop, clientHeight, scrollHeight } = values
      const trackVerticalHeight = getInnerHeight(trackVertical)
      const thumbVerticalHeight = getThumbVerticalHeight()
      const thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight)
      const thumbVerticalStyle = {
        height: `${ thumbVerticalHeight }px`,
        transform: `translateY(${thumbVerticalY}px)`
      }
      if (props.hideTracksWhenNotNeeded) {
        const trackHorizontalStyle = {
          visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
        }
        const trackVerticalStyle = {
          visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
        }
        css(trackHorizontal, trackHorizontalStyle)
        css(trackVertical, trackVerticalStyle)
      }
      css(thumbHorizontal, thumbHorizontalStyle)
      css(thumbVertical, thumbVerticalStyle)
    }
    if (props.onUpdate) props.onUpdate(values)
    if (typeof callback !== 'function' || !callback) return
    callback(values)
  }

  const _raf = (_callback: () => any) => {
    const currentRequestFrame = requestFrame
    if (currentRequestFrame) raf.cancel(currentRequestFrame)
    requestFrame = raf(() => {
      requestFrame = undefined
      _callback()
    })
  }

  const update = (callback?: (values: IValues) => any) => {
    _raf(() => _update(callback))
  }

  const showTracks = () => {
    window.clearTimeout(hideTracksTimeout())
    css(trackHorizontal, { filter: 'opacity(1)' })
    css(trackVertical, { filter: 'opacity(1)' })
  }

  const handleScrollStartAutoHide = () => {
    if (!props.autoHide) return
    showTracks()
  }

  const handleScrollStart = () => {
    if (props.onScrollStart) props.onScrollStart()
    handleScrollStartAutoHide()
  }

  const hideTracks = () => {
    if (
      isDragging() ||
      isScrolling() ||
      isTrackMouseOver()
    ) return
    window.clearTimeout(hideTracksTimeout())
    setHideTracksTimeout(window.setTimeout(() => {
      css(trackHorizontal, { filter: 'opacity(0)' })
      css(trackVertical, { filter: 'opacity(0)' })
    }, props.autoHideTimeout))
  }

  const handleScrollStopAutoHide = () => {
    if (!props.autoHide) return
    hideTracks()
  }

  const handleScrollStop = () => {
    if (props.onScrollStop) props.onScrollStop()
    handleScrollStopAutoHide()
  }

  const detectScrolling = () => {
    if (isScrolling()) return
    setIsScrolling(true)
    handleScrollStart()
    setDetectScrollingInterval(window.setInterval(() => {
      if (
        lastViewScrollLeft() === viewScrollLeft() &&
        lastViewScrollTop() === viewScrollTop()
      ) {
        window.clearInterval(detectScrollingInterval())
        setIsScrolling(false)
        handleScrollStop()
      }
      setLastViewScrollLeft(viewScrollLeft())
      setLastViewScrollTop(viewScrollTop())
    }, 100))
  }

  const handleScroll = (event: Event) => {
    if (props.onScroll) props.onScroll(event)
    update(values => {
      const { scrollLeft, scrollTop } = values
      setViewScrollLeft(scrollLeft)
      setViewScrollTop(scrollTop)
      if (props.onScrollFrame) props.onScrollFrame(values)
    })
    detectScrolling()
  }

  const handleTrackMouseEnterAutoHide = () => {
    if (!props.autoHide) return
    showTracks()
  }

  const handleTrackMouseEnter = () => {
    setIsTrackMouseOver(true)
    handleTrackMouseEnterAutoHide()
  }

  const handleTrackMouseLeaveAutoHide = () =>  {
    if (!props.autoHide) return
    hideTracks()
  }

  const handleTrackMouseLeave = () => {
    setIsTrackMouseOver(false)
    handleTrackMouseLeaveAutoHide()
  }

  const getScrollLeftForOffset = (offset: number) => {
    const trackWidth = getInnerWidth(trackHorizontal)
    const thumbWidth = getThumbHorizontalWidth()
    return offset / (trackWidth - thumbWidth) * (view.scrollWidth - view.clientWidth)
  }

  const handleHorizontalTrackMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    const thumbWidth = getThumbHorizontalWidth()
    const offset = Math.abs((event.target as HTMLElement).getBoundingClientRect().left - event.clientX) - thumbWidth / 2
    view.scrollLeft = getScrollLeftForOffset(offset)
  }

  const getScrollTopForOffset = (offset: number) => {
    const trackHeight = getInnerHeight(trackVertical)
    const thumbHeight = getThumbVerticalHeight()
    return offset / (trackHeight - thumbHeight) * (view.scrollHeight - view.clientHeight)
  }

  const handleVerticalTrackMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    const thumbHeight = getThumbVerticalHeight()
    const offset = Math.abs((event.target as HTMLElement).getBoundingClientRect().top - event.clientY) - thumbHeight / 2
    view.scrollTop = getScrollTopForOffset(offset)
  }

  const handleDrag = (event: MouseEvent) => {
    if (prevPageX()) {
      const thumbWidth = getThumbHorizontalWidth()
      const clickPosition = thumbWidth - prevPageX()
      const offset = -(trackHorizontal.getBoundingClientRect().left) + event.clientX - clickPosition
      view.scrollLeft = getScrollLeftForOffset(offset)
    } if (prevPageY()) {
      const thumbHeight = getThumbVerticalHeight()
      const clickPosition = thumbHeight - prevPageY()
      const offset = -(trackVertical.getBoundingClientRect().top) + event.clientY - clickPosition
      view.scrollTop = getScrollTopForOffset(offset)
    }
    return false
  }

  const handleDragEndAutoHide = () => {
    if (!props.autoHide) return
    hideTracks()
  }

  const dragEndFunction = {
    teardownDragging: function() {
      css(document.body, disableSelectStyleReset)
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', this.handleDragEnd)
      document.onselectstart = null
    },
    handleDragEnd: function() {
      setIsDragging(false)
      setPrevPageX(0)
      setPrevPageY(0)
      // this.teardownDragging()
      handleDragEndAutoHide()
    }
  }

  const setupDragging = () => {
    css(document.body, disableSelectStyle)
    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', dragEndFunction.handleDragEnd)
    document.onselectstart = returnFalse
  }

  const handleDragStart = (event: Event) => {
    setIsDragging(true)
    event.stopImmediatePropagation()
    setupDragging()
  }

  const handleHorizontalThumbMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    handleDragStart(event)
    setPrevPageX((event.target as HTMLElement).offsetWidth - (event.clientX - (event.target as HTMLElement).getBoundingClientRect().left))
  }

  const handleVerticalThumbMouseDown = (event: MouseEvent) => {
    event.preventDefault()
    handleDragStart(event)
    setPrevPageY((event.target as HTMLElement).offsetHeight - (event.clientY - (event.target as HTMLElement).getBoundingClientRect().top))
  }

  const forceUpdate = () => {
    update(values => {
      const { scrollLeft, scrollTop } = values
      setViewScrollLeft(scrollLeft)
      setViewScrollTop(scrollTop)
      if (props.onScrollFrame) props.onScrollFrame(values)
    })
  }

  const handleWindowResize = () => {
    getScrollbarWidth(false)
    forceUpdate()
  }

  const addListeners = () => {
    if (typeof document === 'undefined' || !view) return
    view.addEventListener('scroll', handleScroll)
    if (!getScrollbarWidth()) return
    trackHorizontal.addEventListener('mouseenter', handleTrackMouseEnter)
    trackHorizontal.addEventListener('mouseleave', handleTrackMouseLeave)
    trackHorizontal.addEventListener('mousedown', handleHorizontalTrackMouseDown)
    trackVertical.addEventListener('mouseenter', handleTrackMouseEnter)
    trackVertical.addEventListener('mouseleave', handleTrackMouseLeave)
    trackVertical.addEventListener('mousedown', handleVerticalTrackMouseDown)
    thumbHorizontal.addEventListener('mousedown', handleHorizontalThumbMouseDown)
    thumbVertical.addEventListener('mousedown', handleVerticalThumbMouseDown)
    window.addEventListener('resize', handleWindowResize)
  }

  const componentDidMountUniversal = () => {
    if (!props.universal) return
    setDidMountUniversal(true)
  }

  const removeListeners = () => {
    if (typeof document === 'undefined' || !view) return
    view.removeEventListener('scroll', handleScroll)
    if (!getScrollbarWidth()) return
    trackHorizontal.removeEventListener('mouseenter', handleTrackMouseEnter)
    trackHorizontal.removeEventListener('mouseleave', handleTrackMouseLeave)
    trackHorizontal.removeEventListener('mousedown', handleHorizontalTrackMouseDown)
    trackVertical.removeEventListener('mouseenter', handleTrackMouseEnter)
    trackVertical.removeEventListener('mouseleave', handleTrackMouseLeave)
    trackVertical.removeEventListener('mousedown', handleVerticalTrackMouseDown)
    thumbHorizontal.removeEventListener('mousedown', handleHorizontalThumbMouseDown)
    thumbVertical.removeEventListener('mousedown', handleVerticalThumbMouseDown)
    window.removeEventListener('resize', handleWindowResize)
    dragEndFunction.teardownDragging()
  }

  const getScrollLeft = () => {
    if (!view) return 0
    return view.scrollLeft
  }

  const getScrollTop = () => {
    if (!view) return 0
    return view.scrollTop
  }

  const getScrollWidth = () => {
    if (!view) return 0
    return view.scrollWidth
  }

  const getScrollHeight = () => {
    if (!view) return 0
    return view.scrollHeight
  }

  const getClientWidth = () => {
    if (!view) return 0
    return view.clientWidth
  }

  const getClientHeight = () => {
    if (!view) return 0
    return view.clientHeight
  }

  const scrollLeft = (left = 0) => {
    if (!view) return
    view.scrollLeft = left
  }

  const scrollTop = (top = 0) => {
    if (!view) return
    view.scrollTop = top
  }

  const scrollToLeft = () => {
    if (!view) return
    view.scrollLeft = 0
  }

  const scrollToTop = () => {
    if (!view) return
    view.scrollTop = 0
  }

  const scrollToRight = () => {
    if (!view) return
    view.scrollLeft = view.scrollWidth
  }

  const scrollToBottom = () => {
    if (!view) return
    view.scrollTop = view.scrollHeight
  }

  const addFunctionsToContainerRef = () => {
    if (!container) return
    container.functions = {
      getScrollLeft,
      getScrollTop,
      getScrollWidth,
      getScrollHeight,
      getClientWidth,
      getClientHeight,
      scrollLeft,
      scrollTop,
      scrollToLeft,
      scrollToTop,
      scrollToRight,
      scrollToBottom
    }
  }

  // Effects:
  onMount(() => {
    addListeners()
    update()
    componentDidMountUniversal()
    addFunctionsToContainerRef()
  })

  createEffect(() => {
    update()
  })

  onCleanup(() => {
    removeListeners()
    const currentRequestFrame = requestFrame
    if (currentRequestFrame) caf(currentRequestFrame)
    window.clearTimeout(hideTracksTimeout())
    window.clearInterval(detectScrollingInterval())
  })

  const containerStyle = {
    ...containerStyleDefault,
    ...(props.autoHeight && {
      ...containerStyleAutoHeight,
      'min-height': props.autoHeightMin,
      'max-height': props.autoHeightMax
    }),
    ...props.style
  } as JSX.CSSProperties

  const viewStyle = {
    ...viewStyleDefault,
    // Hide scrollbars by setting a negative margin
    'margin-right': getScrollbarWidth() ? `${ -getScrollbarWidth() }px` : 0,
    'margin-bottom': getScrollbarWidth() ? `${ -getScrollbarWidth() }px` : 0,
    ...(props.autoHeight && {
      ...viewStyleAutoHeight,
      // Add scrollbarWidth to autoHeight in order to compensate negative margins
      'min-height': isString(props.autoHeightMin as string) ?
        `calc(${ props.autoHeightMin } + ${ getScrollbarWidth() }px)` :
        `${ (props.autoHeightMin as number) + getScrollbarWidth() }px`,
      'max-height': isString(props.autoHeightMax as string) ?
        `calc(${ props.autoHeightMax } + ${ getScrollbarWidth() }px)` :
        `${ (props.autoHeightMax as number) + getScrollbarWidth() }px`
    }),
    // Override min/max height for initial universal rendering
    ...((props.autoHeight && props.universal && !didMountUniversal()) && {
      'min-height': isString(props.autoHeightMin as string) ? props.autoHeightMin : `${ props.autoHeightMin }px`,
      'max-height': isString(props.autoHeightMax as string) ? props.autoHeightMax : `${ props.autoHeightMax }px`
    }),
    // Override
    ...((props.universal && !didMountUniversal()) && viewStyleUniversalInitial)
  } as JSX.CSSProperties

  const trackAutoHeightStyle = {
    'transition': `filter ${ props.autoHideDuration }ms`,
    'filter': 'opacity(0)'
  }

  const trackHorizontalStyle = {
    ...trackHorizontalStyleDefault,
    ...(props.autoHide && trackAutoHeightStyle),
    ...((!getScrollbarWidth() || (props.universal && !didMountUniversal())) && {
      'display': 'none'
    })
  } as JSX.CSSProperties

  const trackVerticalStyle = {
    ...trackVerticalStyleDefault,
    ...(props.autoHide && trackAutoHeightStyle),
    ...((!getScrollbarWidth() || (props.universal && !didMountUniversal())) && {
      'display': 'none'
    })
  } as JSX.CSSProperties

  return (
    <div
      style={ containerStyle }
      ref={ container }
    >
      <props.renderView
        id={ 'view' }
        style={ viewStyle }
        children={ props.children }
        ref={ ref => view = ref }
      />
      <props.renderTrackHorizontal
        id={ 'trackHorizontal' }
        style={ trackHorizontalStyle }
        ref={ ref => trackHorizontal = ref }
      >
        <props.renderThumbHorizontal
          style={ thumbHorizontalStyleDefault }
          ref={ ref => thumbHorizontal = ref }
        />
      </props.renderTrackHorizontal>
      <props.renderTrackVertical
        id={ 'trackVertical' }
        style={ trackVerticalStyle }
        ref={ ref => trackVertical = ref }
      >
        <props.renderThumbVertical
          style={ thumbVerticalStyleDefault }
          ref={ ref => thumbVertical = ref }
        />
      </props.renderTrackVertical>
    </div>
  )
}


// Exports:
export default Scrollbars

export type {
  RenderComponentProps,
  IValues,
  ScrollbarsProps,
  TRef,
  TContainerRef
}
