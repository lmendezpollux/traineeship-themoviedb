import { services } from "@/services/api";

export const namespaced = true;

const mainRequest = {
  state: {
    pelisPopulares: [],
    pelisMejorPuntuadas: [],
  },
  mutations: {
    setPelisPopulares(state, pelisPopulares) {
      state.pelisPopulares = pelisPopulares;
    },
    setPelisMejorPuntuadas(state, pelisMejorPuntuadas) {
      state.pelisMejorPuntuadas = pelisMejorPuntuadas;
    },
  },
  actions: {
    async setPelisPopulares({ commit }) {
      try {
        commit("setPelisPopulares", await services.seriesPopulares());
      } catch (error) {
        console.log(error);
      }
    },
    async setPelisMejorPuntuadas({ commit }) {
      try {
        commit("setPelisMejorPuntuadas", await services.seriesMejorPuntuadas());
      } catch (error) {
        console.log(error);
      }
    },
  },
  getters: {
    showPelisPopulares(state, getters, rootState) {
      return rootState.mainRequest.pelisPopulares;
    },
    showPelisMejorPuntuadas(state, getters, rootState) {
      return rootState.mainRequest.pelisMejorPuntuadas;
    },
  },
};

export default mainRequest;
