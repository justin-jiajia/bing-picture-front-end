<template>
  <div class="f">
    <br />
    <h2>Bing每日一图</h2>
  </div>
  <hr />
  <div id="liveAlertPlaceholder"></div>
  <router-view />
  <div class="d">所有图片版权均归Bing所有，本站仅存储！</div>
</template>
<script>
import { data, base } from "./store/index";
import { ref } from "vue";
const ws = ref(true);
export default {
  setup() {
    require("axios")
      .default.get(base + "data.json")
      .then(function (response) {
        data.value = response.data.reverse();
        ws.value = false;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      data,
      sw,
    };
  },
};
</script>
<style>
.f {
  text-align: center;
}
.d {
  position: fixed;
  bottom: 0;
  background: white;
}
</style>
