<template>
    <section class="h-screen ">

        <div class="flex w-screnn h-screen">
            <div class="flex-auto w-1/6"></div>
            <div class="flex-auto min-w-75% max-w-sm self-center border rounded-md dark:border-gray-700">
                <div v-if="!logIn && !buttonSignUpLogIn" class="grid mx-8 my-40">
                    <div class="grid grid-rows-2 content-center mx-8">
                        <h1 class="text-2xl mb-1 text-blue-500">1 Note</h1>

                        <h2 class="mb-10 text-sm">Suas anotações em um único lugar.</h2>
                        <button @click="buttonSignUpLogIn = 'log'" class="mb-2 bg-blue-500 rounded-md p-1">Entrar</button>
                        <button @click="buttonSignUpLogIn = 'sigUp'"
                            class="mb-40 dark:bg-zinc-900 border-2 border-blue-500 rounded-md p-1">Criar conta </button>
                    </div>
                </div>
                <div v-if="!logIn && buttonSignUpLogIn == 'sigUp'" class="grid mx-8 my-40 h-full">
                    <div class="grid content-center mx-10 h-full">
                        <h1 class="text-2xl text-blue-500 grid content-center">Crie uma conta</h1>
                        <div class="grid content-end h-96">
                            <p class="text-red-600">{{ mensageAlerte }}</p>
                            <input type="text" placeholder="nome" v-model="newUserName"
                                class="border-2 rounded border-gray-200 mb-2 bg-inherit focus:outline-none">
                            <input type="text" placeholder="email" v-model="newUserEmail"
                                class="border-2 rounded border-gray-200 mb-2 bg-inherit focus:outline-none">
                            <span class="flex">
                                <input v-if="showPassword" type="text" placeholder="senha" v-model="newUserPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none">
                                <input v-else type="password" placeholder="senha" v-model="newUserPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none">

                                <span v-if="!showPassword"><button @click="toggleShowPassword" class="flex-none w-8 border-2 rounded border-gray-200"><font-awesome-icon
                                            icon="fa-regular fa-eye" /></button></span>
                                <span v-if="showPassword"><button @click="toggleShowPassword" class="flex-none w-8 border-2 rounded border-gray-200"><font-awesome-icon
                                            icon="fa-regular fa-eye-slash " /></button></span>
                            </span>



                            <button @click="sigUp()" class="mb-2 mt-4 bg-blue-500 rounded-md p-1">Criar conta</button>
                            <p class="grid justify-items-center">ou</p>
                            <button @click="buttonSignUpLogIn = 'log', mensageAlerte = null"
                                class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-20">Entrar</button>
                        </div>
                    </div>
                </div>
                <div v-if="!logIn && buttonSignUpLogIn == 'log'" class="grid mx-8 my-40 h-full">
                    <div class="grid content-center mx-10 h-full">
                        <h1 class="text-2xl text-blue-500 grid content-center">Bem vindo de volta</h1>
                        <div class="grid content-end h-96">
                            <p class="text-red-600">{{ mensageAlerte }}</p>
                            <input type="text" placeholder="email" v-model="logEmail"
                                class="mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none">
                            <span class="flex">
                                <input v-if="showPassword" type="text" placeholder="senha" v-model="logPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none">
                                <input v-if="!showPassword" type="password" placeholder="senha" v-model="logPassword"
                                    class="flex-initial w-full mb-2 bg-inherit border-2 rounded border-gray-200 focus:outline-none">

                                <span v-if="!showPassword"><button @click="toggleShowPassword" class="flex-none w-8 border-2 rounded border-gray-200"><font-awesome-icon
                                            icon="fa-regular fa-eye" /></button></span>
                                <span v-if="showPassword"><button @click="toggleShowPassword" class="flex-none w-8 border-2 rounded border-gray-200"><font-awesome-icon
                                            icon="fa-regular fa-eye-slash" /></button></span>
                            </span>
                            
                            <div class="grid grid-cols-1 place-items-center first-line:w-full content-center">
                                
                              <button @click="userLog(logEmail, logPassword)"
                                class="mb-2 mt-4 bg-blue-500 rounded-md p-1 w-2/5 place-self-center">Entrar </button>  
                               <p class="grid justify-items-center">ou</p>
                            <button @click="buttonSignUpLogIn = 'sigUp', mensageAlerte = null"
                                class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-40">Criar Conta</button>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-1/6"></div>
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
                const uniqueUser = await checkUniqueUser(this.newUserEmail)
                console.log("uniqueUser", uniqueUser.result.uniqueUser)

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

