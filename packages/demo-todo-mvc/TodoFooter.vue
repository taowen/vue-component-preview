<script type="javascript">
import * as vue from 'vue';
import RemainingCounter from './RemainingCounter';

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
    components: {
        RemainingCounter
    }
})
</script>
<template>
    <footer class="footer" v-show="todos.length" v-cloak>
        <RemainingCounter>
        <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </RemainingCounter>
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