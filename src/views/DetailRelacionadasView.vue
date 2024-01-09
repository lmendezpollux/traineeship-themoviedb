<template>
  <div
    div
    class="bg-fixed bg-cover transition-opacity"
    :style="{
      backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${detalles.backdrop_path})`,
    }"
  >
    <section class="section bg-cover w-screen max-[1000px]:h-full">
      <div
        class="grid content-center text-center pl-20 text-black-900 max-h-2/4 w-full max-[1000px]:pl-0"
      >
        <div
          :class="[estado ? 'bg-black/40' : 'bg-white/20']"
          class="grid mt-10 degradadoNegro max-[1000px]:rounded-none justify-items-center backdrop-blur-md rounded-xl w-2/4 p-10 max-[1000px]:p-0 max-[1000px]:w-full"
        >
          <img
            :src="
              'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' +
              detalles.poster_path
            "
            :alt="detalles.name"
            class="z-10 rounded-xl"
          />
          <h3 class="font-bold mt-5" v-if="detalles.name">
            {{ detalles.name }}
          </h3>
          <h3 class="font-bold mt-5" v-if="detalles.title">
            {{ detalles.title }}
          </h3>
          <film-star :info="detalles.vote_average" />
          <p class="mt-20 text-justify">{{ detalles.overview }}</p>
          <p class="mt-20" v-if="detalles.first_air_date">
            Fecha de salida: {{ detalles.first_air_date }}
          </p>
          <p class="mt-20" v-if="detalles.release_date">
            Fecha de salida: {{ detalles.release_date }}
          </p>
          <div class="flex justify-center m-3">
      <button
        class="bg-green-700 hover:bg-green-900 transition-all rounded-lg p-3 text-center"
        @click="addFavorites(detalles)"
        v-if="!favoritesStore"
      >
        Agregar a Favoritos
      </button>
      <button
        class="bg-red-800 hover:bg-red-900 transition-all rounded-lg p-3 text-center"
        @click="deleteAFavorites(detalles.id)"
        v-else
      >
        Eliminar de Favoritos
      </button>
    </div>
        </div>
        
      </div>
    </section>
    
    <section class="mt-32 max-[1000px]:mt-12 p-2">
      <h3 class="ml-12 font-bold text-xl">Cast</h3>
      <div class="flex overflow-x-auto p-10 max-[1000px]:m-2">
        <card-cast v-for="(actor, i) in cast" :key="i" :informacion="actor" />
      </div>
    </section>
  </div>
</template>

<script>
import CardCast from "@/components/CardCast.vue";
import FilmStar from "@/components/FilmStar.vue";
import { services } from "@/services/api";

export default {
  components: { CardCast, FilmStar },
  name: "DetailRelacionadasView",
  async mounted() {
    this.detalles = await services.detailViewRelacionadasFilms(
      this.type,
      this.id
    );
    this.cast = await services.detailViewRelacionadasCast(this.type, this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
      type: this.$route.params.type,
      detalles: [],
      cast: [],
    };
  },
  methods: {
    addFavorites(favorite) {
      favorite.media_type = this.type;
      this.$store.dispatch("addFavorites", favorite);
    },
    deleteAFavorites(id) {
      this.$store.dispatch("deleteFavorites", id);
    },
  },
  computed: {
    favoritesStore() {
      const estado = this.$store.state.favorites.favorites.find(
        (fav) => fav.id == this.id
      );

      return estado ? true : false;
    },
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },
};
</script>

<style></style>
