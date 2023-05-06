<template>
  <div class="presentation">
    <div class="presentation-container">
      <router-link to="/films">
        <div class="presentation-container-2">
          <h1 class="presentation-title">Films</h1>
          <img src="@/assets/movies.jpg" alt="" class="presentation-img" />
        </div>
      </router-link>
      <router-link to="/tvshows">
      <div class="presentation-container-2">
          <h1 class="presentation-title">TV Shows</h1>
          <img src="@/assets/tv-show.jpg" alt="" class="presentation-img" />
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "BaseHome",
  setup() {},
};
</script>
