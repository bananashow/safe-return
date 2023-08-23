import axios from "axios";
import { selector } from "recoil";

const WORKER_URL = "https://news-add-cors-to-requests.bananaqick.workers.dev";

export const NewsDataSelector = selector({
  key: "newsDataSelector",
  get: async () => {
    const newsData = await axios.get(WORKER_URL);
    return newsData.data.articles;
  },
});
