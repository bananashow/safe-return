import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { Find_SearchKeywordAtom } from "../../recoil/Atoms";

export const SearchKeyword = ({ setCategoryClicked }) => {
  const [SearchKeywordAtom, setSearchKeywordAtom] = useRecoilState(
    Find_SearchKeywordAtom
  );

  return (
    <>
      <SearchKeywordContainer>
        <input
          type="text"
          placeholder="이름이나 주소를 입력하세요"
          onChange={(e) => {
            setSearchKeywordAtom(e.target.value);
            setCategoryClicked(false);
          }}
          value={SearchKeywordAtom}
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
