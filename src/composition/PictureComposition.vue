<template>
  <div class="card">
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
      <div class="btn-group" role="group">
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
        <a class="btn btn-outline-primary"
          ><i class="bi bi-box-arrow-up"></i>分享</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { base } from "../store/index";
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
export default {
  props: ["picture", "index"],
  methods: {
    downLoadImg(imgsrc, name) {
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
      var wrapper = document.createElement("div");
      wrapper.innerHTML =
        '<div class="alert alert-success alert-dismissible" role="alert">已经开始下载<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

      alertPlaceholder.append(wrapper);
    },
  },
  data() {
    return {
      base,
    };
  },
};
</script>
