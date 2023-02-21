<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4" v-for="picture in data_a" :key="picture.id">
        <picture-composition :picture="picture" />
      </div>
    </div>
    <div class="d-flex justify-content-center" v-if="rws">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">正在加载</span>
      </div>
    </div>
  </div>
</template>

<script>
import { get_page } from "@/functions/index";
import PictureComposition from "../composition/PictureComposition.vue";
export default {
  name: "HomeView",
  data() {
    return {
      data_a: [],
      page: 1,
      rws: false,
      wait_n: false,
    };
  },
  components: {
    PictureComposition,
  },
  mounted() {
    window.addEventListener("scroll", this.load_next, true);
    this.load_next();
  },
  unmounted() {
    window.removeEventListener("scroll", this.load_next);
  },
  methods: {
    load_next() {
      if (this.rws) return;
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      var scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      console.log(scrollTop + windowHeight, scrollHeight);
      if (scrollTop + windowHeight < scrollHeight - 10) return;
      this.rws = true;
      get_page(this.page).then((t) => {
        if (t) this.data_a = [...this.data_a, ...t];
        this.rws = false;
      });
      ++this.page;
    },
  },
};
</script>
