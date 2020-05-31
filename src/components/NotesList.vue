<template>
  <ul class="notes-list">
    <li class="notes-item" v-for="note in notes" :key="note.noteId">
      <div class="notes-button-wrapper">
        <button
          class="delete-item-button"
          type="button"
          title="Delete note"
          @click.prevent="deleteCurrentNote(note)"
        >
          <svg class="delete-button-icon">
            <use href="/img/sprite.svg#icon-delete"></use>
          </svg>
        </button>
        <button
          class="edit-item-button"
          type="button"
          title="Edit note"
          @click.prevent="editNote(note.noteId)"
        >
          <svg class="edit-button-icon">
            <use href="/img/sprite.svg#icon-edit"></use>
          </svg>
        </button>
      </div>
      <h2 class="item-title" @click.prevent="editNote(note.noteId)">
        {{ note.title }}
      </h2>
      <ul
        v-if="note.todos"
        class="todos-list"
        @click.prevent="editNote(note.noteId)"
      >
        <li v-if="note.todos[0]" class="todos-item">
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="todos-checkbox"
              v-model="note.todos[0].checked"
            />
            <span class="checkmark"></span>
          </label>
          <p class="todos-task">{{ note.todos[0].task }}</p>
        </li>
        <li v-if="note.todos[1]" class="todos-item">
          <label class="checkbox-label">
            <input
              type="checkbox"
              class="todos-checkbox"
              v-model="note.todos[1].checked"
            />
            <span class="checkmark"></span>
          </label>
          <p class="todos-task">{{ note.todos[1].task }}</p>
        </li>
      </ul>
      <p
        v-if="note.todos && note.todos[2]"
        class="show-more-tasks"
        @click.prevent="editNote(note.noteId)"
      >
        &middot;&middot;&middot;
      </p>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'notes-item',
  props: ['notes'],

  methods: {
    // Пуш на страницу редактирования конкретной заметки
    editNote(noteId) {
      this.$router.push(`/edit?id=${noteId}`);
    },
    // Подтверждение удаления заметки
    async deleteCurrentNote({ title, noteId }) {
      try {
        this.$modal.show('dialog', {
          title: 'Would you like to delete the note?',
          text: `"${title}"`,
          buttons: [
            {
              title: 'No',
            },
            {
              title: 'Yes',
              handler: async () => {
                await this.$store.dispatch('removeNote', noteId);
                this.$modal.hide('dialog');
              },
            },
          ],
        });
      } catch (error) {}
    },
  },
};
</script>
