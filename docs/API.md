# API

## Usage
```tsx
import Scrollbars from 'solid-custom-scrollbars'

// later on..

return (
  <Wrapper>
    <Scrollbars>
      <Content />
    </Scrollbars>
  </Wrapper>
)
```

## Props
### onScroll
event handler for scroll events
```ts
onScroll: (event?: Event) => any
```

### onScrollFrame
runs inside the animation frame
```ts
// values about the current position
interface IValues {
  left: number          // scrollLeft progess, from 0 to 1
  top: number           // scrollTop progess, from 0 to 1
  scrollLeft: number    // Native scrollLeft
  scrollTop: number     // Native scrollTop
  scrollWidth: number   // Native scrollWidth
  scrollHeight: number  // Native scrollHeight
  clientWidth: number   // Width of the view
  clientHeight: number  // Height of the view
}

onScroll: (values: IValues) => any
```

### onScrollStart
called when scrolling starts
```ts
onScrollStart: () => any
```

### onScrollStop
called when scrolling stops
```ts
onScrollStop: () => any
```

### onUpdate
called when ever the component is updated. Runs inside the animation frame
```ts
onUpdate: (values: IValues) => any
```

### renderView
the element your content will be rendered in
```tsx
renderView: Component<JSX.HTMLAttributes<HTMLDivElement>>
```

### renderTrackHorizontal
the horizontal track element
```tsx
renderTrackHorizontal: Component<RenderComponentProps>
```

### renderTrackVertical
the vertical track element
```tsx
renderTrackVertical: Component<RenderComponentProps>
```

### renderThumbHorizontal
the horizontal thumb element
```tsx
renderThumbHorizontal: Component<RenderComponentProps>
```

### renderThumbVertical
the vertical thumb element
```tsx
renderThumbVertical: Component<RenderComponentProps>
```

### thumbSize
set a fixed size for thumbs in px
```tsx
thumbSize: number
```

### thumbMinSize
minimal thumb size in px (default: 30)
```tsx
thumbMinSize: number
```

### hideTracksWhenNotNeeded
hide tracks (`visibility: hidden`) when content does not overflow container (default: false)
```tsx
hideTracksWhenNotNeeded: boolean
```

### autoHide
enable auto-hide mode (default: `false`)

when set to `true` tracks will hide automatically and are only visible while scrolling
```tsx
autoHide: boolean
```

### autoHideTimeout
hide delay in ms (default: 1000)
```tsx
autoHideTimeout: number
```

### autoHideDuration
duration for hide animation in ms (default: 200)
```tsx
autoHideDuration: number
```

### autoHeight
enable auto-height mode (default: false)

when set to `true` the container grows with content
```tsx
autoHeight: boolean
```

### autoHeightMin
Set a minimum height for auto-height mode (default: 0)
```tsx
autoHeightMin: number
```

### autoHeightMax
Set a maximum height for auto-height mode (default: 200)
```tsx
autoHeightMax: number
```

### universal
Enable universal rendering (default: false)

[learn how to use universal rendering](usage.md#universal-rendering)
```tsx
universal: boolean
```

## Methods
the methods can be accessed through the `functions` object.

```tsx
const App: Component = () => {
  let scrollbarRef

  onMount(() => {
    scrollbarRef.functions.scrollTop()
  })

  return (
    <Scrollbars
      ref={ scrollbarRef }
    ></Scrollbars>
  )
}
```

### scrollTop
scroll to the top value
```ts
scrollTop: (top = 0) => void
```

### scrollLeft
scroll to the left value
```ts
scrollLeft: (left = 0) => void
```

### scrollToTop
scroll to top
```ts
scrollToTop: () => void
```

### scrollToBottom
scroll to bottom
```ts
scrollToBottom: () => void
```

### scrollToLeft
scroll to left
```ts
scrollToLeft: () => void
```

### scrollToRight
scroll to right
```ts
scrollToRight: () => void
```

### getScrollLeft
get `scrollLeft` value
```ts
getScrollLeft: () => number
```

### getScrollTop
get `scrollTop` value
```ts
getScrollTop: () => number
```

### getScrollWidth
get `scrollWidth` value
```ts
getScrollWidth: () => number
```

### getScrollHeight
get `scrollHeight` value
```ts
getScrollHeight: () => number
```

### getClientWidth
get view client width
```ts
getClientWidth: () => number
```

### getClientHeight
get view client height
```ts
getClientHeight: () => number
```

### getValues
get an object with values about the current position.
```ts
getValues: () => IValues
```
