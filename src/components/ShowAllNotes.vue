<template>
    <!-- <div v-if="!toggleModal || toggleModal && !toggleWidht"> -->
    <div
        class="grid 2xl:grid-cols-7 2xl:gap-4 xl:grid-cols-5 xl:gap-4 md:grid-cols-4 md:gap-3 sm:grid-cols-3 sm:gap-2 ph:grid-cols-2 ph:gap-2 dark:bg-zinc-900 pb-4 px-4">
        <div class="hidden">
            <h1 id="1" class="display:true">Visible</h1>
            <h1 id="2" class="hidden">Invisible</h1>
        </div>
        <div v-for="entered in allNote" :key="entered" @click="$emit('show-accessed-note',entered.id), $emit('visible-notes',false), $emit('visible-search-system', false), toggleTitle = false" class="">
            <div v-if="entered.deleted == null"
                class=" container shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]  p-2 rounded-md mt-2 content-start break-words font-semibold hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)] dark:bg-zinc-900 dark:shadow-none dark:border-2 dark:border-gray-700">
                <div v-if="Array.isArray(entered.description)">
                    <h2 class="text-center">{{ entered.title }}</h2>
                    <div v-for="entereds in entered.description" :key="entereds" class="grid grid-cols-12">
                        <input type="checkbox" :checked=entereds.checkBox
                            class="col-start-1 col-span-1 object-contain h-4 w-4 place-self-center mx-2 ">
                        <input type="text" :value=entereds.description
                            class="col-start-2 col-span-11 ml-1 font-normal dark:bg-zinc-900">
                    </div>
                </div>
                <div v-else>
                    <h2 class="text-center">{{ entered.title }}</h2>
                    
                    <p class="font-normal text-left dark:bg-zinc-900">{{ entered.description }}</p>
                </div>
            </div>
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    props:['allNote'],
    emits:['show-accessed-note','visible-notes','visible-search-system']
}
</script>