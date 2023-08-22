const { kakao } = window;

export const showToastMessage = (map, message, position, timeout = 2000) => {
  const infoWindow = new kakao.maps.InfoWindow({
    content: `<div style="background-color: #333; color: #fff; padding: 8px 8px; border-radius: 8px; font-size: 12px">${message}</div>`,
    position,
  });
  infoWindow.open(map);

  setTimeout(() => {
    infoWindow.close();
  }, timeout);
};
