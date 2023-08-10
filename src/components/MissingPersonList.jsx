import { styled } from "styled-components";
import noImage from "../assets/noImage.jpg";
import { Badge } from "../components/Badge";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

export const formatOccrde = (occrde) => {
  const year = occrde.substring(0, 4);
  const month = occrde.substring(4, 6);
  const day = occrde.substring(6, 8);
  return `${year}년 ${Number(month)}월 ${Number(day)}일`;
};

export const MissingPersonList = ({ data, personClick }) => {
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  if (data.length === 0) {
    return <NoResult>검색 결과가 없습니다.</NoResult>;
  }

  return (
    <>
      <MissingPersonContainer>
        {data
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((person) => {
            let imageSrc;
            if (person.tknphotoFile) {
              imageSrc = `data:image/jpeg;base64,${person.tknphotoFile}`;
            } else {
              imageSrc = noImage;
            }
            return (
              <FindContainer
                key={person.rnum}
                onClick={() => personClick(person, imageSrc)}
              >
                <div className="personImage">
                  <img src={imageSrc} alt="실종자" />
                  <Badge number={person.writngTrgetDscd} />
                </div>
                <div>
                  <ul>
                    <li>이름 : {person.nm}</li>
                    <li>성별 : {person.sexdstnDscd}</li>
                    <li>당시 나이 : {person.age}세</li>
                    <li>현재 나이 : {person.ageNow}세</li>
                    <li>발생 일시 : {formatOccrde(person.occrde)}</li>
                    <li>발생 장소 : {person.occrAdres}</li>
                  </ul>
                </div>
              </FindContainer>
            );
          })}
      </MissingPersonContainer>
      <Pagination
        dataLength={data.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const FindContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 150px;
    background-color: red;
  }

  ul {
    padding: 16px 28px;
    li {
      font-size: 13px;
      margin: 8px 0;
    }
  }

  .personImage {
    position: relative;
  }
`;

const MissingPersonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
`;

const NoResult = styled.div`
  padding: 12px 0;
  text-align: center;
  font-size: 18px;
  font-weight: 900;
`;
