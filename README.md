# solid-custom-scrollbars

[![npm](https://img.shields.io/badge/npm-solid--custom--scrollbars-brightgreen.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-scrollbars)
[![npm version](https://img.shields.io/npm/v/solid-custom-scrollbars.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-scrollbars)
[![npm downloads](https://img.shields.io/npm/dm/solid-custom-scrollbars.svg?style=flat-square)](https://www.npmjs.com/package/solid-custom-scrollbars)
[![sponsors](https://img.shields.io/github/sponsors/diragb)](https://github.com/sponsors/diragb)

* frictionless native browser scrolling
* native scrollbars for mobile devices
* [fully customizable](https://github.com/diragb/solid-custom-scrollbars/blob/master/docs/customization.md)
* [auto hide](https://github.com/diragb/solid-custom-scrollbars/blob/master/docs/usage.md#auto-hide)
* [auto height](https://github.com/diragb/solid-custom-scrollbars/blob/master/docs/usage.md#auto-height)
* [universal](https://github.com/diragb/solid-custom-scrollbars/blob/master/docs/usage.md#universal-rendering) (runs on client & server)
* `requestAnimationFrame` for 60fps
* no extra stylesheets
* well tested, 100% code coverage


## Inspiration
Inspired by the battle-tested and original [react-custom-scrollbars](https://www.npmjs.com/package/react-custom-scrollbars).

## Installation
```bash
npm i solid-custom-scrollbars
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

## Usage

This is the minimal configuration. [Check out the Documentation for advanced usage](https://github.com/diragb/solid-custom-scrollbars/tree/master/docs/usage.md).

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

The `<Scrollbars>` component is completely customizable. Check out the following code:

```tsx
import type { Component } from 'solid-js'
import Scrollbars from 'solid-custom-scrollbars'

const CustomScrollbars: Component = () => {
  return (
    <Scrollbars
      onScroll={ handleScroll }
      onScrollFrame={ handleScrollFrame }
      onScrollStart={ handleScrollStart }
      onScrollStop={ handleScrollStop }
      onUpdate={ handleUpdate }
      renderView={ renderView }
      renderTrackHorizontal={ renderTrackHorizontal }
      renderTrackVertical={ renderTrackVertical }
      renderThumbHorizontal={ renderThumbHorizontal }
      renderThumbVertical={ renderThumbVertical }
      autoHide
      autoHideTimeout={ 1000 }
      autoHideDuration={ 200 }
      autoHeight
      autoHeightMin={ 0 }
      autoHeightMax={ 200 }
      thumbMinSize={ 30 }
      universal={ true }
      { ...props }>
  )
}
```

All properties are documented in the [API docs](https://github.com/diragb/solid-custom-scrollbars/blob/master/docs/API.md).

## License
MIT
