const darkMode = {
    state:{
        darkModeState: false
    },
    mutations:{
        setDarkMode(state){
            state.darkModeState = !state.darkModeState
            localStorage.setItem('darkMode', JSON.stringify(state.darkModeState))
        },
        setVerificarLocalStorage(state, data){
            state.darkModeState = data
        }
    },
    actions:{
        clickOnDarkMode({commit}){
            commit("setDarkMode")
        },
        verificarLocalStorage({commit}){
            if(localStorage.getItem('darkMode')){
                commit("setVerificarLocalStorage", JSON.parse(localStorage.getItem('darkMode')))
            }
        }
    }
}

export default darkMode