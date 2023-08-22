import { atom } from "recoil";

// 모달 실종자 정보
export const PersonInfoModalAtom = atom({
  key: "personInfoModalAtom",
  default: { person: null, imageSrc: null },
});

// 검색어 - 찾고있어요 페이지
export const Find_SearchKeywordAtom = atom({
  key: "find_SearchKeywordAtom",
  default: "",
});

// 검색어 - 실종자 위치 페이지
export const Location_SearchKeywordAtom = atom({
  key: "location_SearchKeywordAtom",
  default: "",
});

// 검색 카테고리
export const SearchCategoryAtom = atom({
  key: "searchCategoryAtom",
  default: {
    target: null,
    gender: null,
    age: null,
  },
});

// 로그인 상태 : 최초 로딩 시 localStorage에서 가져옴
export const IsSignInStateAtom = atom({
  key: "isSignInStateAtom",
  default: Boolean(localStorage.getItem("uid")),
});
