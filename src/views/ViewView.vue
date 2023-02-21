<template>
  <picture-view-composition :picture="now_data" />
</template>
<script>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
import { get_one } from "@/functions/index";
import PictureViewComposition from "../composition/PictureViewComposition.vue";
const now_data = ref({});
export default {
  name: "ViewView",
  components: {
    PictureViewComposition,
  },
  data() {
    return {
      now_data,
    };
  },
  setup() {
    const route = useRoute();
    get_one(route.query.id).then((k) => {
      now_data.value = k;
    });
    watch(
      () => route.query.id,
      async (newId) => {
        get_one(Number(newId)).then((k) => {
          now_data.value = k;
        });
      }
    );
  },
};
</script>
