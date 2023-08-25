import { styled } from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

export const UserProfileImage = ({ handleSelectedFile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    handleSelectedFile(file);
  };

  return (
    <UserImage>
      {selectedImage ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="profile-image"
          className="profile-image"
        />
      ) : (
        <UserIcon />
      )}
      <input
        type="file"
        accept="image/jpg,image/png,image/jpeg"
        name="profileImage"
        onChange={handleImageChange}
      />
    </UserImage>
  );
};

const UserImage = styled.div`
  width: 100%;
  height: 250px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    margin-top: 12px;
    bottom: 40px;
    right: 80px;
    border: 2px solid #fff;
  }

  .profile-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

const UserIcon = styled(FaUserCircle)`
  width: 150px;
  height: 150px;
`;
