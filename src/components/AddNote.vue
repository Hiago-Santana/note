<template>
    <div class="w-full flex flex-col dark:bg-zinc-900 p-[2rem] py-0 pt-2">
        <div v-if="!toggleWidht" class="flex justify-center ">
            <div
                class="w-[30rem] shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)] hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)] px-4 py-2 rounded-md dark:bg-zinc-900 mb-2">
                <div v-if="toggleTitle" class="grid grid-cols-3">

                    <button class="place-self-start"
                        @click="addTitleDescription(), toggleTitle = false, toggleModal = false, descriptionList = false"><font-awesome-icon
                            icon="fa-solid fa-arrow-left" /></button>
                    <button v-if="!descriptionList" @click="descriptionList = true"
                        class="place-self-center"><font-awesome-icon icon="fa-solid fa-list-check" /></button>
                    <button v-if="enteredTitle || enteredDescription || enteredListDescription.length > 0"
                        @click="toggleTitle = false, enteredTitle = null, enteredDescription = null, enteredListDescription = [], descriptionList = false"
                        class="place-self-end"><font-awesome-icon icon="fa-solid fa-trash" style="color: #707070;" />
                    </button>
                </div>
                <input @click="toggleTitle = true" id="title" type="text" v-model="enteredTitle"
                    placeholder="Crie um título para sua nota"
                    class="text-lg font-medium break-words input input-bordere w-full rounded-md m-1 focus:outline-none dark:bg-zinc-900" />

                <div v-if="descriptionList && toggleTitle">
                    <div v-for="(enteredListDescriptions, index) in enteredListDescription" :key=enteredListDescriptions
                        class="grid grid-cols-12 group/item">
                        <input type="checkbox" :checked=enteredListDescriptions.checkBox id="checkedBoxItem"
                            @change="editeDescriptionItem(index)"
                            class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center ">
                        <input type="text" :value=enteredListDescriptions.description
                            v-on:keyup.enter="editeDescriptionItem(index)"
                            @input="event => editListDescription = event.target.value"
                            class="col-start-2 col-span-10 focus:outline-none dark:bg-zinc-900">
                        <button @click="deleteDescriptionItem(index)"><font-awesome-icon icon="fa-solid fa-x"
                                class="col-end-7 col-span-1 invisible group-hover/item:visible" /></button>
                    </div>
                    <div class="grid grid-cols-12">
                        <input type="checkbox" id="checkbox" v-model="checkedBoxListDescription"
                            class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center">
                        <input type="text" v-model="enteredDescription" @blur="addDescriptionList()"
                            v-on:keyup.enter="addDescriptionList()" ref="textlist"
                            class="col-start-2 col-span-10 focus:outline-none dark:bg-zinc-900">
                        <!-- <button><font-awesome-icon icon="fa-solid fa-x" class="col-end-7 col-span-1" /></button> -->
                    </div>
                    <div v-if="enteredDescription != null" class="col-start-1 col-span-12">
                        <button @click="addChecKBox = true"><font-awesome-icon icon="fa-solid fa-plus"
                                class="object-contain h-4 w-4 place-self-center mx-1" /></button>
                        <input type="text" v-on:keyup.enter="addDescriptionList()" placeholder="Item da lista"
                            @focus="addChecKBox = true" class="focus:outline-none dark:bg-zinc-900">
                    </div>
                </div>
                <textarea v-if="toggleTitle && !descriptionList" v-model="enteredDescription" rows="5"
                    class="overflow-auto focus:outline-none w-full px-0 text-sm text-gray-900 m-2 bg-white border-0 dark:bg-zinc-900 dark:text-gray-300"
                    placeholder="Nota" required style=""></textarea>
            </div>
        </div>

        <!-- Add note when screen width is smallet than 500px -->
        <div v-if="buttonEnterNote" class="p-[2rem]">
            <div class="grid grid-cols-3">
                <button
                    @click="addTitleDescription(index), toggleModal = false, descriptionList = false, buttonEnterNote = false, showButtonEnterNote = true, $emit('visible-notes',true)"
                    class="place-self-start"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
                <button v-if="!descriptionList" @click="descriptionList = true" class="place-self-center"><font-awesome-icon
                        icon="fa-solid fa-list-check" /></button>
                <button v-if="enteredTitle || enteredDescription || enteredListDescription.length > 0"
                    @click="buttonEnterNote = false, toggleModal = false, enteredTitle = null, enteredDescription = null"
                    class="place-self-end"><font-awesome-icon icon="fa-solid fa-trash" style="color: #707070;" />
                </button>
            </div>

            <input type="text" v-model="enteredTitle" placeholder="Título"
                class="text-2xl font-bold break-words input input-bordere w-full rounded-md m-1 focus:outline-none dark:bg-zinc-900" />

            <div v-if="descriptionList">
                <div v-for="(enteredListDescriptions, index) in enteredListDescription" :key=enteredListDescriptions
                    class="grid grid-cols-12 group/item">
                    <input type="checkbox" :checked=enteredListDescriptions.checkBox id="checkedBoxItem"
                        @change="editeDescriptionItem(index)"
                        class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center ">
                    <input type="text" :value=enteredListDescriptions.description
                        v-on:keyup.enter="editeDescriptionItem(index)"
                        @input="event => newEnteredDescription = event.target.value"
                        class="col-start-2 col-span-10 focus:outline-none dark:bg-zinc-900">
                    <button @click="deleteDescriptionItem(index)"><font-awesome-icon icon="fa-solid fa-x"
                            class="col-end-7 col-span-1 invisible group-hover/item:visible" /></button>
                </div>
                <div class="grid grid-cols-12">
                    <input type="checkbox" id="checkbox" v-model="checkedBox"
                        class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center">
                    <input type="text" v-model="enteredDescription" @blur="addDescriptionList()"
                        v-on:keyup.enter="addDescriptionList()" ref="textlist"
                        class="col-start-2 col-span-10 focus:outline-none dark:bg-zinc-900">
                    <!-- <button><font-awesome-icon icon="fa-solid fa-x" class="col-end-7 col-span-1" /></button> -->
                </div>
                <div v-if="enteredDescription != null" class="col-start-1 col-span-12">
                    <button @click="addChecKBox = true"><font-awesome-icon icon="fa-solid fa-plus"
                            class="object-contain h-4 w-4 place-self-center mx-1" /></button>
                    <input type="text" v-on:keyup.enter="addDescriptionList()" placeholder="Item da lista"
                        @focus="addChecKBox = true" class="focus:outline-none dark:bg-zinc-900">
                </div>
            </div>
            <textarea v-else v-model="enteredDescription" rows="35"
                class="overflow-auto focus:outline-none w-full px-0 text-sm text-gray-900 m-2 bg-white border-0 dark:bg-zinc-900 dark:text-gray-300"
                placeholder="Nota" required style=""></textarea>
        </div>

        <footer v-if="toggleWidht && showButtonEnterNote" class=" fixed bottom-0 rigth-0 pb-4 place-self-end">
            <button @click="showButtonEnterNote = false, buttonEnterNote = true, toggleModal = true, $emit('visible-notes',false)"><font-awesome-icon icon="fa-solid fa-circle-plus"
                    size="2xl" />
            </button>
        </footer>
    </div>
