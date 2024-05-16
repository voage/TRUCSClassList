import React from "react";
import githubLogo from "../assets/github-mark-white.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-16 py-6  bg-[#151515]">
      <h1 className="text-2xl text-white">TRU Computer Science Course Graph</h1>
      <a href="https://github.com/voage/TRUCSClassList">
        <img src={githubLogo} alt="" className="h-8 w-8" />
      </a>
    </div>
  );
};

export default Header;
