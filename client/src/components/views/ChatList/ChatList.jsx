import React, { useState, useEffect } from "react";
import "./ChatList.css";
import apiClient from "../../utils/axios";
import { NavBar } from "../NavBar/NavBar";

export const ChatList = () => {
  return (
    <div>
      <div className="container">
        <div></div>
        <div className="title">CHAT</div>
      </div>
      <hr style={{ height: "5px", backgroundColor: "black" }}></hr>
      <div className="friends">
        <Friend />
      </div>
      <NavBar />
    </div>
  );
};

function Friend() {
  const [myData, setMyData] = useState({});
  useEffect(() => {
    apiClient.get("/chats").then((res) => setMyData(res));
  }, []);
  const onClick = (i) => {
    document.location.href = `/chats/${i}`;
  };
  const result = [];
  if (myData.status != 200) {
    return <div>잘못된 요청입니다</div>;
  }
  if (!Object.keys(myData.data).length) {
    return <div>생성된 채팅방이 없습니다.</div>;
  }
  for (const chat in myData.data) {
    const chats = myData.data[chat];
    const curstyle = chats.state == 0 ? "ButtonStyle" : "offlineButton";
    result.push(
      <div className="friend" key={chats.chatRoomId}>
        <div>
          {chats.name}&#40;{chats.role}&#41;
        </div>
        <div>최근 채팅 시간: {chats.lastOnline}</div>
        <button className={curstyle} onClick={() => onClick(chats.chatRoomId)}>
          채팅
        </button>
      </div>
    );
  }
  return result;
}
