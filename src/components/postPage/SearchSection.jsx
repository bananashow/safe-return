import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { HiOutlineRefresh } from "react-icons/hi";

export const SearchSection = ({
  handleSearchWord,
  handleSelectedCategory,
  selectedCategory,
}) => {
  const navigation = useNavigate();

  return (
    <>
      <SearchSectionWrap>
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          onChange={(e) => handleSearchWord(e.target.value)}
        />
        <div className="buttons">
          <select
            onChange={(e) => handleSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">전체</option>
            <option value="share">나누어요</option>
            <option value="report">제보해요</option>
          </select>
          <button>내가 쓴 글</button>
          <span className="reset" onClick={() => handleSelectedCategory("")}>
            <HiOutlineRefresh />
          </span>
          <button className="post-button" onClick={() => navigation("/post")}>
            글쓰기
          </button>
        </div>
      </SearchSectionWrap>
    </>
  );
};

const SearchSectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .buttons {
    padding: 16px;
    display: flex;
    align-items: center;
  }

  select,
  button {
    height: 30px;
    border: none;
    border-radius: 12px;
    padding: 4px 8px;
    margin: 16px 8px;
    background-color: #fff;
    width: 124px;
    text-align: center;
    cursor: pointer;
    font-family: "gmarket-medium";
  }

  .reset {
    font-size: 18px;
    margin: 8px;
    cursor: pointer;
  }
`;
