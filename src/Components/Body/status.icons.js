import { BsStack } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RxHalf2 } from "react-icons/rx";

export const status_icons = [
  {
    status: "Todo",
    title: "Todo",
    icon: <FaRegCircle color="#c7c7c7ff" size={"1em"} />,
  },
  {
    status: "Backlog",
    title: "Backlog",
    icon: <BsStack />,
  },
  {
    status: "In progress",
    title: "In progress",
    icon: <RxHalf2 color="#ffe200" size={"1em"} />,
  },
  {
    status: "Done",
    title: "Done",
    icon: <IoMdCheckmarkCircle color="#727CD7" size={"1em"} />,
  },
  {
    status: "Canceled",
    title: "Canceled",
    icon: <MdCancel color="red" size={"1em"} />,
  },
];
