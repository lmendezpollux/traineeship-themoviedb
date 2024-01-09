import { db } from "@/firebase";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import user from "./user";

const favorites = {
  state: {
    favorites: [],
    docsID: [],
  },
  mutations: {
    setAddDocsId(state, data) {
      state.docsID.push(data);
    },
    setVaciarId(state){
      state.docsID = []
    },
    setAddFavorites(state, data) {
      state.favorites.push(data);
    },
    setDeleteFavorites(state, index) {
      state.favorites.splice(index, 1);
    },
    setDeleteId(state, index) {
      state.docsID.splice(index, 1);
    },
    setVaciarFavoritos(state) {
      state.favorites = [];
    },
  },
  actions: {
   async addFavorites(context, favorite, identificador) {
      const estado = context.state.favorites.find(
        (fav) => fav.id === favorite.id
      );

      if (estado) {
        return;
      } else {
        try {
          const uid = user.state.usuario.uid;
          const idInfo = favorite.id;
          favorite.uid = uid;
          const dbRef = collection(db, "favoritos");

          addDoc(dbRef, favorite).then((idRef) => {
            let idDoc = idRef.id;
            let objId = {
              idDoc,
              idInfo,
              uid
            }
            context.commit("setAddFavorites", favorite);
            const referencia = doc(collection(db, "docsID"))
            objId.idDocId = referencia.id
            setDoc(referencia, objId)
            context.commit("setAddDocsId", objId);
          });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async deleteFavorites(context, documentID) {
       const index = context.state.favorites.findIndex(
        (fav) => fav.id === documentID
      );
      const newIndex = context.state.docsID.findIndex(
        (fav) => fav.idInfo === documentID
      ); 
      await deleteDoc(doc(db, "favoritos", context.state.docsID[newIndex].idDoc));
      await deleteDoc(doc(db, "docsID", context.state.docsID[newIndex].idDocId));
      context.commit("setDeleteFavorites", index);
      context.commit("setDeleteId", newIndex); 
    },
  },
  getters: {
    showFavorites(state, getters, rootState) {
      return rootState.favorites.favorites;
    },
  },
};

export default favorites;
