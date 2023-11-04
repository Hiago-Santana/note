<script>
import { isJson, formatDate } from './components/Tools'//import {getNoteIndexedDB} from './components/'
//import { addNote, getNoteIndexedDB, setNote } from './components/IndexedDB'
import { getNoteIndexedDB, addNoteIndexedDB, setNoteIndexedDB } from './components/IndexedDB';
//import { syncCloundToIndexedDB } from './components/SyncNote.js'
import Index from 'flexsearch';
import { fromJSON } from 'postcss';
import AddNote from './components/AddNote.vue';
import { getNoteClound } from './components/Worker'
import ShowAllNotes from './components/ShowAllNotes.vue';
import { syncCloundToIndexedDB, syncIndexedDBToClound } from './components/SyncNote'

export default {
  components: { AddNote, ShowAllNotes },

  data() {
    return {
      allNote: [],
      allNoteClound: null,
      toggleModal: null,
      screenWidth: window.innerWidth,
      noNote: false,
      logIn: false,
      token: null,
      resultCloundLogin: null,
      toggleWidht: null,
      index: new Index({ tokenize: "full" }),
      idUser: null,
      teste: false,
      visibleNote: true,
      idAccessedNote: null,
      visibleAddNote: false,
      toggleWidht: 'null',
      screenWidth: null,
      allNoteIndexedDB: null,
      showSearchSystem: true,

      noteClound: [],
      noteIndexedDB: null

    }
  },

  mounted() {
    window.addEventListener('resize', this.toggleScreen),
      this.toggleScreen();
  },

  methods: {

    visbleSearchSystem(visible){
      this.showSearchSystem = visible
    },

    showAccessedNote(id) {
      this.idAccessedNote = id
    },

    hideAllNotes(visibleNote) {
      this.visibleNote = visibleNote;
      //this.visibleAddNote = visibleNote;
    },

    toggleScreen() {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 500) {
        this.toggleWidht = true;

      } else {
        this.toggleWidht = false;

      }
    },

    setLogInformation(token, idUser, logIn) {
      this.token = token;
      this.logIn = logIn;
      this.idUser = idUser;
      this.visibleAddNote = true;
    },

    async reloadNote() {
      try {
        await syncCloundToIndexedDB(this.idUser, this.token);
        await syncIndexedDBToClound(this.idUser, this.token);
      } catch {
        console.log("No connection to the server")
      }

      this.allNote = [];
      this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
      const sizeAllNoteIndexedDB = this.allNoteIndexedDB.length;

      if (sizeAllNoteIndexedDB > 0) {
        for (let i = 0; i < sizeAllNoteIndexedDB; i++) {
          if (this.allNoteIndexedDB[i].deleted == null) {
            const id = this.allNoteIndexedDB[i].id;
            const noteId = this.allNoteIndexedDB[i].noteId;
            const usersId = this.allNoteIndexedDB[i].usersId;
            const title = this.allNoteIndexedDB[i].title;
            let description = this.allNoteIndexedDB[i].description;
            const lastUpdate = this.allNoteIndexedDB[i].lastUpdate;
            const deleted = this.allNoteIndexedDB[i].deleted;

            const jsonTeste = isJson(description)
            if (jsonTeste) {
              description = JSON.parse(description)
            }

            this.allNote.push({ id: id, noteId: noteId, usersId: usersId, title: title, description: description, lastUpdate: lastUpdate, deleted: deleted })
            //this.index = new Index({ tokenize: "full" }),
              this.index.add(id, title);
            this.index.append(id, description)
          }
        }
      } else {
        this.noNote = true;
      }
    },
  },
}
</script>
<template>
  <div class=" h-screen dark:bg-zinc-900">
    <login-sign-up @set-log-information="setLogInformation" @call-reload-note="reloadNote"></login-sign-up>
    <search-note v-if="logIn && showSearchSystem" :index="index" :allNote="allNote" @visible-search-system="visbleSearchSystem" @hide-all-notes="hideAllNotes" @show-accessed-note="showAccessedNote"></search-note>
    <add-note :token="token" :id-user="idUser" :toggle-widht="toggleWidht" :visible-note="visibleNote"
      @reload-note="reloadNote" @visible-notes="hideAllNotes" @visible-search-system="visbleSearchSystem"></add-note>
    <!-- view saved notes -->
    <show-all-notes v-if="visibleNote" :allNote="allNote" @show-accessed-note="showAccessedNote"
      @visible-notes="hideAllNotes" @visible-search-system="visbleSearchSystem"></show-all-notes>
    <accessed-note v-if="idAccessedNote != null" :idAccessedNote="idAccessedNote" :allNote="allNote" :token="token"
      @show-accessed-note="showAccessedNote" @visible-notes="hideAllNotes" @reload-note="reloadNote"
      @remove-note-index="index.remove()" @visible-search-system="visbleSearchSystem"></accessed-note>

  </div>
</template>
