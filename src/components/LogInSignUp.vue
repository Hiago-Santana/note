<template>
    <section class="h-screen ">
        <div class="flex w-screnn h-screen">
            <div class="flex-auto w-1/6"></div>
            <div class="flex-auto min-w-75% max-w-sm self-center border rounded-md dark:border-gray-700">
                <div v-if="!logIn && !buttonSignUpLogIn" class="grid  mx-8 my-40">
                    <h1 class="text-2xl mb-1 text-blue-500">1 Note</h1>
                    <h2 class="mb-10 text-sm">Suas anotações em um único lugar.</h2>
                    <button @click="buttonSignUpLogIn = 'log'" class="mb-2 bg-blue-500 rounded-md p-1">Log in</button>
                    <button @click="buttonSignUpLogIn = 'sigUp'"
                        class="mb-40 dark:bg-zinc-900 border-2 border-blue-500 rounded-md p-1">Sign
                        up</button>

                </div>
                <div v-if="!logIn && buttonSignUpLogIn == 'sigUp'" class="grid content-center ">
                    <div class="grid grid-cols-1 grid-rows-2 content-center mx-8">
                        <h1 class="text-2xl text-blue-500 grid content-center">Crie uma conta</h1>
                        <div class="grid content-center h-full">
                            <p class="text-red-600">{{ mensageAlerte }}</p>
                            <input type="text" placeholder="nome" v-model="newUserName"
                                class="mb-2 bg-inherit focus:outline-none">
                            <input type="text" placeholder="email" v-model="newUserEmail"
                                class="mb-2 bg-inherit focus:outline-none">
                            <input type="text" placeholder="senha" v-model="newUserPassword"
                                class="mb-2 bg-inherit focus:outline-none">
                            <button @click="sigUp()" class="mb-2 mt-4 bg-blue-500 rounded-md p-1">Sign up</button>
                            <p class="grid justify-items-center">or</p>
                            <button @click="buttonSignUpLogIn = 'log'" class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-20">Log in</button>
                        </div>
                    </div>
                </div>
                <div v-if="!logIn && buttonSignUpLogIn == 'log'" class="grid content-center mx-8">
                    <div class="grid grid-cols-1 grid-rows-2 content-center mx-8">
                        <h1 class="text-2xl text-blue-500 grid content-center">Bem vindo de volta</h1>
                        <div class="grid content-center h-full">
                            <p class="text-red-600">{{ mensageAlerte }}</p>
                            <input type="text" placeholder="email" v-model="logEmail"
                                class="mb-2 bg-inherit focus:outline-none">
                            <input type="text" placeholder="senha" v-model="logPassword"
                                class="mb-2 bg-inherit focus:outline-none">
                            <button @click="userLog(logEmail, logPassword)" class="mb-2 mt-4 bg-blue-500 rounded-md p-1">Log
                                in</button>
                            <p class="grid justify-items-center">or</p>
                            <button @click="buttonSignUpLogIn = 'sigUp'" class="mt-2 bg-inneret rounded-md p-1 border-blue-500 mb-40">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-1/6"></div>
        </div>
    </section>
</template>

<script>
import { createAcount, logInCount } from './Worker'
//import { reloadNote } from '../App.vue'

export default {
    emits: ["set-log-information", "call-reload-note"],
    data() {
        return {
            logIn: false,
            token: null,
            buttonSignUpLogIn: false,
            logEmail: 'hiago@hotmail.com',
            logPassword: "123456",
            mensageAlerte: null,
            newUserEmail: null,
            newUserPassword: null,
            newUserName: null,
            resultCloundLogin: null,

        }
    },
    methods: {
        async sigUp() {
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
                //console.log("Sucesso")
                createAcount("createAcount", this.newUserName, this.newUserEmail, this.newUserPassword)
            }
        },

        async userLog(logEmail, logPassword) {

            this.resultCloundLogin = await logInCount(logEmail, logPassword)
            if (this.resultCloundLogin.userAuthentication.authentication == true) {
                this.logIn = this.resultCloundLogin.userAuthentication.authentication;
                this.token = this.resultCloundLogin.userAuthentication.token
                const idUser = this.resultCloundLogin.userAuthentication.idUser
                //const allNoteClound = this.resultCloundLogin.userAuthentication.note
                //console.log("logIn", this.logIn);
                this.$emit("set-log-information", this.token, idUser, this.logIn)
                this.$emit("call-reload-note");

                //reloadNote()
            }
        }

    }
}
</script>

