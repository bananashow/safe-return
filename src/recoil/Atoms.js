import { atom } from "recoil";

// 모달 실종자 정보
export const PersonInfoModalAtom = atom({
  key: "personInfoModalAtom",
  default: { person: null, imageSrc: null },
});

// 검색어
export const SearchKeywordAtom = atom({
  key: "searchKeywordAtom",
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

// 로그인 상태
export const IsSignInStateAtom = atom({
  key: "isSignInStateAtom",
  default: false,
});

// 로그인된 계정의 정보
export const SignedInUserInfo = atom({
  key: "signedInUserInfo",
  default: {},
});
