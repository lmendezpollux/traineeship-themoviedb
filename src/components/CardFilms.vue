<template>
  <div >
    <router-link :to="`/${nombre}/${informacion.id}`">
      <div :class="[estado ? 'text-white/80' : 'text-greyMain']" class="grid hover:scale-110 duration-700 rounded-lg m-3 h-fit w-48">
        <img
          :src="
            'https://www.themoviedb.org/t/p/w220_and_h330_face' +
            informacion.backdrop_path
          "
          :alt="informacion.name"
          class=" w-48 rounded-t-lg"
        />
        <div
          class="
            font-bold
            rounded-b-lg
            min-h-full
            h-24
            p-3
            bg-white
            shadow-lg
          "
          :class="{ 'bg-darkModeCard/30' : estado }"
          
        >
          <film-star :info="informacion.vote_average" />
          <h4 class="line-clamp-2" v-if="informacion.name">{{ informacion.name }}</h4>
          <h4 class="line-clamp-2" v-else>{{ informacion.title }}</h4>
        </div>
      </div>
    </router-link>
    <router-view />
  </div>
</template>

<script>
import FilmStar from "./FilmStar.vue";

export default {
  components: { FilmStar },
  name: "CardFilms",
  props: ["informacion"],
  computed:{
        nombre(){
            return this.informacion.title || this.informacion.name
        },
        estado(){
        return this.$store.state.darkMode.darkModeState
    }
    }
};
</script>

<style>
</style>
