<template>
  <div class="card f" :id="index">
    <canvas class="canvas" :id="'canvas' + index" v-if="!xs"></canvas>
    <img
      v-lazy="base + picture.file_name"
      class="card-img-top"
      :alt="picture.tittle"
    />
    <div class="card-body">
      <h5 class="card-title">
        {{ picture.tittle }}<br />——{{ picture.location }}
      </h5>
      <p class="card-text">{{ picture.description }}...</p>
      <p class="card-text">
        <small class="text-muted">{{ picture.file_name.slice(0, -4) }}</small>
      </p>
      <div class="btn-group" role="group" v-if="xs">
        <button
          class="btn btn-outline-primary"
          @click="downLoadImg(base + picture.file_name, picture.tittle)"
        >
          <i class="bi bi-download"></i>下载
        </button>
        <router-link
          :to="{ path: '/view', query: { id: index } }"
          class="btn btn-outline-primary"
          ><i class="bi bi-eye-fill"></i>查看详情</router-link
        >
        <button class="btn btn-outline-primary" @click="share(index)">
          <i class="bi bi-box-arrow-up"></i>分享
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { base } from "../store/index";
import { ref } from "vue";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
const xs = ref(true);
var inn = 0;
var QRCode = require("qrcode");
export default {
  props: ["picture", "index"],
  methods: {
    share(index) {
      this.xs = false;
      inn = index;
      setTimeout(function () {
        QRCode.toCanvas(
          document.getElementById("canvas" + inn),
          window.location.protocol +
            "//" +
            window.location.host +
            "/view?id=" +
            inn
        );
        html2canvas(document.getElementById(inn), {
          scale: window.devicePixelRatio < 3 ? window.devicePixelRatio : 2,
          useCORS: true,
        }).then((canvas) => {
          xs.value = true;
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          Swal.fire({
            title: "分享",
            html:
              "<img class='swal2-image' src='" +
              imgData +
              "' />保存上面的图片以分享",
          });
        });
      }, 0);
    },
    downLoadImg(imgsrc, name) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        Swal.fire({
          icon: "info",
          title: "请长按图片保存",
        });
        return;
      }
      var image = new Image();
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png", 1.0);
        var a = document.createElement("a");
        var event = new MouseEvent("click");
        a.download = name + ".png";
        a.href = url;
        a.dispatchEvent(event);
      };
      image.src = imgsrc;
      Swal.fire({
        icon: "success",
        title: "已开始下载",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  data() {
    return {
      base,
      xs,
    };
  },
};
</script>
<style>
.canvas {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
