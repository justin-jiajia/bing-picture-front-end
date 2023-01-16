<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="base + picture.file_name"
          class="img-fluid rounded-start"
          :alt="picture.tittle"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ picture.tittle }}<br />——{{ picture.location }}
          </h5>
          <p class="card-text">{{ picture.long_description }}</p>
          <p class="card-text">
            <small class="text-muted">{{
              picture.file_name.slice(0, -4)
            }}</small>
          </p>
          <div class="btn-group" role="group">
            <a
              class="btn btn-outline-primary"
              @click="downLoadImg(base + picture.file_name, picture.tittle)"
              ><i class="bi bi-download"></i>下载</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { base } from "../store/index";
import Swal from "sweetalert2";
export default {
  props: ["picture"],
  methods: {
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
      // 解决跨域 Canvas 污染问题
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
    };
  },
};
</script>
