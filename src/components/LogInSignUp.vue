<template>
    <section class="h-screen ">
        <div class="flex justify-center w-screen h-screen">

            <div v-if="!logIn && !buttonSignUpLogIn"
                class="flex flex-auto min-w-80% max-w-sm h-[80%] justify-center self-center border rounded-md dark:border-gray-700  mx-8 my-40 shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]">
                <div class="grid grid-rows-2 content-center mx-8">
                    <div class="flex items-center">
                        <h1 class="text-2xl mb-1 text-blue-500 font-semibold drop-shadow-md">1 Note</h1>
                    </div>
                    <div class="grid content-center">
                        <div class="flex justify-center">
                            <h2 class="text-sm my-3 ">Suas anotações em um único lugar.</h2>
                        </div>
                        <button @click="buttonSignUpLogIn = 'log'"
                            class="mb-1 h-8 bg-blue-500 rounded-md p-1 hover:bg-blue-600 hover:text-white">Entrar</button>
                        <button @click="buttonSignUpLogIn = 'sigUp'"
                            class="mb-1 h-8 dark:bg-zinc-900 border-2 border-blue-500 rounded-md p-1 hover:bg-blue-600 hover:text-white">Criar
                            conta </button>
                    </div>
                </div>
            </div>

            <div v-if="!logIn && buttonSignUpLogIn == 'sigUp'"
                class="flex flex-auto min-w-80% max-w-sm h-[80%] justify-center self-center border rounded-md dark:border-gray-700  mx-8 my-40 shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]">
                <div class="grid grid-rows-2 content-center mx-10 h-full">
                    <div class="text-2xl text-blue-500 font-semibold grid content-center">
                        <h1>Crie uma conta</h1>
                    </div>
                    <div class="grid content-end">
                        <p class="text-red-600">{{ mensageAlerte }}</p>
                        <input type="text" placeholder="nome" v-model="newUserName"
                            class="capitalize border-2 rounded border-gray-200 mb-2 bg-inherit focus:outline-none dark:border-gray-800">
                        <input type="text" placeholder="email" v-model="newUserEmail"
                            class="lowercase border-2 rounded border-gray-200 mb-2 bg-inherit focus:outline-none dark:border-gray-800">
                        <span class="flex">
                            <input v-if="showPassword" type="text" placeholder="senha" v-model="newUserPassword"
                                class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none dark:border-gray-800">
                            <input v-else type="password" placeholder="senha" v-model="newUserPassword"
                                class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none dark:border-gray-800">
                            <span v-if="!showPassword"><button @click="toggleShowPassword"
                                    class="flex-none w-8 border-2 rounded border-gray-200 dark:border-gray-800 hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)]"><font-awesome-icon
                                        icon="fa-regular fa-eye" /></button></span>
                            <span v-if="showPassword"><button @click="toggleShowPassword"
                                    class="flex-none w-8 border-2 rounded border-gray-200 dark:border-gray-800 hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)]"><font-awesome-icon
                                        icon="fa-regular fa-eye-slash " /></button></span>
                        </span>
                        <button @click="sigUp()" class="mb-2 mt-4 bg-blue-500 rounded-md p-1 hover:bg-blue-600 hover:text-white">Criar
                            conta</button>
                        <p class="grid justify-items-center ">ou</p>
                        <button @click="buttonSignUpLogIn = 'log', mensageAlerte = null"
                            class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-20 hover:bg-blue-600 hover:text-white">Entrar</button>
                    </div>
                </div>
            </div>

            <div v-if="!logIn && buttonSignUpLogIn == 'log'"
                class="flex flex-auto min-w-80% max-w-sm h-[80%] justify-center self-center border rounded-md dark:border-gray-700  mx-8 my-40 shadow-[0_7px_15px_1px_rgba(0,0,0,0.3)]">
                <div class="grid grid-rows-2 content-center mx-10 h-full">
                    <div class="text-2xl text-blue-500 font-semibold grid content-center">
                        <h1>Bem vindo de volta</h1>
                    </div>
                    <div>
                        <div class="grid content-end grid-">
                            <p class="text-red-600">{{ mensageAlerte }}</p>
                            <input type="text" placeholder="email" v-model="logEmail"
                                class="lowercase mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none dark:border-gray-800">
                            <span class="flex">
                                <input v-if="showPassword" type="text" placeholder="senha" v-model="logPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 dark:border-gray-800 focus:outline-none">
                                <input v-if="!showPassword" type="password" placeholder="senha" v-model="logPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none dark:border-gray-800">

                                <span v-if="!showPassword"><button @click="toggleShowPassword"
                                        class="flex-none w-8 border-2 rounded border-gray-200 dark:border-gray-800 hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)]"><font-awesome-icon
                                            icon="fa-regular fa-eye" /></button></span>
                                <span v-if="showPassword"><button @click="toggleShowPassword"
                                        class="flex-none w-8 border-2 rounded border-gray-200 dark:border-gray-800 hover:shadow-[0_7px_15px_1px_rgba(0,0,0,0.5)]"><font-awesome-icon
                                            icon="fa-regular fa-eye-slash" /></button></span>
                            </span>
                            <button @click="userLog(logEmail, logPassword)"
                                class="mb-2 mt-4 bg-blue-500 rounded-md p-1 dark:border-gray-800 hover:bg-blue-600 hover:text-white">Entrar
                            </button>
                            <p class="grid justify-items-center">ou</p>
                            <button @click="buttonSignUpLogIn = 'sigUp', mensageAlerte = null"
                                class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-40 hover:bg-blue-600 hover:text-white">Criar
                                Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { createAcount, logInCount, checkUniqueUser } from './Worker'
