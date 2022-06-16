# Usage

## Default Scrollbars
The `<Scrollbars>` component works out of the box with some default styles. The only thing you need to care about is that the component has a `width` and `height`:

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const App: Component = () => {
  return (
    <Scrollbars style={{ width: 500, height: 300 }}>
      <p>Some great content...</p>
    </Scrollbars>
  )
}
```

Also don't forget to set the `viewport` meta tag, if you want to **support mobile devices**

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>
```

## Events
There are several events you can listen to:

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const App: Component = () => {
  return (
    <Scrollbars
      // Will be called with the native scroll event
      onScroll={ handleScroll }
      // Runs inside the animation frame. Passes some handy values about the current scroll position
      onScrollFrame={ handleScrollFrame }
      // Called when scrolling starts
      onScrollStart={ handleScrollStart }
      // Called when scrolling stops
      onScrollStop={ handlenScrollStop }
      // Called when ever the component is updated. Runs inside the animation frame
      onUpdate={ handleUpdate }>
      <p>Some great content...</p>
    </Scrollbars>
  )
}
```

## Auto-hide
You can activate auto-hide by setting the `autoHide` property.

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const App: Component = () => {
  return (
    <Scrollbars
      // This will activate auto hide
      autoHide
      // Hide delay in ms
      autoHideTimeout={ 1000 }
      // Duration for hide animation in ms.
      autoHideDuration={ 200 }>
      <p>Some great content...</p>
    </Scrollbars>
  )
}
```

## Auto-height
You can activate auto-height by setting the `autoHeight` property.

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const App: Component = () => {
  return (
    <Scrollbars
      // This will activate auto-height
      autoHeight
      autoHeightMin={ 100 }
      autoHeightMax={ 200 }>
      <p>Some great content...</p>
    </Scrollbars>
  )
}
```

## Universal rendering
If your app runs on both client and server, activate the `universal` mode. This will ensure that the initial markup on client and server are the same:

```javascript
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const App: Component = () => {
  return (
    // This will activate universal mode
    <Scrollbars universal>
      <p>Some great content...</p>
    </Scrollbars>
  )
}
```