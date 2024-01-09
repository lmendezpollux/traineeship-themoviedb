<template>
   <section class="h-screen" v-if="showUsuario">
      <div class="grid mt-6 flex-nowrap justify-center items-center">
        <img v-if="showUsuario.photoURL"
          slot="start"
          class="rounded-full mx-auto mb-4"
          :src="showUsuario.photoURL"
          :alt="showUsuario.displayName"
        />
        <h1 :class="[estado ? 'text-gray-300' : 'text-greyMain']">
          Hola, {{ showUsuario.displayName }}
        </h1>
        <router-link
          class="mt-12 ml-auto mr-auto"
          :to="`/personalizar/usuario/${showUsuario.displayName}/${showUsuario.uid}`"
          ><button
            class="ml-auto mr-auto bg-greenVue font-semibold hover:bg-green-700 transition-all text-white p-2 rounded-md"
          >
            Editar perfil
          </button></router-link
        >
          <button
            class="bg-red-700 hover:bg-red-900 transition-colors transition-all mt-20 text-white p-2 rounded-md"
            @click="logOut"
          >
            Cerrar sesión
          </button>
      </div>
    </section>
    <section v-else>
      <nav class="absolute left-10 right-10">
      <p
            :class="[estado ? 'text-gray-300' : 'text-greyMain']"
            class="text-xl cursor-pointer font-bold text-center"
          >
       <a :class="{'text-greenVue': estadoSwitch}" @click="estadoSwitch = true">Iniciar sesion</a> | <a :class="{'text-greenVue': !estadoSwitch}" @click="estadoSwitch = false">Registrarse</a>  </p>
       
    </nav>
      <login-view v-if="estadoSwitch"></login-view>
      <register-view v-else></register-view>
    </section>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "@firebase/auth";
import { mapGetters } from "vuex";
import LoginView from "./LoginView.vue";
import RegisterView from "./RegisterView.vue";

export default {
  name: "PerfilView",
  data() {
    return {
      email: "",
      contraseña: "",
      nombre: "",
      estadoSwitch: true
    };
  },
  methods: {
    logIn() {
      this.$store.dispatch("logIn");
    },
    logOut() {
      this.$store.dispatch("logOut");
    },
    logWithEmail() {
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, this.email, this.contraseña).then(
        (userCredential) => {
          const user = userCredential.user;
          updateProfile(auth.currentUser, {
            displayName: this.nombre,
          });
        }
      );
    },
  },
  computed: {
    ...mapGetters(["showUsuario"]),
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },
  components: {
    RegisterView,
    LoginView,
  },
};
</script>

<style></style>
