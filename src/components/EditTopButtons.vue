<template>
  <div class="edit-buttons-wrapper">
    <div class="last-action-buttons">
      <button
        class="undo-button"
        type="button"
        title="Cancel last change"
        v-if="canUndo > 1"
        @click.prevent="undoEdit"
      >
        <svg class="undo-button-icon">
          <use href="/img/sprite.svg#icon-undo"></use>
        </svg>
      </button>
      <button
        class="undo-button"
        type="button"
        title="Cancel last change"
        v-else
        disabled
        @click.prevent="undoEdit"
      >
        <svg class="undo-button-icon">
          <use href="/img/sprite.svg#icon-undo"></use>
        </svg>
      </button>
      <button
        class="repeat-button"
        type="button"
        title="Repeat canceled change"
        v-if="canRedo"
        @click.prevent="redoEdit"
      >
        <svg class="repeat-button-icon">
          <use href="/img/sprite.svg#icon-undo"></use>
        </svg>
      </button>
      <button
        class="repeat-button"
        type="button"
        title="Repeat canceled change"
        v-else
        disabled
        @click.prevent="redoEdit"
      >
        <svg class="repeat-button-icon">
          <use href="/img/sprite.svg#icon-undo"></use>
        </svg>
      </button>
    </div>
    <button
      class="delete-note-button"
      type="button"
      title="Delete note"
      @click.prevent="deleteCurrentNote(note.title)"
    >
      <svg class="delete-button-icon">
        <use href="/img/sprite.svg#icon-delete"></use>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'edit-top-buttons',
  computed: mapGetters(['note']),

  methods: {
    undoEdit() {
      this.undo();
    },
    redoEdit() {
      this.redo();
    },
    // Подтверждение удаления
    deleteCurrentNote(title) {
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
                await this.$store.dispatch('removeNote', this.note.noteId);
                this.$router.push('/');
              },
            },
          ],
        });
      } catch (error) {}
    },
  },
};
</script>
