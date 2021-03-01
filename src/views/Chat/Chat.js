import React from "react";
import SubChatSidebar from "./ChatSidebar";
import ChatContent from "./ChatContent";
import "./chat.css";

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeSubChatId: 1,
      }; 
    this.getSubActiveChat = this.getActiveSubChat.bind(this);
    this.getSubChatsList = this.getSubChatsList.bind(this);
    this.switchSubChat = this.switchSubChat.bind(this);
    }
  getActiveSubChat() {
    const activeChat = this.props.activeChat.subChat.filter(
      (chat) => chat.id === this.state.activeSubChatId
    );
    return activeChat[0];
  }
// UNSAFE_componentWillMount(){
// console.log('-=-=-=-==>>>>',this.props.subChatsList);
// }
  getSubChatsList() {
    return this.props.activeChat.subChat.map((chat) => ({
      id: chat.id,
      name: chat.name,
      data: chat.data,
    }));
  }

  switchSubChat(id) {
    this.setState({ activeSubChatId: id });
    
  }
  render() {
    const { activeChat, switchChat, totalChats } = this.props;
    return (
      <div className="chat">
  
        <div className="chat__content">
          <div>
            <SubChatSidebar
              subChatsList={this.getSubChatsList()}
              subActiveChatId={this.getSubActiveChat()}
              switchSubChat={this.switchSubChat}
              activeSubChatId={this.state.activeSubChatId}
            />
          </div>
          <div >
              <ChatContent
              activeSubChat={this.getSubActiveChat()}
              />
          </div>
        </div>
      </div>
    );
  }
}
