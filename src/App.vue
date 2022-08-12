<template>
  <nav class="navbar navbar-light bg-light">
    <p class="navbar-brand">
      <button
        type="button"
        class="btn btn-outline-primary"
        v-if="$route.path != '/'"
        @click="$router.push('/')"
      >
        <i class="bi bi-chevron-left"></i>返回</button
      >Bing每日一图
    </p>
  </nav>
  <div id="liveAlertPlaceholder"></div>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <div>
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>
<script>
import { data, base } from "./store/index";
export default {
  setup() {
    require("axios")
      .default.get(base + "data.json")
      .then(function (response) {
        data.value = response.data;
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
