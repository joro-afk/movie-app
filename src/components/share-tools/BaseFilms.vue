<template>
  <div>
    <nav>
      <ul class="menu-container">
        <router-link to="/">
          <li class="menu home">Home</li>
        </router-link>
        <li class="menu" @click="films.setFilms()">Now Playing Movies</li>

        <li class="menu" @click="films.setFilmsRated()">Top Rated Movies</li>
        <router-link to="/cart">
          <li class="menu cart">Cart</li>
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
        <img
          class="homeimage"
          :src="`http://image.tmdb.org/t/p/w500/${swiper.poster_path}`"
        />

        <div class="side">
          <div class="description-container">
            <div class="title">{{ swiper.title }}</div>
            <div class="subtitle">Original title: {{ swiper.original_title }}</div>
            <div class="score">{{ swiper.vote_average }}</div>
            <meter class="average-rating" min="0" max="10" ref="5"></meter>
            <div class="overview">{{ swiper.overview }}</div>
          </div>
          <div class="side-down">
            <h1 class="side-down-title">Watch Now</h1>
            <div>
              <h2 class="side-down-subtitle">Quality</h2>
              <div class="purchate">
                <ul class="purchate-ul">
                  <li class="purchate-li">
                    <button
                      class="li-button"
                      :class="{ active: isActive }"
                      @click="acTivation"
                    >
                      <img
                        src="@/assets/480-pixels.png"
                        class="quality"
                        alt=""
                        :class="{ active: isActive }"
                        @click="acTivation"
                      />
                    </button>
                  </li>
                  <li class="purchate-li">
                    <img
                      src="@/assets/high-quality.png"
                      class="quality"
                      alt=""
                    />
                  </li>
                  <li class="purchate-li">
                    <img src="@/assets/1080.png" class="quality" alt="" />
                  </li>
                  <li class="purchate-li">
                    <img src="@/assets/4k.png" class="quality" alt="" />
                  </li>
                </ul>
                <div class="to-cart">
                  <h3>Price</h3>
                  <button
                    class="purchate-button"
                    @click="films.addToCart(swiper)"
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
  </div>
</template>
<script>
import { ref } from "vue";
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
    let percentage = ref();
    return {
      onSwiper,
      onSlideChange,
      films,
      Virtual,
      modules: [Navigation, Pagination],
      percentage,
      isActive: false,
    };
  },

  methods: {
    acTivation: function () {
      this.isActive = !this.isActive;
    },
  },
};
</script>
