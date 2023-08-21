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
      const coordinates = data.documents[0].address;
      return { Ma: coordinates.y, La: coordinates.x };
    } else {
      throw new Error("No coordinates found for the given address");
    }
  } catch (error) {
    console.error("Error while geocoding:", error);
    return { Ma: 0, La: 0 };
  }
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
};
