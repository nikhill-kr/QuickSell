import { BsExclamationSquareFill } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { GiNetworkBars } from "react-icons/gi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdSignalCellularAlt2Bar } from "react-icons/md";

export const priority_icons = [
  {
    priority: 4,
    title: "Urgent",
    icon: <BsExclamationSquareFill color="orange" size={"1em"} />,
  },
  {
    priority: 3,
    title: "High",
    icon: <GiNetworkBars size={"1em"} />,
  },
  {
    priority: 2,
    title: "Medium",
    icon: <FiBarChart size={"1em"} />,
  },
  {
    priority: 1,
    title: "Low",
    icon: <MdSignalCellularAlt2Bar size={"1em"} />,
  },
  {
    priority: 0,
    title: "No Priority",
    icon: <HiOutlineDotsHorizontal size={"1em"} />,
  },
];
