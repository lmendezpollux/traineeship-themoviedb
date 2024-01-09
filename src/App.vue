<template>
  <div id="app" :class="[estado ? 'bg-darkMode' : 'bg-sky-50']">
    <nav v-if="showUsuario" class="flex justify-center shadow-lg w-screen fixed z-50 mb-32 backdrop-blur-sm">
      <router-link class="ml-auto mr-3" to="/">Home</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
      <router-link class="ml-3" to="/perfil">Perfil</router-link>
      <dark-mode />
    </nav>
    <transition name="fade">
      <router-view v-if="showUsuario" class="pt-28"/>
      <router-view v-else/>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DarkMode from "./components/DarkMode.vue";

export default {
  computed: {
    ...mapGetters(["showUsuario"]),
    estado() {
      return this.$store.state.darkMode.darkModeState;
    },
  },
  components: {
    DarkMode,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  color: white;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  background: rgba(34, 34, 34, 0);
  height: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(153, 153, 153, 0.81);
  border-radius: 16px;
}

.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave {
  opacity: 0;
}

nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #393939;
  text-align: center;
  z-index: 1000;
}

nav a.router-link-exact-active {
  color: #42b983;
  text-align: center;
}
</style>
