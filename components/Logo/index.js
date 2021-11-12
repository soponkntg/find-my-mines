import React from "react";
import Image from "next/image";
import Black_Pic from "../../public/logo_black.png";
import Red_Pic from "../../public/logo_red.png";

export const Logo = () => {
  const [logo, setLogo] = React.useState(Black_Pic);
  const onClickHandler = () => {
    if (logo === Black_Pic) {
      setLogo(Red_Pic);
    } else {
      setLogo(Black_Pic);
    }
  }
  return <div onClick={onClickHandler}>
    <Image src={logo} alt="Logo" width={630} height={350} />
  </div>;
};
