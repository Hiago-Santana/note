import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import LogInSignUp from './components/LogInSignUp.vue'
import AddNote from './components/AddNote.vue'
import ShowAllNotes from './components/ShowAllNotes.vue'
import AccessOneNote from './components/AccessOneNote.vue'
import SearchNote from './components/SearchNote.vue'

//import icons
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(faUserSecret, faXmark, faTrash, faCirclePlus, faArrowLeft, faListCheck, faX, faPlus, faEyeSlash, faEye)

const app = createApp(App);
app.component('login-sign-up', LogInSignUp);
app.component('add-note', AddNote);
app.component('show-all-notes', ShowAllNotes);
app.component('accessed-note', AccessOneNote);
app.component('search-note', SearchNote)


app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')