//import { reloadNote } from '../App.vue'

export default {
    emits: ["set-log-information", "call-reload-note"],
    data() {
        return {
            logIn: false,
            token: null,
            buttonSignUpLogIn: false,
            logEmail: null,
            logPassword: null,
            mensageAlerte: null,
            newUserEmail: null,
            newUserPassword: null,
            newUserName: null,
            resultCloundLogin: null,
            showPassword: false,
        }
    },
    methods: {
        async sigUp() {
            this.mensageAlerte = null;
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const emailValidate = re.test(this.newUserEmail);
            if (this.newUserName == null || this.newUserName == "") {
                this.mensageAlerte = "Preencha o campo nome."
                console.log("Erro nome", this.newUserName)
            }
            else if (emailValidate == false) {
                this.mensageAlerte = "Insira um email válido."

            } else if (this.newUserPassword == null || this.newUserPassword.length < 6) {
                this.mensageAlerte = "Insira uma senha com mais de 5 caracteres"
            }
            else {
                this.newUserEmail = this.newUserEmail.toLowerCase();
                const uniqueUser = await checkUniqueUser(this.newUserEmail)

                if (uniqueUser.result.uniqueUser) {
                    this.mensageAlerte = null;
                    await createAcount("createAcount", this.newUserName, this.newUserEmail, this.newUserPassword)
                    await this.userLog(this.newUserEmail, this.newUserPassword)
                } else {
                    this.mensageAlerte = "Esse usuário já exite."
                }

            }
        },

        async userLog(logEmail, logPassword) {
            this.mensageAlerte = null;
            logEmail = logEmail.toLowerCase();
            this.resultCloundLogin = await logInCount(logEmail, logPassword)
            if (this.resultCloundLogin.userAuthentication.authentication == true) {
                this.logIn = this.resultCloundLogin.userAuthentication.authentication;
                this.token = this.resultCloundLogin.userAuthentication.token
                const idUser = this.resultCloundLogin.userAuthentication.idUser
                this.$emit("set-log-information", this.token, idUser, this.logIn)
                this.$emit("call-reload-note");
            } else {
                this.mensageAlerte = "Usuário ou senha inválidos"

            }
        },

        toggleShowPassword() {
            this.showPassword = !this.showPassword
        }

    }
}
</script>

