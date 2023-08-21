import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { GetAddressesSelector } from "../recoil/FetchApiSelectors";
const { kakao } = window;

export const KakaoMap = ({ handleNearbyPersonList }) => {
  const [myLocation, setMyLocation] = useState("");
  const getAddressList = useRecoilValue(GetAddressesSelector);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          const userLocation = new kakao.maps.LatLng(userLat, userLng);
          setMyLocation(userLocation);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (myLocation) {
      // 지도 초기화
      const mapContainer = document.getElementById("map");
      const mapOption = {
        center: myLocation,
        level: 8,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

      // 원 생성
      const circleOptions = {
        center: myLocation,
        radius: 30000, // 반경 30km
        strokeWeight: 1,
        strokeColor: "#333",
        strokeOpacity: 0.7,
        fillColor: "#ddd",
        fillOpacity: 0.3,
      };
      const circle = new kakao.maps.Circle(circleOptions);
      circle.setMap(map);

      // 현재 위치 마커 생성
      const userMarkerImage = new kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
        new kakao.maps.Size(24, 35),
        {
          offset: new kakao.maps.Point(12, 35),
        }
      );
      const userMarker = new kakao.maps.Marker({
        position: myLocation,
        image: userMarkerImage,
      });
      userMarker.setMap(map);

      // 마커들 생성 및 원 내부 판별
      const markers = [];
      const validPersons = [];

      const validAddresses = getAddressList.filter((data) => {
        return data.dataLat !== 0 && data.dataLng !== 0;
      });

      validAddresses.forEach((addressData) => {
        const position = new kakao.maps.LatLng(
          addressData.dataLat,
          addressData.dataLng
        );

        // 거리 계산
        const line = new kakao.maps.Polyline({
          path: [position, myLocation],
        });
        const distance = line.getLength();

        if (distance <= 30000) {
          const marker = new kakao.maps.Marker({
            position: position,
            map: map,
          });
          markers.push(marker);
          validPersons.push(addressData);
        }
      });
      handleNearbyPersonList(validPersons);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myLocation, getAddressList]);

  return (
    <>
      <KakaoMapWrap>
        <div id="map"></div>
      </KakaoMapWrap>
    </>
  );
};

const KakaoMapWrap = styled.div`
  #map {
    width: 100%;
    height: 500px;
  }
`;
