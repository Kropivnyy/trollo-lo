<template>
  <div class="edit-task-list">
    <!-- Цикл для создания новых todo. 
    changeTodo слушает изменения в todo.
    initChange слушает удаление todo, потому что кнопка удаления
    не срабатывает на @change  -->
    <EditTaskItem
      v-for="(todo, i) in note.todos"
      :i="i"
      :key="todo.id"
      :changeTodo="changeTodo"
      @deleteTask="note.todos.splice(i, 1)"
      @initChange="$emit('initChange')"
    ></EditTaskItem>
    <button class="new-task-button" type="button" @click="addNewTask">
      New Task
    </button>
  </div>
</template>

<script>
import EditTaskItem from '@/components/EditTaskItem.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'edit-tasks',
  props: ['changeTodo'],
  computed: mapGetters(['note']),

  methods: {
    addNewTask() {
      this.note.todos.push({
        id: 1 + Math.max(0, ...this.note.todos.map(n => n.id)),
        checked: false,
        task: '',
      });
    },
  },
  components: {
    EditTaskItem,
  },
};
</script>
