import styled from "styled-components";
import {
  HiChevronLeft,
  HiChevronDoubleLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from "react-icons/hi";

export const Pagination = ({ dataLength, currentPage, setCurrentPage }) => {
  const totalPage = Math.ceil(dataLength / 20);

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPage));
  };

  const getPageNumbersToShow = () => {
    const numbersToShow = [];
    const maxPageToShow = 5;
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPage);

    // 시작 페이지와 마지막 페이지가 최대 페이지 수를 넘지 않도록
    if (endPage - startPage < maxPageToShow - 1) {
      if (currentPage < totalPage / 2) {
        endPage = Math.min(startPage + maxPageToShow - 1, totalPage);
      } else {
        startPage = Math.max(endPage - maxPageToShow + 1, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      numbersToShow.push(i);
    }

    return numbersToShow;
  };

  return (
    <PaginationContainer>
      <PrevNextButton
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        <HiChevronDoubleLeft />
      </PrevNextButton>
      <PrevNextButton disabled={currentPage === 1} onClick={handlePrevPage}>
        <HiChevronLeft />
      </PrevNextButton>
      {getPageNumbersToShow().map((pageNumber) => {
        const isSelected = pageNumber === currentPage;
        return (
          <PageButtons
            key={pageNumber}
            className={isSelected ? "selected" : ""}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </PageButtons>
        );
      })}
      <PrevNextButton
        disabled={currentPage === totalPage}
        onClick={handleNextPage}
      >
        <HiChevronRight />
      </PrevNextButton>
      <PrevNextButton
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage(totalPage)}
      >
        <HiChevronDoubleRight />
      </PrevNextButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled.section`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

const PageButtons = styled.button`
  display: flex;
  align-items: center;
  border: none;
  box-shadow: none;
  background: none;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    border: 1px solid #d0d7de;
  }

  &.selected {
    background-color: ${(props) => props.theme.color.navy};
    color: #ffffff;
  }
`;

const PrevNextButton = styled(PageButtons)`
  color: ${(props) => props.theme.color.navy};

  &:disabled {
    color: ${(props) => props.theme.color.darkGray};
    &:hover {
      border: none;
    }
  }
`;
