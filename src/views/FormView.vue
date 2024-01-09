<template>
  <div
    class="text-greyMain grid h-screen justify-center align-middle text-justify mt-10 min-w-full max-[500px]:px-14 max-[500px]:mb-32"
  >
    <img
      v-if="showUsuario.photoURL"
      class="rounded-full mr-auto ml-auto"
      :src="showUsuario.photoURL"
      alt="userLogo"
    />
    <label
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      class="block mt-5"
      >Nombre</label
    >
    <input
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      type="text"
      v-model="showUsuario.displayName"
    />
    <label
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      class="block mt-5"
      >Email</label
    >
    <input
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      type="text"
      class="w-96 max-[500px]:w-72"

      disabled
      v-model="showUsuario.email"
    />
    <label
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      class="block mt-5"
      >Descripcion</label
    >
    <textarea
      :class="[
        estado
          ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
          : 'text-greyMain',
      ]"
      class="block resize-none"
      type="textarea"
      placeholder="Ingresa alguna descripcion acerca de ti"
      v-model="showUsuarioData.descripcion"
    ></textarea>
    <label
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      class="block mt-5"
      >Genero favorito</label
    >
    <select
      :class="[
        estado
          ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
          : 'text-greyMain',
      ]"
      name="generos"
      class="h-32 border"
      v-model="showUsuarioData.fav"
      multiple="true"
    >
      <option v-for="(gen, i) in genders" :value="gen.id" :key="i">{{ gen.name }}</option>
    </select>

  
    
    <label
      :class="[estado ? 'text-white bg-transparent' : 'text-greyMain']"
      class="block mt-5"
      >Pais</label
    >
    <select
      :class="[
        estado
          ? 'text-white bg-transparent border-2 border-white/10 p-2 rounded-md'
          : 'text-greyMain ',
      ]"
      name="paises"
      v-model="showUsuarioData.pais"
    >
      <option
        :class="[estado ? 'text-black bg-transparent' : 'text-greyMain']"
        v-for="(pais, i) in paises"
        :key="i"
      >
        {{ pais.name }}
      </option>
    </select>
    <router-link class="ml-auto mr-auto" to="/perfil">
      <button
        class="mt-5 bg-greenVue font-semibold hover:bg-green-700 transition-all text-white p-2 rounded-md"
        @click="saveInFirebaseAndVuex(uid)"
      >
        Guardar
      </button>
    </router-link>
  </div>
</template>

<script>
import generos from "@/assets/generos.js";
import countries from "@/assets/paises.js";
import { mapGetters } from "vuex";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";



export default {
  name: "FormView",
  data() {
    return {
      genders: generos,
      paises: countries,
      uid: this.$route.params.id,
    };
  },
  methods: {
    saveInFirebaseAndVuex(uid) {
      try {
        setDoc(doc(db, "usuarios", uid), this.showUsuarioData);
        this.$store.dispatch("usuarioData", this.showUsuarioData);
        this.$store.dispatch("getNombreGustos");
        this.$store.dispatch("getInformacionGustos");
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    ...mapGetters(["showUsuario", "showUsuarioData"]),
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },

};
</script>

<style>

</style>