</template>

<script>
import { addNoteIndexedDB } from './IndexedDB'
import { formatDate, isJson } from './Tools'
import { insertNoteClound } from './Worker'
export default {
    props: ['token', 'idUser','toggleWidht'],
    emits: ['reload-note','visible-notes'],
    data() {
        return {
            // toggleWidht: null,
            // screenWidth: null,
            toggleTitle: false,
            descriptionList: false,
            enteredTitle: null,
            enteredDescription: null,
            enteredListDescription: [],
            checkedBoxListDescription: false,
            descriptionListEdite: null,
            checkBoxValue: null,
            editListDescription: null,
            buttonEnterNote: false,
            showButtonEnterNote: true,
        }
    },
    methods: {
        // toggleScreen() {
        //     this.screenWidth = window.innerWidth;
        //     if (this.screenWidth < 500) {
        //         this.toggleWidht = true;
                
        //     } else {
        //         this.toggleWidht = false;
                               
        //     }
        // },

        async addTitleDescription() {
            //Add title and description to database
            const title = this.enteredTitle;
            const description = { 'value': null };

            if (this.descriptionList == true) {
                if (this.enteredDescription != null && this.enteredDescription != "") {
                    this.enteredListDescription.push({ checkBox: this.checkedBoxListDescription, description: this.enteredDescription });
                }
                description.value = JSON.stringify(this.enteredListDescription)
            } else {
                description.value = this.enteredDescription;
            }

            if (title != null || description.value != null) {

                if (navigator.onLine) {
                    try {
                        resultCloundInsertNote = await insertNoteClound(title, description.value, this.token, this.idUser)
                        if (resultCloundInsertNote.res.noteinsert === true) {
                            const noteId = resultCloundInsertNote.res.lastNote.results[0].noteId;
                            const usersId = resultCloundInsertNote.res.lastNote.results[0].usersId;
                            const title = resultCloundInsertNote.res.lastNote.results[0].title;
                            const description = resultCloundInsertNote.res.lastNote.results[0].description;
                            const lastUpdate = resultCloundInsertNote.res.lastNote.results[0].lastUpdate;
                            const deleted = resultCloundInsertNote.res.lastNote.results[0].deleted;
                            addNoteIndexedDB(noteId, usersId, title, description, lastUpdate, deleted);
                            //return result;
                        }
                    } catch (error) {

                        const noteId = null;
                        const usersId = this.idUser;
                        const dateNow = new Date();
                        const lastUpdate = formatDate(dateNow, "yyyy-mmm-dd hh:mm:ss");
                        const deleted = null;

                        addNoteIndexedDB(noteId, usersId, title, description.value, lastUpdate, deleted);
                    }
                } else {
                    const noteId = null;
                    const usersId = resultCloundLogin.userAuthentication.idUser;
                    const dateNow = new Date();
                    const lastUpdate = formatDate(dateNow, "yyyy-mmm-dd hh:mm:ss");
                    const deleted = null;

                    addNoteIndexedDB(noteId, usersId, title, description.value, lastUpdate, deleted);
                }


                //await addNote(title, description.value);
                //const note = await getNoteIndexedDB(idUser); 
                //allNote.value = note;
                this.enteredTitle = null;
                this.enteredDescription = null;
                this.toggleTitle = false;
                //noNote.value = false;
                //reloadNote(); rever se é necessário
            } else {
                // if (allNote.value == "") {
                //     noNote.value = true
                // }
            }
            //buttonEnterNote.value = false;
            this.enteredListDescription = []
            this.$emit('reload-note')
        },

        addDescriptionList() {
            //Add description list
            //const checkBox = this.checkedBoxListDescription;
            //const description = { 'value': this.enteredDescription }
            if (this.enteredDescription != null && this.enteredDescription != "") {
                this.enteredListDescription.push({ checkBox: this.checkedBoxListDescription, description: this.enteredDescription });
            }

            this.enteredDescription = null;
            this.checkedBoxListDescription = false;
            //textlist.value.focus()
        },

        deleteDescriptionItem(idx) {
            this.enteredListDescription.splice(idx, 1)
        },

        editeDescriptionItem(idx) {
            //Edit description list

            if (this.editListDescription === null && this.editListDescription != "") {
                this.descriptionListEdite = this.enteredListDescription[idx].description
                this.checkBoxValue = !this.enteredListDescription[idx].checkBox
            } else {
                this.descriptionListEdite = this.editListDescription
                this.checkBoxValue = this.enteredListDescription[idx].checkBox
            }

            this.enteredListDescription.splice(idx, 1, { checkBox: this.checkBoxValue, description: this.descriptionListEdite })
            this.editListDescription = null;
        }


    },
    mounted() {
        // window.addEventListener('resize', this.toggleScreen),
        //     this.toggleScreen();
       // console.log("App token")
    }


}
</script>