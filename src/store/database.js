import firebase from 'firebase/app';

export default {
  actions: {
    async createNote({}, { title, todos }) {
      try {
        const noteId = firebase
          .database()
          .ref()
          .push().key;
        await firebase
          .database()
          .ref(`/notes/${noteId}`)
          .set({
            noteId,
            title,
            todos,
          });
      } catch (error) {
        throw error;
      }
    },
    async updateNote({}, { title, todos, noteId }) {
      try {
        await firebase
          .database()
          .ref(`/notes/${noteId}`)
          .update({ title, todos });
      } catch (error) {
        throw error;
      }
    },
    async removeNote({}, noteId) {
      try {
        await firebase
          .database()
          .ref(`/notes/${noteId}`)
          .remove();
      } catch (error) {
        throw error;
      }
    },
    async fetchNotes({}) {
      const notes =
        (
          await firebase
            .database()
            .ref('/notes')
            .once('value')
        ).val() || {};
      return Object.keys(notes).map(el => ({ ...notes[el] })) || [];
    },
  },
};
