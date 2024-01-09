import { provider } from "@/firebase";
import { getAuth, signOut } from "@/firebase";
import { signInWithRedirect } from "firebase/auth";

export const namespaced = true;

const state = {
  usuario: null,
  usuarioData: {
    fav: [""],
    pais: "Argentina",
    descripcion: "",
    id: 28
  },
};

const mutations = {
  setLogIn(state, usuario) {
    state.usuario = usuario;
  
  },
  setLogOut(state) {
    state.usuario = null;
  },
  setUsuarioData(state, data){
    state.usuarioData = data    
  },
  setVaciarUserData(state){
    state.usuarioData = {}
  },
};

const actions = {
  logIn({ commit }) {
    try {
      const auth = getAuth();
      signInWithRedirect(auth, provider).then((result) => {
        const login = result.user;
        commit("setLogIn", login);
      })
    } catch (error) {
      console.log(error.message);
    }
  },
  logOut({ commit }) {
    try {
      const auth = getAuth();
      signOut(auth).then(() => {
        commit("setLogOut");
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  usuarioData({commit}, data){
    commit("setUsuarioData", data)
  }
};
const getters = {
  showUsuario(state, getters, rootState) {
    return rootState.user.usuario;
  },
  showUsuarioData(state, getters, rootState) {
    return rootState.user.usuarioData;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
