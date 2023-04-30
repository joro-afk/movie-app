import { defineStore } from "pinia";
import { apiKey } from "../enviroment/apiKey";
export const useFilmsStore = defineStore({
  id: "filmsStore",
  state() {
    return {
      films: [],
      page: 1,
    };
  },

  actions: {
    async setFilms() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${this.page}
        `
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.films = data.results;
          console.log(data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
