import React from "react";

const Tag = ({ title }) => {
  const getColor = () => {
    let color;
    switch (title) {
      case "web developement":
        color = "#f60808";
        break;
      case "fine women":
        color = "#f8067b";
        break;
      case "fun times":
        color = "#1724e0";
        break;
      default:
        color = "rgb(129,138,210)";
    }
    return color;
  };
  return (
    <div style={{ backgroundColor: getColor() }} className="text-white text-center text-sm p-1 rounded-sm w-32 cursor-pointer">
      {title}
    </div>
  );
};

export default Tag;
