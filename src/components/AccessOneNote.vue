<template>
    <!-- <div v-if="toggleModal && !buttonEnterNote && toggleWidht"> -->
    <div class="p-[2rem]">
        <div class="grid grid-cols-2">
            <button class="place-self-start"
                @click="editeNote(), $emit('reload-note'), toggleModal = false, addChecKBox = false, $emit('visible-notes', true), $emit('show-accessed-note', null)"><font-awesome-icon
                    icon="fa-solid fa-arrow-left" /></button>
            <button @click="toggleModal = false, editeNote(null, 'deleted'),$emit('reload-note'), $emit('visible-notes', true), $emit('show-accessed-note')" class="place-self-end"><font-awesome-icon
                    icon="fa-solid fa-trash" style="color: #707070;" />
            </button>
        </div>

        <div v-if="Array.isArray(indexNote.description)">
            <input :value="indexNote.title" @input="event => indexNote.title = event.target.value" placeholder="Título"
                class="text-2xl font-bold break-words input input-bordere border-0 w-full rounded-md m-1 focus:outline-none dark:bg-zinc-900" />
            <div v-for="(entered, index) in indexNote.description" :key="entered" class="grid grid-cols-12 group/item">
                <input type="checkbox" :checked=entered.checkBox
                    @change="indexNote.description[index].checkBox = !indexNote.description[index].checkBox"
                    class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center ">
                <input type="text" :value=entered.description v-on:keyup.enter="indexNote.description[0].description"
                    @input="event => indexNote.description[index].description = event.target.value"
                    class="col-start-2 col-span-10 focus:outline-none dark:bg-zinc-900">
                <button @click="editeNote(deleteItemFromList = index)" class="invisible group-hover/item:visible "><font-awesome-icon
                        icon="fa-solid fa-x" class="col-end-7 col-span-1" /></button>
            </div>

            <div class="grid grid-cols-12">
                <div v-if="addChecKBox" class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center ">
                    <input type="checkbox" id="checkbox" v-model="checkedBox"
                        class="object-contain h-4 w-4 place-self-center ">
                </div>
                <div v-else>
                    <button @click="addChecKBox = true"><font-awesome-icon icon="fa-solid fa-plus"
                            class="object-contain h-4 w-4 place-self-center mx-1" /></button>
                </div>
                <div class="col-start-2 col-span-10">
                    <input type="text" v-on:keyup.enter="editeNote()" placeholder="Item da lista"
                        v-model="enteredDescription" @focus="addChecKBox = true" @blur="editeNote()"
                        class="focus:outline-none dark:bg-zinc-900">
                </div>
                <div v-if="enteredDescription != null" class="col-start-1 col-span-12">
                    <button @click="addChecKBox = true"><font-awesome-icon icon="fa-solid fa-plus"
                            class="object-contain h-4 w-4 place-self-center mx-1" /></button>
                    <input type="text" v-on:keyup.enter="editeNote()" placeholder="Item da lista"
                        @focus="addChecKBox = true" class="dark:bg-zinc-900">
                </div>

            </div>
        </div>
        <div v-else>
            <input :value="indexNote.title" @input="event => indexNote.title = event.target.value" placeholder="Título"
                class="text-2xl font-bold break-words input input-bordere w-full rounded-md m-1 focus:outline-none dark:bg-zinc-900" />
            <textarea :value="indexNote.description" @input="event => indexNote.description = event.target.value" rows="35"
                class="overflow-auto focus:outline-none w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-zinc-900 m-1 dark:text-gray-300"
                placeholder="Nota" required style=""></textarea>
        </div>
    </div>
    <!-- </div> -->
