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
var wrapper;
export default {
  props: ["picture"],
  methods: {
    downLoadImg(imgsrc, name) {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
      ) {
        wrapper = document.createElement("div");
        wrapper.innerHTML =
          '<div class="alert alert-success alert-dismissible" role="alert">请长按图片保存<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

        document.getElementById("liveAlertPlaceholder").append(wrapper);
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
        var url = canvas.toDataURL("image/png", 0.7); //得到图片的base64编码数据
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name ? name + ".png" : "photo.png"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
      wrapper = document.createElement("div");
      wrapper.innerHTML =
        '<div class="alert alert-success alert-dismissible" role="alert">已经开始下载<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      document.getElementById("liveAlertPlaceholder").append(wrapper);
    },
  },
  data() {
    return {
      base,
    };
  },
};
</script>
