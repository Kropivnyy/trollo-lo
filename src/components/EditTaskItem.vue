<template>
  <!-- changeTodo слушает изменения в todo. -->
  <div class="edit-task-item" @change="changeTodo(newTodo)">
    <label class="checkbox-label">
      <input
        type="checkbox"
        class="todos-checkbox"
        :checked="note.todos[i].checked"
        ref="checkbox"
      />
      <span class="edit-checkmark"></span>
    </label>
    <input
      :value="note.todos[i].task"
      type="text"
      class="edit-task"
      placeholder="Your task..."
      required
      ref="task"
    />
    <!-- deleteTask удаляет todo.
        initChange слушает удаление todo, потому что кнопка удаления
    не срабатывает на @change  -->
    <button
      @click.prevent="$emit('deleteTask'), $emit('initChange')"
      class="delete-task-button"
      type="button"
    >
      &#215;
      <span class="visually-hidden">Delete current task</span>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'task-item',
  props: ['i', 'changeTodo'],
  computed: {
    ...mapGetters(['note']),
    newTodo() {
      return {
        id: this.i,
        task: this.$refs.task.value,
        checked: this.$refs.checkbox.checked,
      };
    },
  },
};
</script>
