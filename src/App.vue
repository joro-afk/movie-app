<template>
  <div>
    
    <BaseLayout />
  </div>
</template>

<script>
import BaseLayout from "../src/components/layout/BaseLayout.vue";
import { useFilmsStore } from "../src/components/stores/filmsStore";
export default {
  setup() {
    const films = useFilmsStore();
    films.setFilms();
    films.setTvShows();
    return {
      films,
    };
  },

  components: {
    BaseLayout,
  },
};
</script>
<style>
@import "@/assets/style.css";
</style>
