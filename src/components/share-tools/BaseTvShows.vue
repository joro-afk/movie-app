<template>
  <div class="principal">
   
      <ul class="menu-container">
        <router-link to="/">
          <li class="menu home">
            <img src="@/assets/images/home.png" class="home-img" alt="" />
          </li>
        </router-link>
        <li class="menu" @click="tvshows.setTvShows()">On the air Tv shows</li>
        <li class="menu" @click="tvshows.setTvShowsRated()">
          Top rated Tv shows
        </li>
        <router-link to="/cart">
          <li class="menu cart">
            <img src="@/assets/images/cart.png" class="home-img" alt="" />
          </li>
          <li class="menu">
            <p class="cart-amount">{{ tvshows.items.length }}</p>
          </li>
        </router-link>
      </ul>

    <swiper
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="swiper in tvshows.tvshows" :key="swiper">
        <div class="img-container">
          <img
            class="homeimage"
            :src="`http://image.tmdb.org/t/p/w500/${swiper.poster_path}`"
          />
        </div>
        <div class="side">
          <div class="description-container">
            <div class="title">{{ swiper.name }}</div>
            <div class="subtitle">
              Original title: {{ swiper.original_name }}
            </div>
            <div class="score-subtitle">
              <div class="score">{{ swiper.vote_average }}</div>
              <div class="air">On Air since {{ swiper.first_air_date }}</div>
            </div>
            <div class="overview">
              {{ swiper.overview }}
            </div>
          </div>
          <div class="side-down">
            <h1 class="side-down-title">Watch Now</h1>
            <div>
              <h1 class="side-down-subtitle">Quality options</h1>
              <div class="purchate">
                <ul class="purchate-ul">
                  <li class="purchate-li">
                    <input type="radio" id="cb1" value="4" v-model="picked" />
                    <label for="cb1"
                      ><img
                        src="@/assets/images/480-pixels.png"
                        class="quality"
                        alt=""
                        v-on:click="chosenQty"
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input type="radio" id="cb2" value="7" v-model="picked" />
                    <label for="cb2"
                      ><img
                        src="@/assets/images/high-quality.png"
                        class="quality"
                        alt=""
                        v-on:click="chosenQty"
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input type="radio" id="cb3" value="10" v-model="picked" />
                    <label for="cb3"
                      ><img
                        src="@/assets/images/1080.png"
                        class="quality"
                        alt=""
                        v-on:click="chosenQty"
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input type="radio" id="cb4" value="15" v-model="picked" />
                    <label for="cb4"
                      ><img
                        src="@/assets/images/4k.png"
                        class="quality"
                        alt=""
                        v-on:click="chosenQty"
                    /></label>
                  </li>
                </ul>
                <div class="to-cart">
                  <h3>Quality {{ qtyChosen }} us${{ picked }}</h3>
                  <button
                    class="purchate-button"
                    @click="tvshows.addToCart(swiper, picked)"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="alert-container">
      <div class="alert-back"></div>
      <div class="alert-message">
        <button class="alert-button" @click="tvshows.closeButton()">X</button>
        <h1 class="message">
          Upps! It seems like you already have this in your cart
        </h1>
      </div>
    </div>
    <div class="alert-container-2">
      <div class="alert-back"></div>
      <div class="alert-message-2">
        <button class="alert-button-2" @click="tvshows.closeButton2()">
          X
        </button>
        <h1 class="message-2">You must choose quality first...</h1>
      </div>
    </div>
    <div class="alert-container-3">
      <div class="alert-message-3">
        <h2 class="message-3">Added to your cart</h2>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Virtual, Navigation, Pagination } from "swiper";
import { useFilmsStore } from "../stores/filmsStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  name: "BaseTvShows",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const picked = ref("0");
    const qtyChosen = ref("No defined");
    const tvshows = useFilmsStore();
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      tvshows,
      Virtual,
      modules: [Navigation, Pagination],
      picked,
      qtyChosen,
    };
  },
  watch: {
    picked(newValue, oldValue) {
      newValue != oldValue && this.picked == 15
        ? (this.qtyChosen = " 4K")
        : this.picked == 10
        ? (this.qtyChosen = " 1080Q")
        : this.picked == 7
        ? (this.qtyChosen = " HQ")
        : (this.qtyChosen = " 480P");
    },
  },
};
</script>
