import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Card from "../Card/Card";
import "./Body.css";
import { FaRegCircle } from "react-icons/fa";
import { BsStack } from "react-icons/bs";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RxHalf2 } from "react-icons/rx";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdSignalCellularAlt2Bar } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import { GiNetworkBars } from "react-icons/gi";
import { getRandomColor } from "./random.color";
import { status_icons } from "./status.icons";
import { priority_icons } from "./priority.icons";
import { handleAddQueryFilters } from "../../set.query";

function Body({ filterState, tickets, users, setTickets }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const handleFilter = () => {
      let sortedData;

      if (tickets) {
        if (filterState.ordering === "Title") {
          sortedData = [...tickets].sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        } else {
          sortedData = [...tickets].sort((a, b) => a.priority - b.priority);
        }
      }

      if (filterState.grouping === "User" && tickets) {
        let statusData = {};
        for (let i = 0; i < sortedData?.length; i++) {
          let st = sortedData[i]["userId"];
          if (statusData[st] === undefined) {
            statusData[st] = [];
            statusData[st].push(sortedData[i]);
          } else {
            statusData[st].push(sortedData[i]);
          }
        }
        setData(statusData);
      } else {
        setData(tickets);
      }
    };

    handleFilter();
    handleAddQueryFilters(filterState.ordering, filterState.grouping);
  }, [filterState]);

  if (!tickets || !users) {
    return (
      <div className="App">
        <div className="panel-content">Loading...</div>
      </div>
    );
  } else {
    if (filterState?.grouping === "Priority") {
      const uniquePriorityOptions = [
        ...new Set(tickets?.map((ticket) => ticket?.priority)),
      ];

      const priorityItemsCount = uniquePriorityOptions
        .map((priority) => ({
          priority,
          number_of_items: tickets?.filter(
            (ticket) => ticket.priority === priority
          )?.length,
        }))
        .sort((a, b) => b.priority - a.priority);

      return (
        <div className="panel-content">
          {priorityItemsCount?.map(({ priority, number_of_items }) => (
            <div key={priority} className="panel_class">
              <div className="header_panel">
                <div>
                  <div>
                    <span style={{ marginRight: "5px" }}>
                      {
                        priority_icons.filter((i) => i.priority === priority)[0]
                          ?.icon
                      }
                    </span>

                    {
                      priority_icons.filter((i) => i.priority === priority)[0]
                        ?.title
                    }
                    {number_of_items}
                  </div>
                </div>
                <div>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faEllipsis} />
                  </span>
                </div>
              </div>
              <ul>
                {tickets
                  ?.filter((ticket) => ticket.priority === priority)
                  ?.map((d, i) => (
                    <Card
                      ticket={d}
                      key={i}
                      user={users.find((a) => a.id === d.userId)}
                      status={filterState.grouping}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else if (filterState.grouping === "Status") {
      const uniqueStatusOptions = [
        ...new Set(tickets?.map((ticket) => ticket?.status)),
      ];

      const customStatusOrder = [
        "Backlog",
        "Todo",
        "In progress",
        "Done",
        "Canceled",
      ];

      const statusItemsCount = uniqueStatusOptions
        .map((status) => ({
          status,
          number_of_items: tickets?.filter((ticket) => ticket.status === status)
            ?.length,
        }))
        .sort(
          (a, b) =>
            customStatusOrder.indexOf(a.status) -
            customStatusOrder.indexOf(b.status)
        );

      return (
        <div className="panel-content">
          {statusItemsCount?.map(({ status, number_of_items }) => (
            <div key={status} className="panel_class">
              <div className="header_panel">
                <div>
                  <div>
                    {status_icons.filter((i) => i.status === status)[0]?.icon}
                    {
                      status_icons.filter((i) => i.status === status)[0]?.title
                    }{" "}
                    {number_of_items}
                  </div>
                </div>
                <div>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                  <span>
                    {" "}
                    <FontAwesomeIcon icon={faEllipsis} />
                  </span>
                </div>
              </div>
              <ul>
                {tickets
                  ?.filter((ticket) => ticket.status === status)
                  ?.map((d, i) => (
                    <Card
                      ticket={d}
                      key={i}
                      user={users.find((a) => a.id === d.userId)}
                      status={filterState.grouping}
                    />
                  ))}
              </ul>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div>
          <div className="panel-content">
            {data &&
              Object.keys(data).map((key, index) => {
                let user = users.find((user) => user.id === key);

                if (!user) {
                  return <div key={index}></div>;
                }

                return (
                  <div key={index} className="status-inner">
                    <div className="header_panel">
                      <div>
                        <div
                          className="avator avator1"
                          style={{
                            backgroundColor: getRandomColor(),
                            position: "relative",
                            color: "#fff",
                          }}
                        >
                          {user.name.slice(0, 2)}
                          {user?.available && <div> </div>}
                        </div>
                        <div>
                          {" "}
                          <strong style={{ marginRight: "5px" }}>
                            {user.name}
                          </strong>
                          {data[key] ? data[key].length : 0}
                        </div>
                      </div>
                      <div>
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={faPlus} />
                        </span>
                        <span>
                          {" "}
                          <FontAwesomeIcon icon={faEllipsis} />
                        </span>
                      </div>
                    </div>
                    {data[key]?.map((item, innerIndex) => {
                      let userDetails = users?.find(
                        (user) => user.id === item.userId
                      );
                      return (
                        <Card
                          ticket={item}
                          key={innerIndex}
                          userDetails={userDetails}
                          status={filterState.grouping}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }
}

export default Body;
