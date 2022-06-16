# Customization
The `<Scrollbars>` component consists of the following elements:

* `view` The element your content is rendered in
* `trackHorizontal` The horizontal scrollbars track
* `trackVertical` The vertical scrollbars track
* `thumbHorizontal` The horizontal thumb
* `thumbVertical` The vertical thumb

Each element can be **rendered individually** with a function that you pass to the component. Say, you want use your own `className` for each element:

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const CustomScrollbars: Component = () => {
  return (
    <Scrollbars
      renderTrackHorizontal={ props => <div { ...props } className='track-horizontal' /> }
      renderTrackVertical={ props => <div { ...props } className='track-vertical' /> }
      renderThumbHorizontal={ props => <div { ...props } className='thumb-horizontal' /> }
      renderThumbVertical={ props => <div { ...props } className='thumb-vertical' /> }
      renderView={ props => <div { ...props } className='view' /> }
    >
      { props.children }
    </Scrollbars>
  )
}

const App: Component = () => {
  return (
    <CustomScrollbars style={{ width: 500, height: 300 }}>
      <p>Some great content...</p>
    </CustomScrollbars>
  )
}
```

**Important**: **You will always need to pass through the given props** for the respective element like in the example above: `<div { ...props } className='track-horizontal' />`.
This is because we need to pass some default `styles` down to the element in order to make the component work.

If you are working with **inline styles**, you could do something like this:

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const CustomScrollbars: Component = () => {
  return (
    <Scrollbars
      renderTrackHorizontal={({ style, ...props }) =>
        <div { ...props } style={{ 
          ...style,
          left: '50%',
          width: '100px',
          top: 0,
          transform: 'translateX(-50%)',
        }}>
      }>
      { this.props.children }
    </Scrollbars>
  )
}
```

## Respond to scroll events
If you want to change the appearance in respond to the scrolling position, you could do that like:

```tsx
import { Component, createSignal } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const CustomScrollbars: Component = () => {
  const [ top, setTop ] = createSignal(0)

  const handleScrollFrame = (values) => {
    const { top: newTop } = values
    setTop(newTop)
  }

  const renderView = ({ style, ...props }) => {
    const color = top() * 255
    const customStyle = {
      backgroundColor: `rgb(${ color }, ${ color }, ${ color })`
    }
    return (
      <div { ...props } style={{ ...style, ...customStyle }} />
    )
  }

  return (
    <Scrollbars
      renderView={ renderView }
      onScrollFrame={ handleScrollFrame }
      { ...props }
    />
  )
}
```