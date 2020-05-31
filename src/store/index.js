import Vue from 'vue';
import Vuex from 'vuex';
import database from './database';
import VuexUndoRedo from 'vuex-undo-redo';

Vue.use(Vuex);
Vue.use(VuexUndoRedo);

export default new Vuex.Store({
  state: {
    note: [],
  },
  mutations: {
    addChange(state, payload) {
      state.note.push(payload);
    },
    emptyState() {
      this.replaceState({ note: [] });
    },
  },
  getters: {
    note(state) {
      return state.note[state.note.length - 1];
    },
  },
  actions: {},
  modules: { database },
});
