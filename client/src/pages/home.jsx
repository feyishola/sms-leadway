import React from "react";
import noActivityIcon from "../assets/icons/noActivityIcon.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" flex flex-col gap-3 items-center py-20">
      <img src={noActivityIcon} alt="icon" width={180} height={180} />

      <h2 className="font-semibold text-center">
        You don't have any activity on your dashboard
      </h2>

      <p className="max-w-[260px] text-center text-[13px]">
        Start creating schools, student, teachers account or report to see
        dashboard activities
      </p>

      <Link
        to={"/createschool"}
        className="text-[#0052CC] text-[13px] pt-2 font-semibold"
      >
        Create School
      </Link>
    </div>
  );
};

export default Home;