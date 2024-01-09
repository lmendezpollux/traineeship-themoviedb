<template>
  <div class="min-h-screen">
    <div v-if="showFavorites" class="px-10 max-[500px]:px-4 mb-5">
      <input
        type="text"
        v-model="informaciones"
        :class="[
          estado
            ? 'bg-transparent border-2 text-white border-white/10'
            : 'bg-white text-greyMain/80',
        ]"
        placeholder="Busca entre tus favoritos"
        class="pl-3 mt-5 h-10 border-2 rounded-md w-96"
      />
      <select class="pl-3 mt-5 h-10 border-2 rounded-md w-32 ml-2" :class="[
          estado
            ? 'bg-transparent border-2 text-white border-white/10'
            : 'bg-white text-greyMain/80',
        ]" name="select" v-model="options" :value="options">
        <option class="text-greyMain/80">Todos</option>
        <option class="text-greyMain/80" value="tv">Series</option>
        <option class="text-greyMain/80" value="movie">Peliculas</option>
        <option class="text-greyMain/80" value="person">Actores</option>
      </select>
      <card-search v-for="(fav, i) in filtrarPorTipo" :key="i" :informacion="fav" />
    </div>
    <div
      v-if="showFavorites.length === 0"
      class="px-10 grid justify-center max-[500px]:px-4"
    >
      <h3
        :class="[estado ? 'text-white' : 'text-greyMain']"
        class="text-3xl mt-10"
      >
        Aún no has seleccionado ningun favorito
      </h3>
    </div>
  </div>
</template>

<script>
import CardSearch from "@/components/CardSearch.vue";
import { mapGetters } from "vuex";

export default {
  name: "FavoritesView",
  data() {
    return {
      informaciones: "",
      options: "Todos",
    };
  },
  computed: {
    ...mapGetters(["showFavorites"]),
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
    filtrarPorCaracter() {
      return this.showFavorites.filter((tipo) => {
        if (tipo.name !== undefined) {
          return tipo.name
            .toLocaleLowerCase()
            .includes(this.informaciones.toLocaleLowerCase());
        } else {
          return tipo.title
            .toLocaleLowerCase()
            .includes(this.informaciones.toLocaleLowerCase());
        }
      });
    },
    filtrarPorTipo: function(){
     return this.filtrarPorCaracter.filter((tipo) => {
       return this.options.includes("Todos") ? tipo : tipo.media_type.includes(this.options)
      })
    },
  },
  components: {
    CardSearch,
  },
};
</script>
