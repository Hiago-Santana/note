<template>
    <div>
        <nav v-if="!toggleModal && !noNote || toggleModal && !toggleWidht && !noNote"
            class="sticky w-full top-0 bg-white p-2 drop-shadow shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]  dark:bg-zinc-900 mb-2">
            <div class="flex justify-center bg-gray-100 p-2 rounded-md dark:bg-zinc-800">
                <span v-if="showButtonReturn">
                    <button
                        @click="searchResult = [], valueSearch = null, showButtonReturn = false, $emit('hide-all-notes', true)"
                        class="focus:outline-none"><font-awesome-icon icon="fa-solid fa-arrow-left" /></button>
                </span>
                <input v-bind="searchNote()" :value="valueSearch" @input="event => valueSearch = event.target.value"
                    placeholder="Pesquise suas notas"
                    class="bg-gray-100  break-words input input-bordere w-full rounded-md m-1 focus:outline-none dark:bg-zinc-800">
            </div>
        </nav>

        <!-- Search Result -->
        <div v-if="!buttonEnterNote && !toggleModal" class=" flex flex-col w-full dark:bg-zinc-900 p-[2rem] py-0 mb-4">
            <div class="grid xl:grid-cols-9 xl:gap-4 md:grid-cols-5 md:gap-3 ph:grid-cols-2 ph:gap-2 dark:bg-zinc-900">
                <div class="container shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)] p-2 rounded-md mt-2 content-start break-words font-semibold hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)] dark:bg-zinc-900"
                    v-for="entered in searchResult" :key="entered"
                    @click="$emit('show-accessed-note', entered.id), $emit('visible-search-system', false), toggleTitle = false">{{
                        entered.title
                    }}
                    <div v-if="Array.isArray(entered.description)">

                        <div v-for="entereds in entered.description" :key="entereds" class="grid grid-cols-12">
                            <input type="checkbox" :checked=entereds.checkBox
                                class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center mx-2 ">
                            <input type="text" :value=entereds.description
                                class="col-start-2 col-span-11 ml-1 font-normal dark:bg-zinc-900">
                        </div>
                    </div>
                    <div v-else>

                        <p class="font-normal text-left dark:bg-zinc-900">{{ entered.description }}</p>
                    </div>
                    <!-- <p class="font-normal text-start dark:bg-zinc-900">{{ entered.description }}</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['index', 'allNote'],
    emits: ['hide-all-notes', 'show-accessed-note', 'visible-search-system'],
    data() {
        return {
            valueSearch: null,
            valueSearchCopy: null,
            showButtonReturn: false,
            searchResult: [],
            
            
        }
    },
    methods: {
        async searchNote() {
            if (this.valueSearchCopy != this.valueSearch) {
                this.valueSearchCopy = this.valueSearch;
                if (this.valueSearch != null) {
                    this.$emit('hide-all-notes', false, true)
                    this.showButtonReturn = true;
                    this.searchResult = [];
                    const result = this.index.search(this.valueSearch);
                    const size = result.length;


                    for (let i = 0; i < size; i++) {
                        const id = result[i];
                        const title = this.allNote.find(Element => Element.id == id).title
                        const description = this.allNote.find(Element => Element.id == id).description
                        this.searchResult.push({ id: id, title: title, description: description });
                    }
                } else
                    if (this.searchResult.length > 0) {
                        this.showButtonReturn = true;
                    }
            }

        }
    }
}
</script>