import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";
import { SearchCategoryAtom } from "../../recoil/Atoms";
import { NavyButton } from "../styleElements/NavyButton";
import { HiOutlineRefresh } from "react-icons/hi";

export const SearchCategories = ({ setCategoryClicked }) => {
  const setSearchCategoryAtom = useSetRecoilState(SearchCategoryAtom);

  const handleSubmit = (e) => {
    setCategoryClicked(true);
    e.preventDefault();
    const form = e.target;
    setSearchCategoryAtom({
      target: form.target.value,
      gender: form.gender.value,
      age: form.age.value,
    });
  };

  const handleReset = () => {
    setSearchCategoryAtom({
      target: null,
      gender: null,
      age: null,
    });
  };

  return (
    <>
      <SearchCategoriesContainer>
        <form onSubmit={handleSubmit}>
          <select name="target">
            <option value="">대상</option>
            <option value="010">정상아동</option>
            <option value="020">가출인</option>
            <option value="040">시설보호무연고자</option>
            <option value="060">지적 장애인</option>
            <option value="061">지적 장애인(18세미만)</option>
            <option value="062">지적 장애인(18세이상)</option>
            <option value="070">치매질환자</option>
            <option value="080">불상(기타)</option>
          </select>
          <select name="gender">
            <option value="">성별</option>
            <option value="남자">남자</option>
            <option value="여자">여자</option>
          </select>
          <input type="text" name="age" placeholder="당시 나이" />
          <button className="reset" type="reset" onClick={handleReset}>
            <HiOutlineRefresh />
          </button>
          <NavyButton>카테고리로 검색</NavyButton>
        </form>
      </SearchCategoriesContainer>
    </>
  );
};

const SearchCategoriesContainer = styled.div`
  padding: 32px 0;
  margin-bottom: 48px 0;

  select,
  input {
    text-align: center;
    border: 2px solid ${(props) => props.theme.color.darkGray};
    color: ${(props) => props.theme.color.navy};
    display: inline-block;
    padding: 8px 16px;
    width: 120px;
    border-right: none;
    background-color: #fff;
    font-size: 12px;
  }

  select:nth-of-type(1) {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  input {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    border-right: 2px solid ${(props) => props.theme.color.darkGray};
    margin-right: 12px;
  }

  form {
    display: flex;
    align-items: center;

    .reset {
      border: none;
      background-color: inherit;
      font-size: 18px;
      margin-right: 8px;
      cursor: pointer;
    }
  }
`;
