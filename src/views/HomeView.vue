<template>
  <div class="px-10 pb-10 max-[500px]:px-1">
    <div class="flex justify-center m-3 aling-center">
      <input
        type="text"
        class="border-2 w-96 rounded-lg border-2 text-center h-8"
        :class="[
          estado
            ? 'bg-transparent border-2 border-white/10 text-white'
            : 'text-black bg-white',
        ]"
        v-on:input="debounceInput"
        @keyup.enter="$router.push(`/${busqueda}`)"
        placeholder="Ingresa el nombre de algun actor, serie o pelicula"
      />
      <div>
        <router-link :to="`/${busqueda}`">
          <button
            class="w-20 rounded-lg h-8 ml-2 bg-greenVue font-semibold hover:bg-green-700 transition-all"
          >
            Buscar
          </button>
        </router-link>
      </div>
    </div>
    <div v-if="busqueda">
      <card-search
        v-for="(resultado, index) in resultados"
        :informacion="resultado"
        :key="index"
      />
      <loarder-circle :loading="loader" />
    </div>
    <div>
      <h3
        :class="[estado ? 'text-white' : 'text-greyMain']"
        class="mt-20 font-extrabold text-2xl text-left ml-12 max-[500px]:ml-6"
      >
        Lo mas popular
      </h3>
      <div
        class="flex mb-50 mt-30 ml-90 height-480 overflow-x-visible overflow-y-hidden p-10 max-[500px]:p-3"
      >
        <card-films
          v-for="(pelicula, index) in showPelisPopulares"
          :key="index"
          :informacion="pelicula"
        />
      </div>
      <template v-if="showUsuario">
        <h3
          :class="[estado ? 'text-white' : 'text-greyMain']"
          class="mt-20 font-extrabold text-2xl text-left ml-12 max-[500px]:ml-6"
        >
          Según tus gustos:
        </h3>

        <div v-for="(fav, index) in gustos" :key="index">
          <h3
            :class="[estado ? 'text-white' : 'text-greyMain']"
            class="mt-20 font-extrabold text-2xl text-left ml-12 max-[500px]:ml-6"
          >
            {{ showTasteNames[index] }}
          </h3>
          <div
            class="flex mb-50 mt-30 ml-90 height-480 overflow-x-visible overflow-y-hidden p-10 max-[500px]:p-3"
          >
            <card-cast-movie
              v-for="(pelicula, index) in showTasteInfo[index]"
              :key="index"
              :informacion="pelicula"
            />
          </div>
        </div>
      </template>

      <h3
        :class="[estado ? 'text-white' : 'text-greyMain']"
        class="mt-20 font-extrabold text-2xl text-left ml-12 max-[500px]:ml-6"
      >
        Mejor puntuadas
      </h3>
      <div
        class="flex mb-50 mt-30 ml-90 height-480 overflow-x-visible overflow-y-hidden p-10 max-[500px]:p-3"
      >
        <card-films
          v-for="(pelicula, index) in showPelisMejorPuntuadas"
          :key="index"
          :informacion="pelicula"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardFilms from "@/components/CardFilms.vue";
import CardSearch from "@/components/CardSearch.vue";
import { mapGetters } from "vuex";
import { debounce } from "debounce";
import { services } from "@/services/api";
import LoarderCircle from "@/components/LoarderCircle.vue";
import CardCastFilms from "@/components/CardCastFilms.vue";
import genres from "@/assets/generos.js";
import CardCastMovie from "@/components/CardCastMovie.vue";

export default {
  created() {
    if (this.showTasteInfo.length === 0 || this.showTasteNames.length === 0) {
     this.$store.dispatch("getNombreGustos");
     this.$store.dispatch("getInformacionGustos");
    }
  },
  name: "HomeView",
  data() {
    return {
      busqueda: "",
      loader: false,
      genres: genres,
    };
  },
  components: {
    CardFilms,
    CardSearch,
    LoarderCircle,
    CardCastFilms,
    CardCastMovie,
  },

  computed: {
    ...mapGetters([
      "showPelisPopulares",
      "showPelisMejorPuntuadas",
      "showUsuario",
      "showTasteNames",
      "showTasteInfo",
    ]),
    gustos() {
      return this.$store.getters.showUsuarioData.fav;
    },
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },

  watch: {
    busqueda: {
      handler() {
        this.search();
      },
    },
    deep: true,
  },

  methods: {
    debounceInput: debounce(function (e) {
      this.loader = true;
      this.busqueda = e.target.value;
    }, 500),

    async search() {
      const { results } = await services.search(this.busqueda);
      this.resultados = results;
      this.loader = false;
    },
  },
};
</script>

<style>
.height-480 {
  min-height: 520px;
}

@media screen and (max-width: 1000px) {
  .home {
    padding: 0px 10px 0px 10px;
  }
  .flex-card,
  .titleButtom {
    margin-left: 0px;
  }
  .titleMain {
    margin-top: 30px;
    margin-left: 15px;
  }
}
</style>
