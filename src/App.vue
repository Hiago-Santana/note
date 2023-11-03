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

      noteClound: [],
      noteIndexedDB: null

    }
  },

  mounted() {
    window.addEventListener('resize', this.toggleScreen),
      this.toggleScreen();
  },

  methods: {


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

    async syncCloundToIndexedDB(resultCloundLogin) {
      //this.resultCloundLogin = resultCloundLogin;
      let noteIdClound;
      let usersIdClound;
      let titleClound;
      let descriptionClound;
      let lastUpdateclound;
      let deletedClound;

      this.noteClound = resultCloundLogin.note.results;

      this.idUser = resultCloundLogin.idUser;
      console.log(this.idUser)
      this.noteIndexedDB = await getNoteIndexedDB(this.idUser);

      let sizeIndexedDB = this.noteIndexedDB.length;
      let sizeClound = this.noteClound.length;

      for (let i = 0; i < sizeClound; i++) {
        noteIdClound = this.noteClound[i].noteId;
        usersIdClound = this.noteClound[i].usersId;
        titleClound = this.noteClound[i].title;
        descriptionClound = this.noteClound[i].description;
        lastUpdateclound = this.noteClound[i].lastUpdate;
        deletedClound = this.noteClound[i].deleted;

        //console.log("lastUpdateclound", lastUpdateclound)
        if (sizeClound > 0 && sizeIndexedDB > 0) {
          for (let i = 0; i < sizeIndexedDB; i++) {
            try {
              lastUpdateLocal = this.sizeIndexedDB.find(
                (Element) => Element.noteId == noteIdClound
              ).lastUpdate;

              if (lastUpdateclound > lastUpdateLocal) {
                noteIdLocal = this.sizeIndexedDB.find(
                  (Element) => Element.noteId == noteIdClound
                ).id;
                await setNote(
                  noteIdLocal,
                  noteIdClound,
                  usersIdClound,
                  titleClound,
                  descriptionClound,
                  lastUpdateclound,
                  deletedClound
                );
                this.allNote = await getNoteIndexedDB(this.idUser);
              }
              if (lastUpdateclound < lastUpdateLocal) {
                //await insertNoteClound(title, description, token, id)
                //avaliar se é necessário criar ele aqui
              }
            } catch (error) {
              await addNoteIndexedDB(
                noteIdClound,
                usersIdClound,
                titleClound,
                descriptionClound,
                lastUpdateclound,
                deletedClound
              );
              this.allNote = await getNoteIndexedDB(this.idUser);
              break;
            }
          }
        } else if (sizeClound > 0 && sizeIndexedDB == 0) {
          for (let i = 0; i < sizeClound; i++) {
            noteIdClound = this.noteClound.noteId;
            usersIdClound = this.noteClound.usersId;
            titleClound = this.noteClound.title;
            descriptionClound = this.noteClound.description;
            lastUpdateclound = this.noteClound.lastUpdate;
            deletedClound = this.noteClound.deleted;
            await addNoteIndexedDB(
              noteIdClound,
              usersIdClound,
              titleClound,
              descriptionClound,
              lastUpdateclound,
              deletedClound
            );
          }

          this.allNote = await getNoteIndexedDB(this.idUser);
          sizeIndexedDB = this.sizeIndexedDB.length;
          break;
        }
      }
    },

    setLogInformation(token, idUser, logIn) {
      this.token = token;
      this.logIn = logIn;
      this.idUser = idUser;
      this.visibleAddNote = true;
    },

    async oldReloadNote() {
      console.log("logIn", this.logIn)
      if (this.logIn === true) {
        //Get data from database and reload notes  

        //this.resultCloundLogin = resultCloundLogin;
        //console.log("allNoteClound",allNoteClound)
        // this.token = token;
        // this.logIn = login;
        // this.idUser = idUser;
        this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
        this.allNoteClound = await getNoteClound(this.token);
        this.allNoteClound = this.allNoteClound.res.note.results

        let noteIdClound;
        let usersIdClound;
        let titleClound;
        let descriptionClound;
        let lastUpdateclound;
        let deletedClound;

        let noteIdLocal;
        let usersIdLocal;
        let titleLocal;
        let descriptionLocal;
        let lastUpdateLocal;
        let deletedLocal;

        let noteNotInsertdClound;

        //sync
        let sizeLocal = this.allNoteIndexedDB.length;
        //console.log("allNoteClound",this.allNoteClound.results)
        const sizeClound = this.allNoteClound.length;
        for (let i = 0; i < sizeClound; i++) {
          noteIdClound = this.allNoteClound[i].noteId;
          usersIdClound = this.allNoteClound[i].usersId;
          titleClound = this.allNoteClound[i].title;
          descriptionClound = this.allNoteClound[i].description;
          lastUpdateclound = this.allNoteClound[i].lastUpdate
          deletedClound = this.allNoteClound[i].deleted;

          //console.log("lastUpdateclound", lastUpdateclound)
          if (sizeClound > 0 && sizeLocal > 0) {
            for (let i = 0; i < sizeLocal; i++) {

              try {
                lastUpdateLocal = this.allNoteIndexedDB.find(Element => Element.noteId == noteIdClound).lastUpdate

                if (lastUpdateclound > lastUpdateLocal) {
                  noteIdLocal = this.allNoteIndexedDB.find(Element => Element.noteId == noteIdClound).id
                  await setNoteIndexedDB(noteIdLocal, noteIdClound, usersIdClound, titleClound, descriptionClound, lastUpdateclound, deletedClound)
                  this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
                }
                if (lastUpdateclound < lastUpdateLocal) {
                  //await insertNoteClound(title, description, token, id)
                  //avaliar se é necessário criar ele aqui
                }
              } catch (error) {

                await addNoteIndexedDB(noteIdClound, usersIdClound, titleClound, descriptionClound, lastUpdateclound, deletedClound)
                this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
                break
              }
            }
          } else if (sizeClound > 0 && sizeLocal == 0) {
            for (let i = 0; i < sizeClound; i++) {
              noteIdClound = this.allNoteClound[i].noteId;
              usersIdClound = this.allNoteClound[i].usersId;
              titleClound = this.allNoteClound[i].title;
              descriptionClound = this.allNoteClound[i].description;
              lastUpdateclound = this.allNoteClound[i].lastUpdate
              deletedClound = this.allNoteClound[i].deleted;
              await addNoteIndexedDB(noteIdClound, usersIdClound, titleClound, descriptionClound, lastUpdateclound, deletedClound)
            }

            this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
            sizeLocal = this.allNoteIndexedDB.length;
            break
          }
        }

        //sync invertido
        for (let i = 0; i < sizeLocal; i++) {
          try {
            noteNotInsertdClound = this.allNoteIndexedDB.find(Element => Element.noteId == null)
            if (noteNotInsertdClound != undefined) {

              const idNoteLocal = noteNotInsertdClound.id
              const title = noteNotInsertdClound.title
              const description = noteNotInsertdClound.description
              const notInsered = await insertNoteClound(title, description, this.token, resultCloundLogin.userAuthentication.idUser)

              const idNotInserted = notInsered.res.lastNote.results[0].noteId
              const lastUpdateInsertedNote = notInsered.res.lastNote.results[0].lastUpdate
              const deletedInsertNote = notInsered.res.lastNote.results[0].deleted
              console.log("idNotInserted", idNotInserted)
              setNoteIndexedDB(idNoteLocal, idNotInserted, resultCloundLogin.userAuthentication.idUser, title, description, lastUpdateInsertedNote, deletedInsertNote)

              this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);
            } else {

              noteIdLocal = this.allNoteIndexedDB[i].noteId;
              lastUpdateLocal = this.allNoteIndexedDB[i].lastUpdate;
              lastUpdateclound = this.allNoteClound.find(Element => Element.noteId == noteIdLocal).lastUpdate

              if (lastUpdateLocal > lastUpdateclound) {

                const idNoteLocal = this.allNoteIndexedDB[i].id;
                const title = this.allNoteIndexedDB[i].title;
                const description = this.allNoteIndexedDB[i].description;
                const deleted = this.allNoteIndexedDB[i].deleted;
                const updateNoteClound = await setNoteClound(idNoteLocal, noteIdLocal, resultCloundLogin.userAuthentication.idUser, title, description, deleted, this.token)

                const lastUpdateSetClound = updateNoteClound.res.lastNote.results[0].lastUpdate
                const deletedSetClound = updateNoteClound.res.lastNote.results[0].deleted
                await setNoteIndexedDB(idNoteLocal, noteIdLocal, resultCloundLogin.userAuthentication.idUser, title, description, lastUpdateSetClound, deletedSetClound);
                this.allNoteIndexedDB = await getNoteIndexedDB(this.idUser);

              }
            }
          } catch (error) { }
        }

        let allNoteTemporary = [];
        for (let i = 0; i < sizeLocal; i++) {
          if (this.allNoteIndexedDB[i].deleted == null) {
            const idt = this.allNoteIndexedDB[i].id;
            const noteIdt = this.allNoteIndexedDB[i].noteId;
            const usersIdt = this.allNoteIndexedDB[i].usersId;
            const titlet = this.allNoteIndexedDB[i].title;
            const descriptiont = this.allNoteIndexedDB[i].description;
            const lastUpdatet = this.allNoteIndexedDB[i].lastUpdate;
            const deletedt = this.allNoteIndexedDB[i].deleted;

            allNoteTemporary.push({ id: idt, noteId: noteIdt, usersId: usersIdt, title: titlet, description: descriptiont, lastUpdate: lastUpdatet, deleted: deletedt })
          }
        }
        this.allNote = allNoteTemporary;
        sizeLocal = this.allNote.length;

        for (let i = 0; i < sizeLocal; i++) {
          const title = this.allNote[i].title;
          let description = null;
          description = this.allNote[i].description;
          const jsonTeste = isJson(description)
          const id = this.allNote[i].id;

          if (jsonTeste) {
            description = JSON.parse(description)
            this.allNote[i].description = description
          }
          this.index.add(id, title);
          this.index.append(id, description)
        }

        if (sizeLocal == 0) {
          this.noNote = true;
        }


      } else { }
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
            this.index = new Index({ tokenize: "full" }),
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
    <add-note :token="token" :id-user="idUser" :toggle-widht="toggleWidht" :visible-note="visibleNote"
      @reload-note="reloadNote" @visible-notes="hideAllNotes"></add-note>
    <!-- view saved notes -->
    <show-all-notes v-if="visibleNote" :allNote="allNote" @show-accessed-note="showAccessedNote"
      @visible-notes="hideAllNotes"></show-all-notes>
    <accessed-note v-if="idAccessedNote != null" :idAccessedNote="idAccessedNote" :allNote="allNote" :token="token"
      @show-accessed-note="showAccessedNote" @visible-notes="hideAllNotes" @reload-note="reloadNote"
      @remove-note-index="index.remove()"></accessed-note>

    <!-- <div v-if="logIn">
    <div v-if="!toggleModal || toggleModal && !toggleWidht"
      class="grid xl:grid-cols-7 xl:gap-4 md:grid-cols-5 md:gap-3 ph:grid-cols-2 ph:gap-2 dark:bg-zinc-900 pb-4">
      <div class="hidden">
        <h1 id="1" class="display:true">Visible</h1>
        <h1 id="2" class="hidden">Invisible</h1>
      </div>
      <div v-for="entered in allNote" :key="entered" @click="viewNote(entered.id), toggleTitle = false" class="">
        <div v-if="entered.deleted == null"
          class=" container shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]  p-2 rounded-md mt-2 content-start break-words font-semibold hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)] dark:bg-zinc-900 dark:shadow-none dark:border-2 dark:border-gray-700">
          <div v-if="Array.isArray(entered.description)">
            {{ entered.title }}
            <div v-for="entereds in entered.description" :key="entereds" class="grid grid-cols-12">
              <input type="checkbox" :checked=entereds.checkBox
                class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center mx-2 ">
              <input type="text" :value=entereds.description
                class="col-start-2 col-span-11 ml-1 font-normal dark:bg-zinc-900">
            </div>
          </div>
          <div v-else>
            {{ entered.title }}
            <p class="font-normal text-left dark:bg-zinc-900">{{ entered.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  </div>
</template>
