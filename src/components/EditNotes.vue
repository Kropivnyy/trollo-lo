<template>
  <form @submit.prevent="submitHandler">
    <input
      :value="note.title"
      type="text"
      class="edit-title"
      placeholder="Note title..."
      required
      ref="title"
      @change.prevent="changeHandler"
    />
       <!-- initChange слушает удаление todo, потому что кнопка удаления
    не срабатывает на @change.
    changeHandler обрабатывает все изменения в форме  -->
    <EditTasks @initChange="initChange" :changeTodo="changeHandler" />
    <EditHandleButtons
      @cancelChanges="cancelChanges(note.title)"
      :changes="changes"
    />
  </form>
</template>

<script>
import EditTasks from '@/components/EditTasks.vue';
import EditHandleButtons from '@/components/EditHandleButtons.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'edit-notes',
  data: () => ({
    // флажок об удалении todo
    onDeleteTodo: false,
    // Изменения в todo
    changes: [],
    // Данные для передачи на сервер
    noteData: {},
  }),
  computed: mapGetters(['note']),
  methods: {
    ...mapMutations(['addChange']),
    changeHandler(newTodo) {
      this.onDeleteTodo = true;
      // Фисксируем изменения в todo
      this.changes = this.note.todos.map(el => {
        if (newTodo.id === el.id) {
          return newTodo;
        } else {
          return el;
        }
      });
      // формируем данные для мутации. Необходимо для undo/redo
      this.noteData = {
        title: this.$refs.title.value,
        todos: this.changes,
      };
      if (this.note.noteId) {
        this.noteData = {
          ...this.noteData,
          noteId: this.note.noteId,
        };
      }
      this.addChange(this.noteData);
      this.undone = [];
    },
    // Подтверждение отмены изменений
    cancelChanges(title) {
      if (this.changed) {
        this.$modal.show('dialog', {
          title: 'Would you like to cancel changes?',
          text: `In "${title}" note.`,
          buttons: [
            {
              title: 'No',
            },
            {
              title: 'Yes',
              handler: () => {
                this.$router.push('/');
              },
            },
          ],
        });
      } else {
        this.$router.push('/');
      }
    },
    // Формируем данные. Если заметка с таким id существует, то обновляем ее.
    // Если нет - то создаем.
    async submitHandler() {
      try {
        this.noteData = {
          title: this.$refs.title.value,
          todos: this.changes,
        };
        if (this.note.noteId) {
          this.noteData = {
            ...this.noteData,
            noteId: this.note.noteId,
          };
          await this.$store.dispatch('updateNote', this.noteData);
        } else {
          await this.$store.dispatch('createNote', this.noteData);
        }
        this.$router.push('/');
      } catch (error) {}
    },
    initChange() {
      this.onDeleteTodo = true;
    },
  },
  components: { EditTasks, EditHandleButtons },
};
</script>
