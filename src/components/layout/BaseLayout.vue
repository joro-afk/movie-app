<template>
  <div class="main-wrapper">
    <BaseMain />
    <BaseFooter />
  </div>
</template>
<script>
import BaseMain from "@/components/layout/BaseMain";
import BaseFooter from "@/components/layout/BaseFooter";
export default {
  name: "BaseLayout",
  setup() {},
  components: {
    BaseMain,
    BaseFooter,
  },
};
</script>
