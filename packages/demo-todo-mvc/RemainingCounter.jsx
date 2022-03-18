import * as vue from 'vue';

export default function(props, { slots }) {
    return <span class="todo-count">{ slots.default() }</span>
}