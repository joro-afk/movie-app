<template>
  <div>
    <nav>
      <ul class="menu-container">
        <li class="menu">Now Playing Movies</li>
        <li class="menu">Top Rated Movies</li>
        <li class="menu">On the air Tv shows</li>
        <li class="menu">Top rated Tv shows</li>
      </ul>
    </nav>

    <swiper
      :slidesPerView="'auto'"
      :centeredSlides="true"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :navigation ="true"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="swiper in films.films" :key="swiper">
        <img
          class="homeimage"
          :src="`http://image.tmdb.org/t/p/w500/${swiper.poster_path}`"
        />
        <div class="description-container">
          <div class="title">{{ swiper.original_title }}</div>
          <div class="score">{{ swiper.vote_average }}</div>
          <div class="overview">
            {{ swiper.overview }}
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
    };
  },
};
</script>
