import { selector } from "recoil";
import {
  SearchCategoryAtom,
  Find_SearchKeywordAtom,
  Location_SearchKeywordAtom,
} from "./Atoms";
import axios from "axios";

const WORKER_URL = "https://add-cors-to-requests.bananaqick.workers.dev";

// 전체 데이터 가져오기
export const MissingPersonAllDataSelector = selector({
  key: "missingPersonAllDataSelector",
  get: async () => {
    const allData = await axios.get(WORKER_URL);
    return allData.data;
  },
});

// 전체 데이터에서 검색어 or 주소로 검색
export const KeywordFilterSelector = selector({
  key: "keywordFilterSelector",
  get: ({ get }) => {
    const allData = get(MissingPersonAllDataSelector);
    const keyword = get(Find_SearchKeywordAtom);

    const fileredData = allData.filter((person) => {
      return person.nm.includes(keyword) || person.occrAdres.includes(keyword);
    });

    return fileredData;
  },
});

// 전체 데이터에서 주소로 검색
export const LocationFilterSelector = selector({
  key: "locationFilterSelector",
  get: ({ get }) => {
    const allData = get(MissingPersonAllDataSelector);
    const keyword = get(Location_SearchKeywordAtom);

    const fileredData = allData.filter((person) => {
      return person.occrAdres.includes(keyword);
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
