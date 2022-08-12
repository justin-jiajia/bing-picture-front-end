<template>
  <div class="row row-cols-1 row-cols-md-4 g-3">
    <div class="col" v-for="picture in data" :key="picture">
      <picture-composition :picture="picture" :index="data.indexOf(picture)" />
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { data } from "../store/index";
import PictureComposition from "../composition/PictureComposition.vue";
const page = ref();
export default {
  name: "HomeView",
  data() {
    return {
      data,
    };
  },
  components: {
    PictureComposition,
  },
  setup() {
    const route = useRoute();
    page.value = route.query.page || 1;
    watch(
      () => route.query.page,
      async (newPage) => {
        page.value = newPage;
      }
    );
  },
};
</script>