</template>
<script>
import { setNoteClound } from './Worker'
import { setNoteIndexedDB } from './IndexedDB'
import { formatDate, isJson } from './Tools'
export default {
    mounted() { this.viewNote(this.idAccessedNote, this.allNote) },
    props: ['idAccessedNote', 'allNote', 'token'],
    emits: ['visible-notes', 'show-accessed-note', 'reload-note'],
    data() {
        return {
            indexNote: [],
            indexNoteCopy: null,
            enteredDescription: null,
            checkedBox: null,
        }
    },
    methods: {
        viewNote(idAccessedNote, allNote) {
            //see note when clicked 
            const size = allNote.length;
            for (let i = 0; i < size; i++) {
                const idArray = allNote[i].id;
                if (idArray === idAccessedNote) {
                    this.indexNote = null;
                    const noteId = allNote[i].noteId
                    const usersId = allNote[i].usersId
                    const lastUpdate = allNote[i].lastUpdate
                    const deleted = allNote[i].deleted

                    const title = allNote[i].title;
                    const descriptionValue = { 'value': allNote[i].description };
                    const testArray = Array.isArray(descriptionValue.value)

                    if (testArray) {
                        const sizeDescription = descriptionValue.value.length
                        const descriptionList = { 'value': [] };
                        for (let i = 0; i < sizeDescription; i++) {
                            descriptionList.value.push({ checkBox: descriptionValue.value[i].checkBox, description: descriptionValue.value[i].description })
                        }
                        descriptionValue.value = descriptionList.value
                    }
                    this.indexNote = { id: idAccessedNote, noteId: noteId, usersId: usersId, title: title, description: descriptionValue.value, lastUpdate: lastUpdate, deleted: deleted };
                    this.indexNoteCopy = { id: idAccessedNote, noteId: noteId, usersId: usersId, title: title, description: descriptionValue.value, lastUpdate: lastUpdate, deleted: deleted };
                    //toggleModal.value = true;
                }
            }
            //this.enteredDescription = null
        },

        async editeNote(deleteItemFromList, deleteNote) {
            //Edite note
            console.log("token",this.token)
            if (this.deleteNote == "deleted") {
                const id = this.indexNote.id;
                const noteId = this.indexNote.noteId
                const usersId = this.indexNote.usersId
                const title = this.indexNote.title
                const description = this.indexNote.description
                const lastUpdate = this.indexNote.lastUpdate
                // const tokenUser = token
                console.log("description editeNote = Deleted", description)
                console.log("noteId removeNote", noteId)

                try {
                    const noteSeted = await setNoteClound(id, noteId, usersId, title, description, this.deleteNote, token);
                    const deleted = noteSeted.res.lastNote.results[0].deleted;
                    const update = noteSeted.res.lastNote.results[0].lastUpdate;
                    await setNoteIndexedDB(id, noteId, usersId, title, description, update, deleted);
                } catch (error) {
                    const dateNow = new Date();
                    const lastUpdate = formatDate(dateNow, "yyyy-mmm-dd hh:mm:ss");
                    await setNoteIndexedDB(id, noteId, usersId, title, description, lastUpdate, deleted)

                }

                // deleteNote(id);
                index.remove(id); // to send app
                await reloadNote(); // to send app
                //valueSearchCopy.value = null;
                //searchNote();
                //toggleModal.value = false;
                //send command to app to hide accessed note and show all notes
            } else {

                //toggleModal.value = false;
                if (deleteItemFromList != null) {
                    this.indexNote.description.splice(deleteItemFromList, 1)
                    //toggleModal.value = true;
                    //send command to app to hide accessed note and show all notes
                }

                if (this.enteredDescription != null) {
                    const checkBox = this.checkedBox;
                    this.indexNote.description.push({ checkBox: checkBox, description: this.enteredDescription });
                    this.enteredDescription = null;
                    //toggleModal.value = true;
                }

                const noteId = this.indexNote.noteId;
                const usersId = this.indexNote.usersId;
                const lastUpdate = this.indexNote.lastUpdate;
                const deleted = this.indexNote.deleted;
                const id = this.indexNote.id;
                const title = this.indexNote.title;
                let description = this.indexNote.description;
                const jsonTeste = { 'value': isJson(description) };
                // const tokenUser = token.value
                if (!jsonTeste.value) {
                    description = JSON.stringify(description)
                }

                this.checkedBox = false;

                try {
                    const noteSeted = await setNoteClound(id, noteId, usersId, title, description, this.deleteNote, token);
                    const update = noteSeted.res.lastNote.results[0].lastUpdate;
                    await setNoteIndexedDB(id, noteId, usersId, title, description, update, deleted);
                } catch (error) {
                    const dateNow = new Date();
                    const lastUpdate = formatDate(dateNow, "yyyy-mmm-dd hh:mm:ss");
                    await setNoteIndexedDB(id, noteId, usersId, title, description, lastUpdate, deleted)
                }

                //searchNote();
                this.enteredDescription = null;
            }
        }
    }

}

</script>