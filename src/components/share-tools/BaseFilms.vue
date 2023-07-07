<template>
  <div class="principal" lang="en">
    <nav>
      <ul class="menu-container">
        <router-link to="/">
          <li class="menu home">
            <img src="@/assets/images/home.png" class="home-img" alt="" />
          </li>
        </router-link>
        <li class="menu" @click="films.setFilms()">Now Playing Movies</li>
        <li class="menu" @click="films.setFilmsRated()">Top Rated Movies</li>
        <router-link to="/cart">
          <li class="menu cart">
            <img src="@/assets/images/cart.png" class="home-img" alt="" />
            <p class="cart-amount">{{ films.items.length }}</p>
          </li>
        </router-link>
      </ul>
    </nav>

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
      <swiper-slide v-for="swiper in films.films" :key="swiper">
        <div class="img-container">
          <img
            class="homeimage"
            :src="`http://image.tmdb.org/t/p/w500/${swiper.poster_path}`"
          />
        </div>
        <div class="side">
          <div class="description-container">
            <div class="title">{{ swiper.title }}</div>
            <div class="subtitle">
              Original title: {{ swiper.original_title }}
            </div>
           
            <div class="overview">{{ swiper.overview }}</div>
          </div>

          <div class="side-down">
            <h1 class="side-down-title">Watch Now</h1>
            <div class="subtitle-container">
              <h1 class="side-down-subtitle">Quality options</h1>
              <div class="purchate">
                <ul class="purchate-ul">
                  <li class="purchate-li">
                    <input
                      type="radio"
                      name="q-options"
                      value="4"
                      v-model="picked"
                      id="cb1"
                    />
                    <label for="cb1"
                      ><img
                        src="@/assets/images/480-pixels.png"
                        class="quality"
                        alt=""
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input
                      type="radio"
                      name="q-options"
                      value="7"
                      v-model="picked"
                      id="cb2"
                    />
                    <label for="cb2">
                      <img
                        src="@/assets/images/high-quality.png"
                        class="quality"
                        alt=""
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input
                      type="radio"
                      name="q-options"
                      value="10"
                      v-model="picked"
                      id="cb3"
                    />
                    <label for="cb3">
                      <img
                        src="@/assets/images/1080.png"
                        class="quality"
                        alt=""
                    /></label>
                  </li>
                  <li class="purchate-li">
                    <input
                      type="radio"
                      name="q-options"
                      value="15"
                      v-model="picked"
                      id="cb4"
                    />
                    <label for="cb4">
                      <img src="@/assets/images/4k.png" class="quality" alt=""
                    /></label>
                  </li>
                </ul>

                <div class="to-cart">
                  <h3>us$ {{ picked }}</h3>

                  <button
                    class="purchate-button"
                    @click="films.addToCart(swiper, picked)"
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
        <button class="alert-button" @click="films.closeButton()">X</button>
        <h1 class="message">
          Upps! It seems like you already have this in your cart
        </h1>
      </div>
    </div>
    <div class="alert-container-2">
      <div class="alert-back"></div>
      <div class="alert-message-2">
        <button class="alert-button-2" @click="films.closeButton2()">X</button>
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
import { Virtual, Navigation, Pagination } from "swiper";
import { useFilmsStore } from "../stores/filmsStore";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";

export default {
  name: "BaseFilms",
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const films = useFilmsStore();
    const onSwiper = (swiper) => {
      console.log(swiper);
    };
    const onSlideChange = () => {
      console.log("slide change");
    };
    return {
      onSwiper,
      onSlideChange,
      films,
      Virtual,
      modules: [Navigation, Pagination],
      picked:0,
    };
  },
};
</script>
