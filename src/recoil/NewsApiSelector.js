import axios from "axios";
import { selector } from "recoil";

const WORKER_URL = "https://news-add-cors-to-requests.bananaqick.workers.dev";

export const NewsDataSelector = selector({
  key: "newsDataSelector",
  get: async () => {
    const newsData = await axios.get(WORKER_URL);
    const cleanData = newsData.data.items.map((item) => {
      const div = document.createElement("div");
      div.innerHTML = item.title;
      const cleanTitle = div.textContent || div.innerText || "";
      return {
        ...item,
        title: cleanTitle,
      };
    });
    return cleanData;
  },
});
