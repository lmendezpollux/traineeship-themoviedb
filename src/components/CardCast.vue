<template>
    <div>
        <router-link :to="`/person/${informacion.name}/${informacion.id}`">
            <div class="grid hover:scale-110 duration-700 m-2 w-52 shadow-2xl overflow">
                <img v-if="informacion.profile_path" :src="
                  'https://www.themoviedb.org/t/p/w220_and_h330_face' +
                  informacion.profile_path
                " :alt="informacion.name"
                class="rounded-t-lg max-w-fit h-80"
                />
              <img v-else src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" :alt="informacion.name" class="backdrop-blur-md w-56 h-80" />
                <div :class="[estado ? 'bg-black/40' : 'bg-white/20']" class="flex items-center backdrop-blur-md max-h-full h-20 rounded-b-xl font-bold p-2 text-white">
                    <h4 v-if="informacion.name">{{ informacion.name }}</h4>
                    <h4 v-else>{{ informacion.title }}</h4>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "CardCast",
    props: ["informacion"],
    computed:{
        estado() {
      return this.$store.state.darkMode.darkModeState;
    },
    }
};
</script>

<style>

</style>
