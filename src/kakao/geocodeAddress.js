export const geocodeAddress = async (address) => {
  try {
    const response = await fetch(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
        address
      )}`,
      {
        headers: {
          Authorization:
            "KakaoAK" + " " + import.meta.env.VITE_KAKAO_REST_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (data.documents && data.documents.length > 0) {
      let coordinates = { y: 0, x: 0 };

      for (const doc of data.documents) {
        if (doc.address && doc.address.y && doc.address.x) {
          coordinates = doc.address;
          break;
        }
      }

      if (coordinates.y !== 0 && coordinates.x !== 0) {
        return { Lat: coordinates.y, Lng: coordinates.x };
      } else {
        throw new Error("해당 주소에 대한 좌표를 찾을 수 없습니다.");
      }
    } else {
      throw new Error("해당 주소에 대한 좌표를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("해당 주소에 대한 좌표를 찾을 수 없습니다.");
    return { Lat: 0, Lng: 0 };
  }
};
