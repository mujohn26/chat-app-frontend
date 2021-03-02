import React from "react";
import io from "socket.io-client";
import "./chatContent.css";
import profile from "../../assets/icons/profile.png";
import sendIcon from "../../assets/icons/send.png";
import verifyToken from "../../helpers/tokenHelper";

const ENDPOINT = "https://chat-app-mujohn.herokuapp.com/";
let socket;
export default class ChatContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSubChatId: 1,
      name: "",
      message: "",
      userName: "",
      email: "",
      isJoined: false,
      message: "",
      messages: [],
      token: "",
      userId: "",
      joinerEmail: "",
    };
  }

  handleConnect() {
    socket = io(ENDPOINT);

    const token = this.state.token;
    const userData = {
      name: this.state.userName,
      token,
    };
    socket.emit("new-user", userData);

    socket.on("user-connected", (data) => {

      this.setState({
        name: data.name,
        isJoined: true,
        joinerEmail: data.email,
      });
    });
  }

  UNSAFE_componentWillMount() {
    const token = localStorage.getItem("token");
    const user = verifyToken(token);
    this.setState({
      token: token,
      userName: user.payload.userName,
      email: user.payload.email,
      userId: user.payload.id,
      messages: this.props.activeSubChat.data,
    });

    console.log("=-=-=-=-=-=-=-=-=",this.props.activeSubChat.data);

  }

  handleDisconnect() {
    this.setState({
      isJoined: false,
    });
    socket = io(ENDPOINT);
    const email = "mujohn26@gmail.com";
    socket.emit("disconnect", email);
    socket.on("user-disconnected", (email) => {
      // messageData.push({
      //   id:'disconnected_user',
      //   connectedUserName: name,
      //   type:"disconnected"
      // });
    });
  }

  async handleSendMessage() {
    socket = io(ENDPOINT);
    const messagesData = {
      token: this.state.token,
      message: this.state.message,
    };
    socket.emit("send-chat-message", messagesData);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    socket = io(ENDPOINT);

    socket.on("chat-message", async (data) => {
      console.log("=-=-=-=-=-=-=-=== OnMessage");

      this.setState({
        messages: [
          ...this.state.messages,
          {
            id: this.state.userId,
            message: data.message,
            receivername: data.receivername,
            senderid: data.senderid,
            sendername: data.sendername,
          },
        ],
        message: "",
      });
    });
  }
  render() {
    const { activeSubChat } = this.props;
    return (
      <div className="content">
        <div>
          <div className="content__nav__bar">
            <div style={{ marginLeft: "10px" }}>
              <h5>{this.props.activeSubChat.name}</h5>
            </div>
          </div>
          <div className="content__top__bar">
            <div style={{ marginLeft: "10px" }}>
              <img src={profile} height="60" width="60" />
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="content__chat__image__container">
            {this.state.messages.length === 0 ? (
              <div style={{ marginTop: "50%", marginLeft: "30%" }}>
                No messages yet
              </div>
            ) : (
              <>
                {this.state.messages.map((data) => {
                  return (
                    <div style={{ marginTop: "5%" }}>
                      <>
                        {data.senderid !== this.state.userId ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "40%",
                                marginBottom: "5%",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "#fa38a6",
                                  minHeight: "70px",
                                  borderRadius: "20px 20px 0px 20px",
                                  color: "white",
                                  padding:"10px 10px 10px 10px"

                                }}
                              >
                                <p style={{ marginLeft: "5%" }}>
                                  {data.message}
                                </p>
                              </div>
                              <div style={{fontSize:"12px", marginLeft:"5%"}}>{data.sendername}</div>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div>
                              <img src={profile} height="25" width="25" />
                            </div>
                            <div
                              style={{
                                marginLeft: "1%",
                                marginBottom: "3%",
                                backgroundColor: "white",
                                minHeight: "70px",
                                width: "50%",
                                padding:"10px 10px 10px 10px",
                                borderRadius: "0px 20px 20px 20px",
                                color: "black",
                                boxShadow:
                                  "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                              }}
                            >
                              <p style={{ marginLeft: "5%" }}>{data.message}</p>
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div style={{ textAlign: "center", fontSize: "15px" }}>
            {this.state.name !== ""
              ? this.state.joinerEmail === this.state.email
                ? `You are connected`
                : `${this.state.name} is connected`
              : ""}
          </div>
          <div
            style={{
              width: "600px",
              backgroundColor: "white",
              height: "60px",
              marginTop: "6%",
              marginLeft: "10px",
              borderRadius: "20px 20px 20px 20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                borderRadius: "50%",
                height: "60px",
                width: "60px",
                backgroundColor: this.state.isJoined ? "green" : "#f4f4ff",
                marginRight: "2%",
                cursor: "pointer",
              }}
              onClick={
                this.state.isJoined
                  ? this.handleDisconnect.bind(this)
                  : this.handleConnect.bind(this)
              }
            >
              <p
                style={{ marginTop: "30%", marginLeft: "15%", color: "black" }}
              >
                {this.state.isJoined ? "Online" : "Join"}
              </p>
            </div>
            <div>
              <input
                type="text"
                id="fname"
                name="message"
                placeholder="Type a messsage here.."
                value={this.state.message}
                style={{
                  width: "350px",
                  height: "50px",
                  border: "0px",
                  marginLeft: "15%",
                  
                }}
                onChange={this.handleChange.bind(this)}
              />
            </div>
            <div
              style={{
                borderRadius: "50%",
                height: "60px",
                width: "60px",
                backgroundColor: "#f4f4ff",
                marginRight: "2%",
              }}
            >
              <img
                src={sendIcon}
                alt="send icon"
                height="35px"
                width="35px"
                style={{
                  marginTop: "15%",
                  marginLeft: "15%",
                  cursor: "pointer",
                }}
                onClick={this.handleSendMessage.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
