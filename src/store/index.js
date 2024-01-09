import Vue from "vue";
import Vuex from "vuex";
import favorites from "@/store/modules/favorites.js";
import mainRequest from "@/store/modules/mainRequest.js";
import user from "@/store/modules/user.js";
import { getAuth } from "firebase/auth";
import { db } from "@/firebase";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import darkMode from "@/store/modules/darkMode.js";
import tasteRequest from "./modules/tasteRequest";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    favorites,
    mainRequest,
    user,
    darkMode,
    tasteRequest
  },
  actions: {
    checkAuth({ commit }) {
      const auth = getAuth();
      auth.onAuthStateChanged(function (user) {
        if (user) {
          commit("setLogIn", user);
          store.dispatch("checkFavoritos");
          store.dispatch("checkId");
          store.dispatch("checkUserData");
          localStorage.setItem('auth', JSON.stringify(true))
        } else {
          commit("setLogIn", null);
          commit("setVaciarId");
          commit("setVaciarFavoritos");
          commit("setVaciarUserData");
          store.dispatch("deleteInfoArray")
          localStorage.setItem('auth', JSON.stringify(false))
        }
      });
    },
    async checkFavoritos({ commit }) {
      const uid = user.state.usuario.uid
      const peticion = query(
        collection(db, "favoritos"),
        where("uid", "==", uid.toString())
      );
      const coleccionFavoritos = await getDocs(peticion);
      coleccionFavoritos.forEach((doc) =>
        commit("setAddFavorites", doc.data())
      );
    },
    async checkId({ commit }) {
      const uid = user.state.usuario.uid
      const peticion = query(
        collection(db, "docsID"),
        where("uid", "==", uid.toString())
      );
      const coleccionFavoritos = await getDocs(peticion);
      coleccionFavoritos.forEach((doc) => commit("setAddDocsId", doc.data()));
    },
    async checkUserData({ commit }) {
      const uid = user.state.usuario.uid
      const peticion = await doc(db, "usuarios", uid);
      const userData = await getDoc(peticion);
      if(userData.data() === undefined){
        return
      }else{
        commit("setUsuarioData", userData.data());
      }
    
    },
    async checkGustos({ commit }) {
      const uid = user.state.usuario.uid
      const docRef = await doc(db, "usuarios", uid);
      const docDatos = await getDoc(docRef);
      if (docDatos.data()) {
        commit("setUsuarioData", docDatos.data());
      }
    },
  },
});

export default store;

store.dispatch("setPelisPopulares");
store.dispatch("setPelisMejorPuntuadas");
store.dispatch("checkAuth");
store.dispatch('getNombreGustos')
store.dispatch('getInformacionGustos')
store.dispatch("verificarLocalStorage")
