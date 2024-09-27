import React from "react";
import Lottie from "react-lottie";
import animationData from "./successLottie.json";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default LottieAnimation;
