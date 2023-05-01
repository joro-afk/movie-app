import { defineStore } from "pinia";
import { apiKey } from "../enviroment/apiKey";
export const useFilmsStore = defineStore({
  id: "filmsStore",
  state() {
    return {
      films: [],
      tvshows: [],
    };
  },

  actions: {
    async setFilms() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc
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

    async setTvShows() {
      await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc
        `
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.tvshows = data.results;
          console.log(data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
