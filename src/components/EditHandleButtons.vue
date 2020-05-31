<template>
  <div class="edit-handle-result-buttons">
    <button
      class="cancel-changes-button"
      type="button"
      @click.prevent="$emit('cancelChanges')"
    >
      Cancel
    </button>
    <!-- Кнопка disabled, если нет todo -->
    <button
      v-if="changes.length === 0"
      class="save-changes-button"
      type="submit"
      disabled
    >
      Save
    </button>

    <button v-else class="save-changes-button" type="submit">Save</button>
  </div>
</template>

<script>
export default {
  name: 'edit-handle-buttons',
  props: ['changes'],
};
</script>
