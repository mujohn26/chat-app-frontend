import { render } from "@testing-library/react";
import React, { Component } from "react";
import profile from "../../assets/icons/profile.png";
import "./chatSidebar.css";

class SubChatSidebar extends Component {

  render() {
    const {
      subChatsList,
      activeSubChatId,
      switchSubChat,
    } = this.props;
    return (
      <div className="sidebar1">
        <div className="sidebar__toggle__container"></div>
        <ul className="sidebar__list">
          {subChatsList &&
            subChatsList.map((chat) => (
              <li
                className={`sidebar__subtitle__list__item ${
                  activeSubChatId === chat.id
                    ? "sub__chat__sidebar__list__item--active"
                    : ""
                }`}
                onClick={() => switchSubChat(chat.id)}
              >
                <div>
                  <img
                    src={profile}
                    height="40px"
                    width="40px"
                    style={{
                      marginTop: "15px",
                      borderRadius: "10px 10px 10px 10px",
                    }}
                  />
                </div>
                <div className="sub__chat__sidebar__list__item__container">
                  <div className="sub__chat__sidebar__list__item__head">
                    <div>
                      <h4 className="sidebar__list__item__title">
                        {chat.name}
                      </h4>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default SubChatSidebar;
