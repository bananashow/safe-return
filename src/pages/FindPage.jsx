import { styled } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  KeywordFilterSelector,
  CategoryFilterSelector,
} from "../recoil/FetchApiSelectors";
import { SearchKeyword } from "../components/findPage/SearchKeyword";
import { SearchCategories } from "../components/findPage/SearchCategories";
import { PersonInfoModal } from "../components/findPage/PersonInfoModal";
import { PersonInfoModalAtom } from "../recoil/Atoms";
import { useState } from "react";
import { MissingPersonList } from "../components/findPage/MissingPersonList";
import { PageMargin } from "../components/styleElements/PageMargin";
import { BasicHeader } from "../components/styleElements/BasicHeader";

export const FindPage = () => {
  const [categoryClicked, setCategoryClicked] = useState(false);

  const searchKeyword = useRecoilValue(KeywordFilterSelector);
  const searchCategory = useRecoilValue(CategoryFilterSelector);

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
          data={categoryClicked ? searchCategory : searchKeyword}
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
