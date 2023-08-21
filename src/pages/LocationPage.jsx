import { styled } from "styled-components";
import { BasicHeader } from "../components/styleElements/BasicHeader";
import { PageMargin } from "../components/styleElements/PageMargin";
import { BasicInput } from "../components/styleElements/BasicInput";
import { KakaoMap } from "../kakao/KakaoMap";
import { useState } from "react";
import { PersonInfoModalAtom } from "../recoil/Atoms";
import { useSetRecoilState } from "recoil";
import { PersonInfoModal } from "../components/findPage/PersonInfoModal";
import noImage from "../assets/noImage.jpg";

export const LocationPage = () => {
  const [nearbyPersonList, setNearbyPersonList] = useState([]);
  const [modalIsOpened, setModalIsOpened] = useState(false);
  const setPersonInfoModal = useSetRecoilState(PersonInfoModalAtom);

  const handleModal = (state) => {
    setModalIsOpened(state);
  };

  const personClick = (person, imageSrc) => {
    handleModal(true);
    setPersonInfoModal({ person, imageSrc });
  };

  const handleNearbyPersonList = (list) => {
    setNearbyPersonList(list);
  };

  return (
    <PageMargin>
      <BasicHeader>근처 실종자 확인</BasicHeader>
      <NearbyMissingPerson>
        <div className="list-container">
          <BasicInput type="text" placeHolder="주소를 입력하세요"></BasicInput>
          {nearbyPersonList.map((person) => {
            let imageSrc;
            if (person.tknphotoFile) {
              imageSrc = `data:image/jpeg;base64,${person.tknphotoFile}`;
            } else {
              imageSrc = noImage;
            }
            return (
              <>
                <div
                  className="person-info"
                  key={person.rnum}
                  onClick={personClick(person, imageSrc)}
                >
                  {modalIsOpened && (
                    <PersonInfoModal handleModal={handleModal} />
                  )}

                  <img
                    src={`data:image/jpeg;base64,${person.tknphotoFile}`}
                    alt="사진"
                  />
                  <div>
                    <div className="name">
                      {person.nm}({person.ageNow})
                    </div>
                    <div>당시 나이: {person.age}세</div>
                    <div>발생 장소: {person.occrAdres}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="kakao-map">
          <KakaoMap handleNearbyPersonList={handleNearbyPersonList} />
        </div>
      </NearbyMissingPerson>
    </PageMargin>
  );
};

const NearbyMissingPerson = styled.div`
  display: flex;
  font-size: 13px;

  .list-container {
    width: 30%;
    height: 500px;
    padding: 12px;
    background-color: ${(props) => props.theme.color.dark};
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 200px;
      padding: 8px 4px;
      margin: 0 auto;
    }

    .person-info {
      width: 100%;
      height: 100px;
      margin: 12px 0;
      display: flex;
      align-items: center;

      img {
        border: 1px solid black;
        border-radius: 8px;
        width: 100px;
        height: 100%;
        margin: 4px 8px 4px 4px;
      }

      .name {
        font-size: 16px;
        font-weight: 900;
      }
    }
  }

  .kakao-map {
    width: 70%;
  }
`;
