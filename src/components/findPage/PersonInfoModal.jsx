import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { PersonInfoModalAtom } from "../../recoil/Atoms";
import { formatOccrde } from "./MissingPersonList";

export const PersonInfoModal = ({ handleModal }) => {
  const { person, imageSrc } = useRecoilValue(PersonInfoModalAtom);
  let category;

  if (person.writngTrgetDscd === "010") {
    category = "정상 아동(18세 미만)";
  } else if (person.writngTrgetDscd === "020") {
    category = "가출인";
  } else if (person.writngTrgetDscd === "040") {
    category = "시설 보호 무연고자";
  } else if (person.writngTrgetDscd === "060") {
    category = "지적 장애인";
  } else if (person.writngTrgetDscd === "061") {
    category = "지적 장애인(18세 미만)";
  } else if (person.writngTrgetDscd === "062") {
    category = "지적 장애인(18세 이상)";
  } else if (person.writngTrgetDscd === "070") {
    category = "치매 질환자";
  } else if (person.writngTrgetDscd === "080") {
    category = "불상(기타)";
  }

  return (
    <>
      <Overlay onClick={() => handleModal(false)} />
      <Modal>
        <h3>상세 정보</h3>
        <div className="person-info">
          <img src={imageSrc} alt="실종자" />
          <ul>
            <li>이름 : {person.nm}</li>
            <li>성별 : {person.sexdstnDscd}</li>
            <li>대상 : {category}</li>
            <li>당시 나이 : {person.age}세</li>
            <li>현재 나이 : {person.ageNow}세</li>
            <li>발생 일시 : {formatOccrde(person.occrde)}</li>
            <li>발생 장소 : {person.occrAdres}</li>
            <li>특징 : {person.etcSpfeatr}</li>
          </ul>
        </div>
        <button onClick={() => handleModal(false)}>X</button>
      </Modal>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(26, 26, 26, 0.5);
`;

const Modal = styled.div`
  background-color: #f3f3f3;
  width: 750px;
  height: 450px;
  border-radius: 12px;
  overflow: auto;

  z-index: 9999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    margin: 28px 0px;
  }

  button {
    padding: 4px 6px;
    background-color: ${(props) => props.theme.color.navy};
    border: none;
    border-radius: 6px;
    color: #fff;
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  }

  .person-info {
    display: flex;
    align-items: center;
    img {
      margin: 0 24px;
    }

    ul {
      padding: 16px 28px;
      li {
        font-size: 16px;
        margin: 14px 0;
      }
    }
  }
`;
