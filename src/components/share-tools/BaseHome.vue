<template>
  <div class="presentation" lang="en">
    <div class="presentation-container">
      <router-link to="/films">
        <div class="presentation-container-2">
          <h1 class="presentation-title">Films</h1>
          <img src="@/assets/images/cinema.png" alt="" class="presentation-img" />
        </div>
      </router-link>
      <div class="middle-container"></div>
      <router-link to="/tvshows">
        <div class="presentation-container-2">
          <h1 class="presentation-title">TV Shows</h1>
          <img src="@/assets/images/tv.png" alt="" class="presentation-img" />
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
