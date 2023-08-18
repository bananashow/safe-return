import axios from "axios";
import { selector } from "recoil";
import { SearchCategoryAtom, SearchKeywordAtom } from "./Atoms";

const WORKER_URL = "https://add-cors-to-requests.bananaqick.workers.dev";

// 전체 데이터 가져오기
export const MissingPersonAllDataSelector = selector({
  key: "missingPersonAllDataSelector",
  get: async () => {
    const allData = await axios.get(WORKER_URL);
    return allData.data;
  },
});

// 전체 데이터에서 검색어 필터링
export const KeywordFilterSelector = selector({
  key: "keywordFilterSelector",
  get: ({ get }) => {
    const allData = get(MissingPersonAllDataSelector);
    const keyword = get(SearchKeywordAtom);
    const fileredData = allData.filter((person) => {
      return person.nm.includes(keyword) || person.occrAdres.includes(keyword);
    });

    return fileredData;
  },
});

// 전체 데이터에서 카테고리 필터링
export const CategoryFilterSelector = selector({
  key: "categoryFilterSelector",
  get: ({ get }) => {
    const allData = get(MissingPersonAllDataSelector);
    const category = get(SearchCategoryAtom);

    if (category.target || category.gender || category.age) {
      const filterData = allData.filter((person) => {
        return (
          (category.target
            ? person.writngTrgetDscd === category.target
            : true) &&
          (category.gender ? person.sexdstnDscd === category.gender : true) &&
          (category.age ? person.age === parseInt(category.age) : true)
        );
      });
      return filterData;
    } else {
      return allData;
    }
  },
});
