import React from "react";
import Image from "next/image";
import Pic from "../../public/logo_black.png";

export const Logo = () => {
  return <Image src={Pic} alt="Logo" width={600} height={350} />;
};
