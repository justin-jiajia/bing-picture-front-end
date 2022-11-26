<template>
  <div class="f">
    <br />
    <h2>Bing每日一图</h2>
  </div>
  <hr />
  <div id="liveAlertPlaceholder"></div>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <hr />
  <div class="f">
    <small>所有图片版权均归Bing所有，本站仅存储！</small>
  </div>
</template>
<script>
import { data, base } from "./store/index";
export default {
  setup() {
    require("axios")
      .default.get(base + "data.json")
      .then(function (response) {
        data.value = response.data.reverse();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  data() {
    return {
      data,
    };
  },
};
</script>
<style>
.f {
  text-align: center;
}
</style>
