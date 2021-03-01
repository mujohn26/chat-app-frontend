import React from "react";
import "./Main.css";
import Sidebar from "../views/Sidebar/Sidebar";
import Chat from "../views/Chat/Chat";


export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  UNSAFE_componentWillMount() {
  }
  render() {
    const {
      activeChat,
      chatsList,
      activeChatId,
      switchChat,
      totalChats,
      toggleTheme
    } = this.props;
    return (
      <div className="main">
 
        <Sidebar
          chatsList={chatsList}
          activeChatId={activeChatId}
          switchChat={switchChat}
          toggleTheme={toggleTheme}
        />
        <Chat
          activeChat={activeChat}
          switchChat={switchChat}
          totalChats={totalChats}
        />
      </div>
    );
  }
}
