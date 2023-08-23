import { HiOutlineRefresh } from "react-icons/hi";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { PageMargin } from "../components/styleElements/PageMargin";
import { SmallNavyButton } from "../components/styleElements/SmallNavyButton";
import { styled } from "styled-components";
import { KakaoMap } from "../kakao/KakaoMap";
import { useState } from "react";
import { LocationFilterSelector } from "../recoil/FetchApiSelectors";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  PersonInfoModalAtom,
  Location_SearchKeywordAtom,
} from "../recoil/Atoms";
import { PersonInfoModal } from "../components/findPage/PersonInfoModal";
import noImage from "../assets/noImage.jpg";
import { geocodeAddress } from "../kakao/geocodeAddress";

export const LocationPage = () => {
  const filterdData = useRecoilValue(LocationFilterSelector);
  const [currentKeyword, setCurrentKeyword] = useRecoilState(
    Location_SearchKeywordAtom
  );

  const [modalIsOpened, setModalIsOpened] = useState(false);
  const setPersonInfoModal = useSetRecoilState(PersonInfoModalAtom);
  const [missingLocation, setMissingLocation] = useState({
    Lat: "",
    Lng: "",
  });

  const handleModal = (state) => {
    setModalIsOpened(state);
  };

  const handleView = (person, imageSrc) => {
    handleModal(true);
    setPersonInfoModal({ person, imageSrc });
  };

  const handleMap = async (address) => {
    const geoCode = await geocodeAddress(address);
    setMissingLocation(geoCode);
  };

  return (
    <PageMargin>
      <BasicHeader>실종자 위치</BasicHeader>
      <PageContainer>
        <ListContainer className="scrollBar">
          <Header>
            <input
              type="text"
              placeholder="주소를 입력하세요"
              onChange={(e) => {
                setCurrentKeyword(e.target.value);
              }}
              value={currentKeyword}
            />
            <div className="refresh-icon" onClick={() => setCurrentKeyword("")}>
              <HiOutlineRefresh />
            </div>
          </Header>

          {currentKeyword === "" ? (
            <div className="result-null">검색 결과 없음</div>
          ) : (
            filterdData.map((person) => {
              let imageSrc;
              if (person.tknphotoFile) {
                imageSrc = `data:image/jpeg;base64,${person.tknphotoFile}`;
              } else {
                imageSrc = noImage;
              }
              return (
                <>
                  <div className="item" key={person.rnum}>
                    <img src={imageSrc} alt="사진" />
                    <div className="info">
                      <div className="name">
                        이름 : {person.nm}({person.sexdstnDscd.substr(0, 1)})
                      </div>
                      <div>당시 나이 : {person.age}세</div>
                      <div>발생 장소 : {person.occrAdres}</div>
                      <div>
                        <SmallNavyButton
                          onClick={() => handleView(person, imageSrc)}
                        >
                          상세
                        </SmallNavyButton>
                        <SmallNavyButton
                          onClick={() => handleMap(person.occrAdres)}
                        >
                          실종 위치
                        </SmallNavyButton>
                      </div>
                    </div>
                    {modalIsOpened && (
                      <PersonInfoModal handleModal={handleModal} />
                    )}
                  </div>
                </>
              );
            })
          )}
          {modalIsOpened && <PersonInfoModal handleModal={handleModal} />}
        </ListContainer>
        <MapContainer>
          <KakaoMap geoCode={missingLocation} />
        </MapContainer>
      </PageContainer>
    </PageMargin>
  );
};

const PageContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;

  .result-null {
    font-size: 14px;
    margin: 0 auto;
  }
`;

const ListContainer = styled.div`
  background-color: ${(props) => props.theme.color.dark};
  width: 30%;
  height: 70vh;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;

  &.scrollBar::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }

  &.scrollBar::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${(props) => props.theme.color.navy}; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  &.scrollBar::-webkit-scrollbar-track {
    background: ${(props) =>
      props.theme.color.primary}; /*스크롤바 뒷 배경 색상*/
  }

  .item {
    height: auto;
    display: flex;
    align-items: center;
    font-size: 13px;
    background-color: ${(props) => props.theme.color.primary};
    border-radius: 12px;
    padding: 8px 0;

    .info {
      padding: 0 6px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    img {
      width: 40%;
      padding: 8px;
      border-radius: 12px;
    }

    .name {
      font-size: 14px;
      font-weight: 900;
    }

    button {
      margin-top: 6px;
      padding: 4px 8px;
      margin-right: 4px;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 24px 0;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  input {
    width: 80%;
    height: 40px;
    padding: 4px 12px;
    border-radius: 12px;
    border: none;

    &::placeholder {
      color: ${(props) => props.theme.color.darkGray};
    }
  }

  .refresh-icon {
    cursor: pointer;
    font-size: 20px;
  }
`;

const MapContainer = styled.div`
  width: 70%;
`;
