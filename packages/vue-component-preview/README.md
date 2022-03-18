# About

render vue component in "preview" mode with mock data.

```js
import preview from 'vue-component-preview'
import Todo from './todo.vue';
const TodoPreview = preview(Todo, {
  todos: [{
  }],
  filteredTodos: [{
    id: 1,
    title: 'hello',
    completed: true
  }],
  // when data used but not provided, will callback this
  __get__(p) {
    console.log(p);
  },
  // when child component being rendered, provide its data
  __render__({ componentName, componentType, counter }, props) {
    return {
      todos: [{
            // if child render its own child, it will callback again
            __render__({ componentName, componentType, counter }, props) {
            }
      }],
    }
  }
})
```

when render `<TodoPreview />`, it will render the `<template>` of the `todo.vue` file, but by-passing all `<script>`.

# Motivation

* preview complex business component mixing with business logic, do not want to start backend server
* implement drag&drop GUI designer with vue sfc file format