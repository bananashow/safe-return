import axios from "axios";
import { selector } from "recoil";
import { SearchCategoryAtom, SearchKeywordAtom } from "./Atoms";

const ID = import.meta.env.VITE_MISSING_PERSON_API_ID;
const KEY = import.meta.env.VITE_MISSING_PERSON_API_KEY;
const OPEN_PROXY = "https://cors-anywhere.herokuapp.com/";
const RESPONSE_URL = "https://www.safe182.go.kr/api/lcm/findChildList.do";

// 전체 데이터 가져오기
// export const MissingPersonAllDataSelector = selector({
//   key: "missingPersonAllDataSelector",
//   get: async () => {
//     const allData = [];
//     let page = 1;
//     let response;

//     do {
//       response = await axios.get(OPEN_PROXY + RESPONSE_URL, {
//         params: {
//           esntlId: ID,
//           authKey: KEY,
//           rowSize: 100,
//           page,
//         },
//       });
//       allData.push(...response.data.list);
//       page++;
//     } while (response.data.list.length === 100);

//     return allData;
//   },
// });

// 전체 데이터 가져오기 (병렬 처리)
export const MissingPersonAllDataSelector = selector({
  key: "missingPersonAllDataSelector",
  get: async () => {
    const allData = [];
    let page = 1;

    const responsePromises = [];
    const maxConcurrentRequests = 4; // 최대 요청 수

    while (true) {
      for (let i = 0; i < maxConcurrentRequests; i++) {
        const responsePromise = axios.get(OPEN_PROXY + RESPONSE_URL, {
          params: {
            esntlId: ID,
            authKey: KEY,
            rowSize: 100,
            page,
          },
        });
        responsePromises.push(responsePromise);
        page++;
      }

      const responses = await Promise.all(responsePromises);
      let hasMoreData = false;

      responses.forEach((response) => {
        allData.push(...response.data.list);
        if (response.data.list.length === 100) {
          hasMoreData = true;
        }
      });

      if (!hasMoreData) {
        break;
      }

      responsePromises.length = 0;
    }

    return allData;
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
