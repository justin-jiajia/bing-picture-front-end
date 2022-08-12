<template>
  <picture-view-composition :picture="data[id]" />
</template>
<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { data } from "../store/index";
import PictureViewComposition from "../composition/PictureViewComposition.vue";
const id = ref(0);
export default {
  name: "ViewView",
  components: {
    PictureViewComposition,
  },
  data() {
    return {
      id,
      data,
    };
  },
  setup() {
    const route = useRoute();
    id.value = Number(route.query.id);
    watch(
      () => route.query.id,
      async (newId) => {
        id.value = Number(newId);
      }
    );
  },
};
</script>
