# React Redux Lifecycle

[![Build Status](https://img.shields.io/travis/mpeyper/react-redux-lifecycle/master.svg?style=flat-square)](https://travis-ci.org/mpeyper/react-redux-lifecycle) 
[![npm version](https://img.shields.io/npm/v/react-redux-lifecycle.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-lifecycle) 
[![npm downloads](https://img.shields.io/npm/dm/react-redux-lifecycle.svg?style=flat-square)](https://www.npmjs.com/package/react-redux-lifecycle)
[![License: MIT](https://img.shields.io/npm/l/react-redux-lifecycle.svg?style=flat-square)](LICENSE.md)

Often, actions need to be dispatched as part of the [React lifecycle](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle).  In many cases, the only reason to extend [`React.Component`](https://facebook.github.io/react/docs/react-component.html) instead of using [functional components](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components) is to do this.

Well, no more!  Now you can just wrap your component in this [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html) and remain in your functional bliss.

## Installation

### NPM

```sh
npm install --save react-redux-lifecycle
```

This assumes that you’re using [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](https://webpack.js.org/) or [Browserify](http://browserify.org/) to consume [CommonJS modules](http://webpack.github.io/docs/commonjs.html).

## Usage

### Standard Actions

```javascript
import { withLifecycleActions } from 'react-redux-lifecycle'

const myAction = { type: 'MY_ACTION' }

const MyComponent = ({ message }) => <div>{message}</div>

export default withLifecycleActions({ componentDidMount: myAction })(MyComponent)

...

import MyComponent from './MyComponent'

<MyComponent message="Hello World!" />
```

### Action Creators

```javascript
import { withLifecycleActions } from 'react-redux-lifecycle'

const myActionCreator = () => ({ type: 'MY_ACTION' })

const MyComponent = ({ message }) => <div>{message}</div>

export default withLifecycleActions({ componentDidMount: myActionCreator })(MyComponent)

...

import MyComponent from './MyComponent'

<MyComponent message="Hello World!" />
```

#### With props

The component props are passed to any functions that are provided

```javascript
import { withLifecycleActions } from 'react-redux-lifecycle'

const myActionCreator = ({ id }) => ({ type: 'MY_ACTION', id })

const MyComponent = ({ message }) => <div>{message}</div>

export default withLifecycleActions({ componentDidMount: myActionCreator })(MyComponent)

...

import MyComponent from './MyComponent'

<MyComponent id={123} message="Hello World!" />
```

### Multiple Actions

```javascript
import { withLifecycleActions } from 'react-redux-lifecycle'

const myAction = () => { type: 'MY_ACTION' }
const myActionCreator = () => myAction

const MyComponent = ({ message }) => <div>{message}</div>

export default withLifecycleActions({ componentDidMount: [myAction, myActionCreator] })(MyComponent)

...

import MyComponent from './MyComponent'

<MyComponent message="Hello World!" />
```

### Single Method Helpers

Helper functions are available if you only need to dispatch the action on a single lifecycle method.

```javascript
import { onComponentDidMount } from 'react-redux-lifecycle'

const myAction = { type: 'MY_ACTION' }

const MyComponent = ({ message }) => <div>{message}</div>

export default onComponentDidMount(myAction)(MyComponent)

...

import MyComponent from './MyComponent'

<MyComponent message="Hello World!" />
```

Basic action, action creators and multiple actions are all supported in the same manner as `withLifecycleActions`.

### Supported Lifecycle Methods

The following lifecycle methods are supported:

- `componentWillMount` (helper: `onComponentWillMount`)
- `componentDidMount` (helper: `onComponentDidMount`)
- `componentWillReceiveProps` (helper: `onComponentWillReceiveProps`)
- `componentWillUpdate` (helper: `onComponentWillUpdate`)
- `componentDidUpdate` (helper: `onComponentDidUpdate`)
- `componentWillUnmount` (helper: `onComponentWillUnmount`)
- `componentDidCatch` (helper: `onComponentDidCatch`)
