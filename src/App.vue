<template>
  <div class="f">
    <br />
    <h2>Bing每日一图</h2>
    <hr />
  </div>
  <div class="f u">
    <br />
    <h2>Bing每日一图</h2>
    <hr />
  </div>
  <div class="d-flex justify-content-center" v-if="ws">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">正在加载</span>
    </div>
  </div>
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
      ws,
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
.u {
  position: fixed;
  top: 0;
  background: white;
  width: 100%;
  z-index: 999;
}
</style>
