<script type="javascript">
import * as vue from 'vue';
export default vue.defineComponent({
    props: ['todos', 'visibility'],
    computed: {
        filteredTodos() {
            return filters[this.visibility](this.todos);
        },
        remaining() {
            return filters.active(this.todos).length;
        },
    },
})
</script>
<template>
    <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <ul class="filters">
        <li>
            <a href="#/all" :class="{ selected: visibility == 'all' }">All</a>
        </li>
        <li>
            <a href="#/active" :class="{ selected: visibility == 'active' }">Active</a>
        </li>
        <li>
            <a
            href="#/completed"
            :class="{ selected: visibility == 'completed' }">Completed</a>
        </li>
        </ul>
        <button
                class="clear-completed"
                @click="removeCompleted"
                v-show="todos.length > remaining"
                >
        Clear completed
        </button>
    </footer>
</template>