<template>
  <div class="cart-main">
    <ul class="menu-container">
      <router-link to="/">
        <li class="menu home">
          <img src="@/assets/images/home.png" class="home-img" alt="" />
        </li>
      </router-link>
      <div class="views">
        <li>
          <router-link to="/films">
            <h1 class="menu">Films</h1>
          </router-link>
        </li>
        <li>
          <router-link to="/tvshows">
            <h1 class="menu">TV Shows</h1>
          </router-link>
        </li>
      </div>
    </ul>
    <div class="cart-list">
      <li class="li-cart" v-for="index in cart.items" :key="index">
        <div class="cart-divs" id="image-cart">
          <img
            class="cart-image"
            :src="`http://image.tmdb.org/t/p/w500/${index.poster_path}`"
          />
        </div>
        <div class="cart-divs" id="movie-title">
          <h2 class="cart-title">
            {{ index.original_title }} {{ index.name }}
          </h2>
        </div>
        <div class="cart-divs" id="quality">
          <h2 class="cart-quality">Quality choosen: {{ index.quality }}</h2>
          <select
            name="quality"
            id="qty"
            @change="cart.onChange(index, $event)"
          >
            <option value="4">480Q</option>
            <option value="7">HQ</option>
            <option value="10">1080</option>
            <option value="15">4K</option>
          </select>
        </div>

        <div class="cart-divs" id="price">
          <h2 class="cart-price">us$ {{ index.price }}</h2>
        </div>

        <div class="cart-divs" id="delete">
          <button @click="cart.deleteMovie(index)" class="cart-button">
            <h3>x</h3>
          </button>
        </div>
      </li>
    </div>
    <div class="total">
      <div class="total-containers"></div>
      <div class="total-containers"></div>
      <div class="total-containers">
        <h3>Total</h3>
      </div>
      <div class="total-containers">
        <h3>{{ cart.sum }}</h3>
      </div>

      <div class="total-containers"><button class="buy-button">Buy</button></div>
    </div>
  </div>
</template>
<script>
import { useFilmsStore } from "../stores/filmsStore";

export default {
  name: "BaseCart",
  components: {},
  setup() {
    const cart = useFilmsStore();

    return {
      cart,
    };
  },
};
</script>
