import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { SearchKeywordAtom } from "../recoil/Atoms";

export const SearchKeyword = ({ setCategoryClicked }) => {
  const [searchKeywordAtom, setSearchKeywordAtom] =
    useRecoilState(SearchKeywordAtom);

  return (
    <>
      <SearchKeywordContainer>
        <input
          type="text"
          placeholder="이름이나 장소를 입력하세요"
          onChange={(e) => {
            setSearchKeywordAtom(e.target.value);
            setCategoryClicked(false);
          }}
          value={searchKeywordAtom}
        />
      </SearchKeywordContainer>
    </>
  );
};

const SearchKeywordContainer = styled.div`
  input {
    width: 500px;
    height: 50px;
    padding: 4px 12px;
    border-radius: 12px;
    border: none;

    &::placeholder {
      color: ${(props) => props.theme.color.darkGray};
    }
  }
`;
