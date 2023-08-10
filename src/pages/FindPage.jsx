import { styled } from "styled-components";
import { BasicHeader } from "../components/BasicHeader";
import { PageMargin } from "../components/PageMargin";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  KeywordFilterSelector,
  CategoryFilterSelector,
} from "../recoil/FetchSelectors";
import { SearchKeyword } from "../components/SearchKeyword";
import { SearchCategories } from "../components/SearchCategories";
import { PersonInfoModal } from "../components/PersonInfoModal";
import { PersonInfoModalAtom } from "../recoil/Atoms";
import { useState } from "react";
import { MissingPersonList } from "../components/MissingPersonList";

export const FindPage = () => {
  const [categoryClicked, setCategoryClicked] = useState(false);

  const search_Keyword = useRecoilValue(KeywordFilterSelector);
  const search_Category = useRecoilValue(CategoryFilterSelector);

  const [modalIsOpened, setModalIsOpened] = useState(false);
  const setPersonInfoModal = useSetRecoilState(PersonInfoModalAtom);

  const handleModal = (state) => {
    setModalIsOpened(state);
  };

  const personClick = (person, imageSrc) => {
    handleModal(true);
    setPersonInfoModal({ person, imageSrc });
  };

  return (
    <>
      <PageMargin>
        <BasicHeader>찾고 있어요</BasicHeader>
        <SearchWrap>
          <SearchKeyword setCategoryClicked={setCategoryClicked} />
          <SearchCategories setCategoryClicked={setCategoryClicked} />
        </SearchWrap>
        <MissingPersonList
          data={categoryClicked ? search_Category : search_Keyword}
          personClick={personClick}
        />
        {modalIsOpened && <PersonInfoModal handleModal={handleModal} />}
      </PageMargin>
    </>
  );
};

const SearchWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
