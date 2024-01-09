const key = "cec2edf2dd3085071dccd295098f79dd",
      url = "https://api.themoviedb.org/3/" 

export const services = {
    search: (query, page = 1) => {
        return fetch(`${url}search/multi?api_key=${key}&language=es-ES&query=${query}&page=${page}&include_adult=false`)
        .then((res) => res.json())
        // .then((res) => res.results)
    },
    detailViewFilms: (id) => {
       return fetch(
            `${url}tv/${id}?api_key=${key}&language=es-ES`
          )
            .then((res) => res.json())
    },
    detailViewCast: (id) => {
       return fetch(
            `${url}tv/${id}/credits?api_key=${key}`
          )
            .then((res) => res.json())
    },
    detailViewRelacionadasFilms: (type, id) => {
       return fetch(`${url}${type}/${id}?api_key=${key}&language=es-ES`)
            .then((res) => res.json())
    },
    detailViewRelacionadasCast: (type, id) => {
       return fetch(`${url}${type}/${id}/credits?api_key=${key}`)
            .then((res) => res.json())
            .then((res) => res.cast);
    },
    actorViewDetail: (id) => {
       return fetch(
            `${url}person/${id}?api_key=${key}&language=es-ES`
        )
            .then((res) => res.json())
    },
    actorViewFilms: (id) => {
       return fetch(
            `${url}person/${id}/combined_credits?api_key=${key}&language=es-ES`
        )
            .then((res) => res.json())
            .then((res) => res.cast);
    },
    seriesPopulares: () => {
     return fetch(`${url}tv/popular?api_key=${key}&language=es-ES&page=1`)
          .then((data) => data.json())
          .then((data) => data.results)
    },
    seriesMejorPuntuadas: () => {
     return fetch(`${url}tv/top_rated?api_key=${key}&language=es-ES&page=1`)
          .then((data) => data.json())
          .then((data) => data.results)
    },
    seriesPorGustos: (genero) => {
      return fetch(`${url}discover/movie?api_key=${key}&with_genres=${genero}`)
            .then((data) => data.json())
            .then((data) => data.results)
    }
}

