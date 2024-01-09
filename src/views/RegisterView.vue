<template>
    <section class="h-screen grid pt-20 justify-center align-middle items-center ">
        <div class="grid justify-center">
            <p
            :class="[estado ? 'text-gray-300' : 'text-black']"
            class="text-xl font-bold text-center"
          >
            Registrarse
          </p>
        <div class="grid justify-center items-center">
          <label
          :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
          class="block mt-2 font-bold mb-2"
          for=""
          >Nombre de usuario</label
        >
        <input
          :class="[
            estado
              ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
              : 'text-greyMain ',
          ]"
          type="text"
          class="w-96 h-9 pl-2 border rounded-lg"
          v-model="nombre"
        />
        <label
          :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
          class="block mb-2 mt-2 font-bold"
          for=""
          >Email</label
        >
        <input
          :class="[
            estado
              ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
              : 'text-greyMain ',
          ]"
          type="text"
          class="w-96 h-9 pl-2 border rounded-lg"
          v-model="email"
        />
        <label
          :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
          class="block mb-2 mt-2 font-bold"
          for=""
          >Contraseña</label
        >
        <input
          :class="[
            estado
              ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
              : 'text-greyMain ',
          ]"
          type="password"
          v-model="contraseña"
          class="w-96 h-9 pl-2 border rounded-lg"
        />
      </div>
      <button
            class="ml-auto mt-5 mb-5 mr-auto bg-greenVue font-semibold hover:bg-green-700 transition-all text-white p-2 rounded-md"
        @click="logWithEmail"
            >
            Registrate
          </button>
      <div class="flex justify-center items-center align-middle pb-10">
        <div class="grid justify-center">
          <p
            :class="[estado ? 'text-gray-300' : 'text-black']"
            class="text-xl font-bold"
          >
            O registrate con:
          </p>

          <svg
            :class="[estado ? 'text-black' : 'text-white']"
            class="h-14 w-14 mr-auto ml-auto cursor-pointer bg-greenVue font-semibold mt-5 hover:bg-green-700 transition-all p-2 rounded-full"
            @click="logIn"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
          </svg>
        </div>
      </div>
        </div>
       
      </section>      
</template>

<script>
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { mapGetters } from "vuex";

export default {
    name:"RegisterView",
    data(){
    return{
        email: "",
        contraseña: "",
        nombre: ""
    }
  },
  methods: {
    logIn() {
      this.$store.dispatch("logIn");
    },
    logOut() {
      this.$store.dispatch("logOut");
    },
    logWithEmail(){
      const auth = getAuth();

      createUserWithEmailAndPassword(auth, this.email, this.contraseña).then((userCredential) => {
        const user = userCredential.user
        updateProfile(auth.currentUser, {
          displayName: this.nombre
        })
        router.push('/')
      })
    }
  },
  computed: {
    ...mapGetters(["showUsuario"]),
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },
};

</script>

<style>

</style>