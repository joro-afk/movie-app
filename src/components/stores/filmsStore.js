import { defineStore } from "pinia";
import { apiKey } from "../enviroment/apiKey";
export const useFilmsStore = defineStore({
  id: "filmsStore",
  state() {
    return {
      films: [],
      tvshows: [],
      items: [],
      total: [],
      sum: null,
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async setFilmsRated() {
      await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&include_adult=false&page=1&year=2023
        `
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.films = data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async setTvShows() {
      await fetch(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1
        `
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.tvshows = data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async setTvShowsRated() {
      await fetch(
        `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&include_adult=false&page=1&year=2023
        `
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.tvshows = data.results;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addToCart(swiper, picked) {
      if (this.items.includes(swiper)) {
        const element = document.querySelector(".alert-container");
        element.style.display = "block";
        return;
      } else {
        if (picked === null) {
          const element = document.querySelector(".alert-container-2");
          element.style.display = "block";
        } else {
          let qty = "";
          picked == 15
            ? (qty = " 4K")
            : picked == 10
            ? (qty = " 1080Q")
            : picked == 7
            ? (qty = " HQ")
            : (qty = " 480P");
          const element = document.querySelector(".alert-container-3");
          element.style.display = "block";
          this.timeout();
          swiper.quality = qty;
          swiper.price = picked;
          this.total.push(parseFloat(picked));
          this.items.push(swiper);
          this.totalsum();
        }
      }
    },

    timeout() {
      setTimeout(timeout, 2000);
      function timeout() {
        const element = document.querySelector(".alert-container-3");
        element.style.display = "none";
       
      }
    },

    deleteMovie(index) {
      let i;
      for (i = 0; i < this.items.length; i++) {
        if (this.items[i] === index) {
          let resta = index.price * -1;
          this.total.push(resta);
          this.totalsum();
          let place = this.items.indexOf(index);
          this.items.splice(place, 1);
          return;
        }
      }
      console.log("No se encontro");
      return;
    },

    totalsum() {
      this.sum = this.total.reduce((x, y) => {
        return x + y;
      });
    },

    onChange(event, index) {
      let changed = index.price * -1;
      this.total.push(parseFloat(changed));
      this.totalsum();
      index.price = event.target.value.price;
      console.log(index.price);
      index.quality = event.target.value.qty;
      console.log(index.quality);
      this.total.push(parseFloat(index.price));
      this.totalsum();
    },

    closeButton() {
      const element = document.querySelector(".alert-container");
      element.style.display = "none";
    },

    closeButton2() {
      const element = document.querySelector(".alert-container-2");
      element.style.display = "none";
    },
  },
});
