import axios from "axios";
import { selector } from "recoil";

const currentDate = new Date();
const oneMonthAgo = new Date();
oneMonthAgo.setMonth(currentDate.getMonth() - 1);

const NEWS_URL = `https://newsapi.org/v2/everything?q="실종"&from=${
  oneMonthAgo.toISOString().split("T")[0]
}&to=${currentDate.toISOString().split("T")[0]}&sortBy=popularity&apiKey=${
  import.meta.env.VITE_NEWS_API_KEY
}`;

export const NewsDataSelector = selector({
  key: "newsDataSelector",
  get: async () => {
    const newsData = await axios.get(NEWS_URL);
    return newsData.data.articles;
  },
});
