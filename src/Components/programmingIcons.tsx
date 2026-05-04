import React from "react";
import {
  SiJavascript,
  SiHtml5,
  SiReact,
  SiPython,
  SiTailwindcss,
  SiAngular,
  SiCplusplus,
  SiSharp,
} from "react-icons/si";
import { FaJava, FaCss3Alt, FaVuejs } from "react-icons/fa";

const ProgrammingIcons = [
  {
    icon: <SiJavascript />,
    color: "text-yellow-400",
    top: "35%",
    left: "10%",
    size: "text-4xl",
    animation: "animate-bounce-slow",
  },
  {
    icon: <SiHtml5 />,
    color: "text-orange-500",
    top: "15%",
    left: "25%",
    size: "text-5xl",
    animation: "animate-spin-slow",
  },
  {
    icon: <FaCss3Alt />,
    color: "text-blue-600",
    top: "90%",
    left: "70%",
    size: "text-3xl",
    animation: "animate-pulse",
  },
  {
    icon: <SiReact />,
    color: "text-cyan-400",
    top: "60%",
    left: "15%",
    size: "text-4xl",
    animation: "animate-bounce",
  },
  {
    icon: <SiPython />,
    color: "text-blue-400",
    top: "20%",
    left: "75%",
    size: "text-5xl",
    animation: "animate-spin",
  },
  {
    icon: <SiTailwindcss />,
    color: "text-teal-400",
    top: "65%",
    left: "80%",
    size: "text-4xl",
    animation: "animate-bounce-slow",
  },
  {
    icon: <FaVuejs />,
    color: "text-green-500",
    top: "80%",
    left: "40%",
    size: "text-4xl",
    animation: "animate-pulse",
  },
  {
    icon: <SiAngular />,
    color: "text-red-600",
    top: "15%",
    left: "60%",
    size: "text-5xl",
    animation: "animate-bounce",
  },
  {
    icon: <SiSharp />,
    color: "text-purple-700",
    top: "40%",
    left: "80%",
    size: "text-3xl",
    animation: "animate-spin-slow",
  },
  {
    icon: <SiCplusplus />,
    color: "text-blue-800",
    top: "85%",
    left: "20%",
    size: "text-4xl",
    animation: "animate-pulse",
  },
  {
    icon: <FaJava />,
    color: "text-red-500",
    top: "10%",
    left: "90%",
    size: "text-4xl",
    animation: "animate-bounce-slow",
  },
];

export const BackgroundProgrammingIcons: React.FC = () => {
  return (
    <>
      {ProgrammingIcons.map((iconData, index) => (
        <div
          key={index}
          className={`absolute ${iconData.color} ${iconData.size} ${iconData.animation} opacity-50 pointer-events-none`}
          style={{ top: iconData.top, left: iconData.left }}
        >
          {iconData.icon}
        </div>
      ))}
    </>
  );
};
