import React from "react";
import styles from "./GuestNameInLobby.module.css";
import img1 from "assets/profile/profile1.png";
import img2 from "assets/profile/profile2.png";
import img3 from "assets/profile/profile3.png";
import img4 from "assets/profile/profile4.png";
import img5 from "assets/profile/profile5.png";
import img6 from "assets/profile/profile6.png";
import img7 from "assets/profile/profile7.png";
import img8 from "assets/profile/profile8.png";
import img9 from "assets/profile/profile9.png";
import img10 from "assets/profile/profile10.png";
import img11 from "assets/profile/profile11.png";
import img12 from "assets/profile/profile12.png";
import img13 from "assets/profile/profile13.png";
import img14 from "assets/profile/profile14.png";
import img15 from "assets/profile/profile15.png";
import img16 from "assets/profile/profile16.png";

type GuestItemType = {
  sender: string;
  img: number;
};

interface ItemProps {
  item: GuestItemType;
}

const GuestNameInLobby: React.FC<ItemProps> = ({ item }) => {
  const IMAGES = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
    img14,
    img15,
    img16,
  ];

  return (
    <div className={styles.guestProfile}>
      <div>
        <img src={IMAGES[item.img - 1]} alt="" className={styles.profileImg} />
      </div>
      <div className={styles.guestName}>{item.sender}</div>
    </div>
  );
};

export default GuestNameInLobby;
