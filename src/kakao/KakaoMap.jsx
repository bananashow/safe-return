import { useState } from "react";
import { useEffect } from "react";
import { styled } from "styled-components";
import { showToastMessage } from "./showToastMsg";
const { kakao } = window;

export const KakaoMap = ({ geoCode }) => {
  const [myLocation, setMyLocation] = useState("");

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
        level: 6,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);

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

      if (geoCode.Lat && geoCode.Lng) {
        const markerPosition = new kakao.maps.LatLng(geoCode.Lat, geoCode.Lng);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
        map.setCenter(markerPosition);

        const circleOptions = {
          center: markerPosition,
          radius: 1000,
          strokeWeight: 1,
          strokeColor: "#333",
          strokeOpacity: 0.7,
          fillColor: "#ddd",
          fillOpacity: 0.3,
        };
        const circle = new kakao.maps.Circle(circleOptions);
        circle.setMap(map);
      } else if (geoCode.Lat === "" && geoCode.Lng === "") {
        const userMarker = new kakao.maps.Marker({
          position: myLocation,
          image: userMarkerImage,
        });
        userMarker.setMap(map);
      } else {
        showToastMessage(map, "주소가 정확하지 않아요!", myLocation);
      }
    }
  }, [myLocation, geoCode]);

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
    height: 70vh;
  }
`;
