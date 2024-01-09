<template>
  <router-link :to="`/${informacion.media_type}/${nombre}/${informacion.id}`">
    <div :class="[estado ? 'border-darkModeCard border-2'  : 'border-2']" class="flex hover:scale-105 duration-500 transition items-center mt-4  rounded-2xl">
      <img
        v-if="informacion.profile_path"
        :src="
          'https://www.themoviedb.org/t/p/w94_and_h141_bestv2' +
          informacion.profile_path
        "
        :alt="informacion.name"
        class="max-h-32 rounded-l-lg"
      />
      <img
        v-else-if="informacion.poster_path"
        :src="
          'https://www.themoviedb.org/t/p/w94_and_h141_bestv2' +
          informacion.poster_path
        "
        :alt="informacion.name"
        class="max-h-32 rounded-l-lg "
      />
      <img
        v-else
        src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg"
        alt="desconocido"
        class="w-20 h-32 rounded-l-lg"
      />
      <div class="pl-3 transform">
        <h3 :class="[estado ? 'text-white'  : 'text-gray-500']" class="font-bold" v-if="informacion.name">
          {{ informacion.name }}
        </h3>
        <h3 :class="[estado ? 'text-white'  : 'text-gray-500']" class="font-bold" v-if="informacion.title">
          {{ informacion.title }}
        </h3>
        <p :class="[estado ?  'text-gray-300' : 'text-gray-500']" class="line-clamp-3" >{{ informacion.overview }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["informacion"],
  name: "CardSearch",
  computed: {
    nombre() {
      return this.informacion.title || this.informacion.name;
    },
    estado(){
        return this.$store.state.darkMode.darkModeState
    }
  },
};
</script>

<style>

</style>
