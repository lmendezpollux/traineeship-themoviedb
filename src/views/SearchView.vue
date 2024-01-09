<template>
  <div class="px-52 max-[500px]:px-0">
    <h1 class="ml-20 mt-20 text-greyMain font-bold text-xl max-[1000px]:mt-2 max-[1000px]:ml-0 max-[1000px]:text-center">Resultados sobre: {{ this.busqueda }}</h1>
    <card-search
      v-for="(search, i) in busquedas"
      :key="i"
      :informacion="search"
    />
    <footer class="grid justify-center aling-center m-7">
      <button class="border rounded-2xl p-2 w-32 bg-greenVue/100 hover:bg-greenVue/50 transition-colors transition-all cursor-pointer" v-if="actualPage < totalPages && !loading" v-on:click="sumarPagina">
        Ver mas
      </button>
      <loarder-circle :loading="loading"/>
    </footer>
  </div>
</template>

<script>
import CardSearch from "@/components/CardSearch.vue";
import { services } from "@/services/api";
import LoarderCircle from '@/components/LoarderCircle.vue';

export default {
  name: "SearchView",
  async mounted() {
    const { page, results, total_pages } = await services.search(
      this.busqueda,
      this.actualPage
    );

    this.busquedas = results;
    this.totalPages = total_pages;
  },
  data() {
    return {
      busquedas: [],
      busqueda: this.$route.params.query,
      actualPage: 1,
      totalPages: 1,
      loading: false,
    };
  },
  methods: {
    async sumarPagina() {
      if (this.actualPage <= this.totalPages) {
        this.loading = true
        this.actualPage++;
        const { results } = await services.search(
          this.busqueda,
          this.actualPage
        );
        this.busquedas = [...this.busquedas, ...results];
        this.loading = false
      }
    },
  },
  components: {
    CardSearch,
    LoarderCircle
  },
};
</script>

