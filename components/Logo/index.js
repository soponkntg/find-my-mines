import React from "react";
import Image from "next/image";
import Pic from "../../public/logo_black.png";

export const Logo = () => {
  return <Image src={Pic} alt="Logo" width={630} height={350} />;
};
