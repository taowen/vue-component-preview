import * as vue from 'vue';
import preview from 'vue-component-preview';
import Todo, { filters } from './todo.vue';

// app Vue instance
const app = vue.createApp(preview(Todo, {
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
      }],
    }
  }
}));

// mount
const vm = app.mount("#app");

// handle routing
function onHashChange() {
  const visibility = window.location.hash.replace(/#\/?/, "");
  if (filters[visibility]) {
    vm.visibility = visibility;
  } else {
    window.location.hash = "";
    vm.visibility = "all";
  }
}

window.addEventListener("hashchange", onHashChange);
onHashChange();