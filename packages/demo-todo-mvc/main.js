import * as vue from 'vue';
import Todo from './todo.vue';
import { filters } from './todo.vue';

// app Vue instance
const app = vue.createApp(Todo);
console.log(Todo);

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