<template>
  <div class="card f" :id="index">
    <canvas class="canvas" :id="'canvas' + index" v-if="!xs"></canvas>
    <img
      :src="base + picture.file_name"
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
        <a
          class="btn btn-outline-primary"
          @click="downLoadImg(base + picture.file_name, picture.tittle)"
          ><i class="bi bi-download"></i>下载</a
        >
        <router-link
          :to="{ path: '/view', query: { id: index } }"
          class="btn btn-outline-primary"
          ><i class="bi bi-eye-fill"></i>查看详情</router-link
        >
        <a class="btn btn-outline-primary" @click="share(index)"
          ><i class="bi bi-box-arrow-up"></i>分享</a
        >
      </div>
    </div>
  </div>
  <div id="xn" data-bs-toggle="modal" data-bs-target="#exampleModal" />
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">分享</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="关闭"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="im" class="img-fluid" />
        </div>
        <div class="modal-footer">
          <p>保存上面的图片以分享</p>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { base } from "../store/index";
import { ref } from "vue";
import html2canvas from "html2canvas";
const im = ref("");
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
          im.value = imgData;
          document.getElementById("xn").click();
        });
      }, 0);
    },
    downLoadImg(imgsrc, name) {
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
      var wrapper = document.createElement("div");
      wrapper.innerHTML =
        '<div class="alert alert-success alert-dismissible" role="alert">已经开始下载<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      document.getElementById("liveAlertPlaceholder").append(wrapper);
    },
  },
  data() {
    return {
      base,
      im,
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
