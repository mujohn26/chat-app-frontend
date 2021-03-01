import React from "react";
import { connect } from "react-redux";
import "./App.css";
import Main from "./index";
import { GetUserMessages } from "../redux/action/message/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: "light",
      activeChatId: 1,
      messagesData: [],
    };
    this.getActiveChat = this.getActiveChat.bind(this);
    this.getChatsList = this.getChatsList.bind(this);
    this.switchChat = this.switchChat.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.GetUserMessages();
  }
  componentDidUpdate(prevProps) {
    if (this.props.messages !== prevProps.messages) {
      let datas= [];
      let id=0;
      this.props.messages.map((data)=>{
        id=id+1;
        datas.push({
         id,
         name:data[0]===undefined?'Anyonmous':data[0].receivername,
         data:data
        })
      })
  const messageData = [  {
        id: 1,
        title: "chat",
        icon: "chat",
        subChat: datas,
      }]

      this.setState({
        messagesData:messageData
      })
    }
  }

  getActiveChat() {
   
    const activeChat = this.state.messagesData.filter(
      (chat) => chat.id === this.state.activeChatId
    );

    return activeChat[0];
  }

  getChatsList() {
    return this.state.messagesData.map((chat) => ({
      id: chat.id,
      title: chat.title,
      icon: chat.icon,
      subChat: chat.subChat,
    }));

  }

  switchChat(id) {
    this.setState({ activeChatId: id });
  }

  render() {
    const { activeChatId } = this.state;
    return (
      <div className="app">
        {this.state.messagesData!==undefined&&this.state.messagesData.length!==0?(
     <Main
     activeChat={this.getActiveChat()}
     chatsList={this.getChatsList()}
     activeChatId={activeChatId}
     switchChat={this.switchChat}
     totalChats={this.state.messagesData.length}
   />
        ):""}
   
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    messages: state.messageReducer.messages,
    error: state.messageReducer.error,
  };
}

const connectedApp = connect(mapStateToProps, {
  GetUserMessages,
})(App);

export default connectedApp;

