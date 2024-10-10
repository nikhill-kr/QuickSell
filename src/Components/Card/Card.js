import React from "react";
import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getRandomColor } from "../Body/random.color";
import { status_icons } from "../Body/status.icons";
import { priority_icons } from "../Body/priority.icons";

const Card = ({ ticket, user, status }) => {
  return (
    <div className="card">
      <div className="container">
        <div>
          <span className="name">
            <b>{ticket?.id}</b>
          </span>
          {user && (
            <span className="icon">
              <div
                className="avator"
                style={{
                  backgroundColor: getRandomColor(),
                  position: "relative",
                  color: "#fff",
                }}
              >
                {user?.name.slice(0, 2)}
                {user?.available && <div> </div>}
              </div>
            </span>
          )}
        </div>
        <p className="para">
          {" "}
          <span style={{ marginRight: "10px" }}>
            {status === "User" &&
              status_icons.filter((i) => i.status === ticket?.status)[0]?.icon}
          </span>
          <strong> {ticket?.title}</strong>
        </p>
        <div className="status">
          <button className="btn">
            {status === "Priority" &&
              status_icons.filter(
                (i) =>
                  i.status.toString().toLowerCase() ===
                  ticket.status.toString().toLowerCase()
              )[0]?.icon}
            {status === "Status" &&
              priority_icons.filter((i) => i.priority === ticket?.priority)[0]
                .icon}
            {status === "User" &&
              priority_icons.filter((i) => i.priority === ticket?.priority)[0]
                ?.icon}
          </button>
          {ticket?.tag &&
            ticket?.tag?.map((t, i) => {
              return (
                <button className="btn" key={i}>
                  {t}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Card;
