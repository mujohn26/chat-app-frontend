import React from "react";
import "./Sidebar.css";
import ThemeChanger from '../../components/common/themeChanger.jsx'
import messageIcon from '../../assets/icons/comment.png'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
  faComment
} from "@fortawesome/free-solid-svg-icons";

library.add(
faComment
);

const Sidebar = ({
  chatsList,
  activeChatId,
  switchChat,
  toggleTheme,
}) => (
    
  <div className="sidebar">

    <div className="sidebar__head">
<div>

        <ThemeChanger/>
</div>
      <div>
        <h4 className="sidebar__head__title">Chat </h4>
      </div>
    </div>

    <ul className="sidebar__list">
      {chatsList &&
        chatsList.map((chat) => (
          <li
            className={`sidebar__list__item ${
              activeChatId === chat.id
                ? "sidebar__list__item--active"
                : ""
            }`}
            onClick={() => switchChat(chat.id)}
          >
            <div>
            <FontAwesomeIcon
                icon={faComment}
                className="sidebar__list__item__icon"
              />{" "}
            </div>
            <div>
              <h4
                className="sidebar__list__item__title"
                style={{
                  color:
                    activeChatId === chat.id
                      ? "var(--selectionTextColor)"
                      : "var(--textColor)",
                      fontSize:"20px"
                }}
              >
                {chat.title}
              </h4>
            </div>
          </li>
        ))}
    </ul>
  </div>
);

export default Sidebar;
