<template>
  <div class="container">
    <div class="edit-todo">
      <EditTopButtons />
      <EditNotes v-if="formLoaded" />
    </div>
    <v-dialog width="300px" />
  </div>
</template>

<script>
import EditTopButtons from '@/components/EditTopButtons.vue';
import EditNotes from '@/components/EditNotes.vue';
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Edit',
  data: () => ({
    formLoaded: false,
  }),
  computed: mapGetters(['note']),
  methods: mapMutations(['addChange', 'emptyState']),
  async created() {
    try {
      // Fetch для случая перезугрузки страницы
      const notes = await this.$store.dispatch('fetchNotes');
      // Коммиты для undo/redo
      this.emptyState();
      this.addChange(
        notes.find(el => el.noteId === this.$route.query.id) || {
          title: '',
          todos: [{ id: 0, checked: false, task: '' }],
        },
      );
      this.formLoaded = true;
    } catch (error) {}
  },
  components: { EditTopButtons, EditNotes },
};
</script>

<style lang="scss"></style>
