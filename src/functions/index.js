import { base, data_im } from "@/store";
const axios = require("axios").default;
async function get_im() {
  if (data_im.value) return data_im.value;
  const k = await axios.get(base + "data0.json");
  data_im.value = k.data;
  data_im.value.page =
    data_im.value.many % 10
      ? ~~(data_im.value.many / 10) + 1
      : data_im.value.many / 10;
  return k.data;
}
async function get_page(page) {
  await get_im();
  if (page > data_im.value.page) return;
  const k = await axios.get(base + "data" + String(page) + ".json");
  return k.data;
}
async function get_one(id) {
  await get_im();
  const p = data_im.value.many - id;
  const page = p % 10 ? ~~(p / 10) + 1 : p / 10;
  const k = await get_page(page);
  for (var i = 0; i < k.length; ++i) {
    if (k[i].id == id) return k[i];
  }
}
export { get_page, get_one };
