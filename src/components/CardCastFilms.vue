<template>
    <div>
        <router-link :to="`/${informacion.media_type}/${nombre}/${informacion.id}`">
            <div class="grid m-2 w-52 shadow-lg hover:shadow-xl hover:scale-110 duration-700">
                <img v-if="informacion.backdrop_path" :src="
                  'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                  informacion.backdrop_path
                " :alt="informacion.name"
                class="rounded-t-lg max-w-fit h-80"
                />
              <img v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" :alt="informacion.name" class="w-56 h-80"/>
                <div :class="[estado ? 'bg-black/40 text-white' : 'bg-white/20 text-greyMain']" class="flex items-center backdrop-blur-md max-h-full h-20 rounded-b-xl font-bold p-2 ">
                    <h4 v-if="informacion.name">{{ informacion.name }}</h4>
                    <h4 v-else>{{ informacion.title }}</h4>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "CardCastFilms",
    props: ["informacion"],
    data(){
        return{
            informacionProp: this.informacion
        }
    },
    computed:{
        nombre(){
            return this.informacionProp.title || this.informacionProp.name
        },
        estado() {
      return this.$store.state.darkMode.darkModeState;
    },
    }
};
</script>

<style></style>
