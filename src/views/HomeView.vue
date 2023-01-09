<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4" v-for="picture in data" :key="picture">
        <picture-composition
          :picture="picture"
          :index="data.indexOf(picture)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { data } from "../store/index";
import PictureComposition from "../composition/PictureComposition.vue";
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
};
</script>
