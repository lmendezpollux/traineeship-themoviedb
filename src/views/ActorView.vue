<template>
  <div class="mt-20 max-[1000px]:pl-5">
    <section
      class="flex items-center justify-center max-[1000px]:pl-5 max-[1000px]:flex-wrap"
    >
      <img
        v-if="person.profile_path"
        :src="
          'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' +
          person.profile_path
        "
        :alt="person.name"
        class="w-60 h-96 rounded-xl"
      />
      <img
        v-else
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg"
        :alt="person.name"
        class="w-56 h-96 rounded-xl"
      />
      <div class="w-2/4 p-8 max-[1000px]:w-full text-justify">
        <h2 class="font-bold text-greyMain">{{ person.name }}</h2>
        <p class="text-gray-400">{{ person.birthday }}</p>
        <p class="mt-2.5 text-gray-400">{{ person.biography }}</p>
      </div>
      
    </section>
    <div class="flex justify-center m-3">
      <button
        class="bg-green-700 hover:bg-green-900 transition-all rounded-lg p-3 text-center"
        @click="favorites(person)"
        v-if="!favoritesStore"
      >
        Agregar a Favoritos
      </button>
      <button
        class="bg-red-800 hover:bg-red-900 transition-all rounded-lg p-3 text-center"
        @click="deleteFavorites(person.id)"
        v-else
      >
        Eliminar de Favoritos
      </button>
    </div>
    <section class="mt-32 max-[1000px]:mt-12 p-2">
      <h3
        class="ml-12 font-bold text-xl"
      >
        Peliculas o series en las que actuó:
      </h3>
      <div class="flex overflow-x-auto p-10 max-[1000px]:m-2">
        <card-cast-films
          v-for="(film, i) in personFilms"
          :key="i"
          :informacion="film"
        />
      </div>
      
    </section>
  </div>
</template>

<script>
import CardCastFilms from "@/components/CardCastFilms.vue";
import { services } from "@/services/api";

export default {
  components: { CardCastFilms },
  name: "ActorView",
  async mounted() {
    this.person = await services.actorViewDetail(this.id);
    this.personFilms = await services.actorViewFilms(this.id);
  },
  data() {
    return {
      id: this.$route.params.id,
      person: [],
      personFilms: [],
    };
  },
  methods: {
    favorites(favorite) {
      favorite.media_type = "person";
      this.$store.dispatch("addFavorites", favorite);
    },
    deleteFavorites(favorite) {
      this.$store.dispatch("deleteFavorites", favorite);
    },
  },
  computed: {
    favoritesStore() {
      const estado = this.$store.state.favorites.favorites.find(
        (fav) => fav.id == this.id
      );

      return estado ? true : false;
    },
  },
};
</script>

<style scoped>
/* .button {
    @apply bg-re
} */
</style>
