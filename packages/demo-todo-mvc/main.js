import { preview } from 'vue-component-preview';
import * as vue from 'vue';
import Todo from './todo.vue';
import { filters } from './todo.vue';

// app Vue instance
const app = vue.createApp(preview(Todo, {
    todos: [{
    }],
    filteredTodos: [{
        id: 1,
        title: 'hello',
        completed: true
    }],
    __get__(p) {
        console.log(p);
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