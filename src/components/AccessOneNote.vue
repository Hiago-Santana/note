<template>
    <div v-if="toggleModal && !buttonEnterNote && toggleWidht" class="p-[2rem]">
        <div class="grid grid-cols-2">
            <button class="place-self-start"
                @click="editeNote(), toggleModal = false, addChecKBox = false"><font-awesome-icon
                    icon="fa-solid fa-arrow-left" /></button>
            <button @click="toggleModal = false, editeNote(null, 'deleted')" class="place-self-end"><font-awesome-icon
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
                <button @click="editeNote(trash = index)" class="invisible group-hover/item:visible "><font-awesome-icon
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
</template>
<script>
</script>