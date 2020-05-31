<template>
  <div class="container">
    <NewNoteButton />
    <NotesList :notes="notes" v-if="notes.length !== 0" />
    <p v-else class="on-empty-notes">
      You don't have any notes. Click
      <router-link tag="a" to="/edit" class="on-empty-notes-link"
        >here</router-link
      >
      to create it!
    </p>
    <v-dialog width="300px" @closed="updatePage" />
  </div>
</template>

<script>
import NotesList from '@/components/NotesList.vue';
import NewNoteButton from '@/components/NewNoteButton.vue';

export default {
  name: 'Notes',
  data: () => ({
    notes: [],
  }),
  async mounted() {
    try {
      this.notes = await this.$store.dispatch('fetchNotes');
    } catch (error) {}
  },
  methods: {
    async updatePage() {
      this.notes = await this.$store.dispatch('fetchNotes');
    },
  },
  components: {
    NotesList,
    NewNoteButton,
  },
};
</script>

<style lang="scss"></style>
