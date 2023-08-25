import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { NewsDataSelector } from "../recoil/NewsApiSelector";

export const Carousel = () => {
  const newsList = useRecoilValue(NewsDataSelector);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [style, setStyle] = useState({
    transform: `translate(-${currentIdx}00%)`,
  });
  const IMAGE_SIZE = newsList.length;
  const slideRef = useRef(null);

  const moveSlide = (i) => {
    let nextIndex = currentIdx + i;
    if (nextIndex < 0) nextIndex = IMAGE_SIZE - 1;
    else if (nextIndex >= IMAGE_SIZE) nextIndex = 0;
    setCurrentIdx(nextIndex);
  };

  useEffect(() => {
    setStyle({ transform: `translate(-${currentIdx}00%)` });
  }, [currentIdx]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev === IMAGE_SIZE - 1 ? 0 : prev + 1));
    }, 4000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNewsClick = (item) => {
    window.open(item.link, "_blank");
  };

  return (
    <>
      <Container>
        <Window ref={slideRef}>
          <Prev role="button" onClick={() => moveSlide(-1)}>
            ◀
          </Prev>
          {newsList.map((item, idx) => (
            <News
              key={item.url + "_" + idx}
              style={style}
              onClick={() => handleNewsClick(item)}
            >
              <div className="news-title">{item.title}</div>
            </News>
          ))}
          <Next role="button" onClick={() => moveSlide(1)}>
            ▶
          </Next>
        </Window>
      </Container>
    </>
  );
};

const Container = styled.section`
  width: 80%;
  height: 40px;
  background-color: white;
  position: relative;
  margin: 0 auto;
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  background-color: #444444;
`;

const News = styled.div`
  background-image: url(${(props) => props.imageURL});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  width: 100%;
  flex: none;
  transition: 0.3s;
  color: white;

  .news-title {
    height: 100%;
    font-family: "noto-sans";
    font-size: 14px;
    color: #fff;
    background-color: #444444;
    font-weight: 900;
    text-align: center;
    padding: 10px;
  }
`;

const Prev = styled.div`
  width: 32px;
  height: 100%;
  color: #c0c0c0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  cursor: pointer;
  transition: 0.3s;
  z-index: 99;

  &:hover {
    background-color: rgba(121, 121, 121, 0.3);
  }
`;

const Next = styled(Prev)`
  left: unset;
  right: 0;
`;
