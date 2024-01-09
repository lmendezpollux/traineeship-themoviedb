import { debounce } from "debounce";
import genres from "@/assets/generos.js";
import { services } from "@/services/api";

const tasteRequest = {
    state:{
        tasteNameArray: [],
        tasteInfoArray: []
    },
    mutations:{
        setTasteNameArray(state, data){
            state.tasteNameArray.push(data)
        },
        setDeleteArray(state){
            state.tasteNameArray = []
        },
        setDeleteInfoArray(state){
            state.tasteInfoArray = []
        },
        setTasteInfoArray(state, data){
            state.tasteInfoArray.push(data)
        }
    },
    actions:{
        getNombreGustos: debounce(function ({commit}) {
                commit('setDeleteArray')
           const gustosID = this.state.user.usuarioData.fav
           const generos = genres
            for (let index = 0; index < gustosID.length; index++) {
             const i = generos.findIndex((gender) => gender.id === gustosID[index]);
                commit('setTasteNameArray', generos[i].name)
            }
          }, 3000),
          getInformacionGustos: debounce(async function ({commit}) {
            commit("setDeleteInfoArray")
            const gustosID = this.state.user.usuarioData.fav
            /* const responses = gustosID.map(gustoId => services.seriesPorGustos(gustoId).then(response => commit('setTasteInfoArray', response))) */
            for (let index = 0; index < gustosID.length; index++) {
              commit('setTasteInfoArray', await services.seriesPorGustos(gustosID[index]))
            }
          }, 3500), 
          deleteInfoArray({commit}){
            commit("setDeleteInfoArray")
            commit("setDeleteArray")
          }
    },
    getters:{
        showTasteNames(state, getters, rootState){
            return rootState.tasteRequest.tasteNameArray
        },
        showTasteInfo(state, getters, rootState){
            return rootState.tasteRequest.tasteInfoArray
        }
    }
}

export default tasteRequest