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
    // Generic API Fetch function
    async fetchData(url, updateState) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this[updateState] = data.results;
      } catch (error) {
        console.error(error);
      }
    },

    // Fetch films
    async setFilms() {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc`;
      await this.fetchData(url, "films");
    },

    // Fetch top-rated films
    async setFilmsRated() {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&include_adult=false&page=1&year=2023`;
      await this.fetchData(url, "films");
    },

    // Fetch TV shows
    async setTvShows() {
      const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`;
      await this.fetchData(url, "tvshows");
    },

    // Fetch top-rated TV shows
    async setTvShowsRated() {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=vote_count.desc&include_adult=false&page=1&year=2023`;
      await this.fetchData(url, "tvshows");
    },

    // Add an item to the cart
    addToCart(swiper, picked) {
      if (this.items.includes(swiper)) {
        this.showAlert(".alert-container");
      } else if (picked === null || picked === "0") {
        this.showAlert(".alert-container-2");
      } else {
        let qty = this.getQuality(picked);
        swiper.quality = qty;
        swiper.price = picked;
        this.items.push(swiper);
        this.total.push(parseFloat(picked));
        this.updateSum();
        this.showAlert(".alert-container-3");
        setTimeout(() => this.hideAlert(".alert-container-3"), 500);
      }
    },

    // Show alert
    showAlert(alertClass) {
      const alert = document.querySelector(alertClass);
      const mainWrapper = document.querySelector(".main-wrapper");
      alert.style.display = "block";
      mainWrapper.classList.add("newHeight");
    },

    // Hide alert
    hideAlert(alertClass) {
      const alert = document.querySelector(alertClass);
      const mainWrapper = document.querySelector(".main-wrapper");
      mainWrapper.classList.remove("newHeight");
      alert.style.display = "none";
    },

    // Get the quality string based on price
    getQuality(picked) {
      switch (picked) {
        case "15":
          return "4K";
        case "10":
          return "1080Q";
        case "7":
          return "HQ";
        default:
          return "480P";
      }
    },

    // Delete movie from cart
    deleteMovie(index) {
      const itemIndex = this.items.indexOf(index);
      if (itemIndex !== -1) {
        let priceChange = index.price * -1;
        this.total.push(priceChange);
        this.updateSum();
        this.items.splice(itemIndex, 1);
      }
    },

    // Update total sum
    updateSum() {
      this.sum = this.total.reduce((acc, curr) => acc + curr, 0);
    },

    // Handle quality change
    onChange(index, event) {
      let oldPrice = index.price;
      let newPrice = parseFloat(event.target.value);
      
      // Update total with new value
      this.total.push(oldPrice * -1); // Remove old price
      this.total.push(newPrice); // Add new price

      this.updateSum();
      index.price = newPrice;
      index.quality = this.getQuality(newPrice);
    },

    // Close alert button
    closeButton() {
      this.hideAlert(".alert-container");
    },

    closeButton2() {
      this.hideAlert(".alert-container-2");
    },
  },
});
