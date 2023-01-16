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
  <div class="d">
    所有图片版权均归Bing所有，本站仅存储！
    <span v-show="sho"> | <a href="#" @click="down()">下载客户端</a></span>
    <a :href="link" id="download-j-link" />
  </div>
</template>
<script>
import { data, base } from "./store/index";
import { ref } from "vue";
import Swal from "sweetalert2";
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
  methods: {
    do_d() {
      document.getElementById("download-j-link").click();
      Swal.fire({
        title: "已开始下载！",
        html: "如安装前提示如下，请按‘详细信息’、‘仍要运行’（这是电子签名产生的问题，请放心安装）<img class='swal2-image' src='/img/d.png' /><img class='swal2-image' src='/img/d2.png' />",
      });
    },
    do_p() {
      Swal.fire({
        showCancelButton: true,
        cancelButtonText: "下载手动安装版（暂不支持自动更新）",
        confirmButtonText: "快速安装（支持自动更新）",
        html: "您的浏览器支持快速安装",
      }).then((r) => {
        if (r.value) {
          Swal.fire({
            html: "请按下列指示操作：<br /><br />电脑：<img class='swal2-image' src='/img/desk.gif' /><br />IOS：<br /><img class='swal2-image' src='/img/ios.gif' />",
          });
        } else if (r.dismiss === Swal.DismissReason.cancel) {
          this.do_d();
        }
      });
    },
    down() {
      if (!("serviceWorker" in navigator)) {
        this.do_d();
      } else {
        this.do_p();
      }
    },
  },
  data() {
    return {
      data,
      ws,
      sho: !process.env.IS_ELECTRON,
      link:
        "http://update-jia.test.upcdn.net/bing-picture/bing-picture-front-end-setup-" +
        String(require("@/../package.json").version) +
        ".exe",
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
#download-j-link {
  display: none;
}
</style>
