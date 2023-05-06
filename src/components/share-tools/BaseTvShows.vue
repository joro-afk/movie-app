<template>
  <div>
    <nav>
      <ul class="menu-container">
        <router-link to="/">
          <li class="menu home">Home</li>
        </router-link>
        <li class="menu" @click="tvshows.setTvShows()">On the air Tv shows</li>
        <li class="menu" @click="tvshows.setTvShowsRated()">
          Top rated Tv shows
        </li>
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
      <swiper-slide v-for="swiper in tvshows.tvshows" :key="swiper">
        <img
          class="homeimage"
          :src="`http://image.tmdb.org/t/p/w500/${swiper.poster_path}`"
        />
        <div class="side">
          <div class="description-container">
            <div class="title">{{ swiper.name }}</div>
            <div class="subtitle">Original title: {{ swiper.original_name }}</div>
           <div class="score-subtitle">
            <div class="score">{{ swiper.vote_average }}</div>
            <div class="air">On Air since {{ swiper.first_air_date}}</div>
          </div>
            <div class="overview">
              {{ swiper.overview }}
            </div>
          </div>
          <div class="side-down">
            <h1 class="side-down-title">Watch Now</h1>
            <div>
              <h1 class="side-down-title">Quality options</h1>
              <div class="purchate">
                <ul class="purchate-ul">
                  <li class="purchate-li">
                    <img src="@/assets/480-pixels.png" class="quality" alt="" />
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
                    @click="tvshows.addToCart(swiper)"
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
    };
  },
};
</script>
