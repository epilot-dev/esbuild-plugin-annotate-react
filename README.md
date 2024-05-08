# esbuild-plugin-annotate-react

An esbuild plugin that annotates React-rendered components with stable
attributes to identify the source component.

Input:

```jsx
// App.jsx
const MyComponent = () => {
  return <div>Hello World</div>
}
```

Output:

```js
const MyComponent = () => {
  return React.createElement(
    "div",
    { "data-component": "MyComponent" },
    "Hello World"
  );
}
```

