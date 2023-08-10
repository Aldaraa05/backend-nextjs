import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/dist/types/server";
import { useUser } from "@clerk/nextjs";
configureAbly({
  key: "DuUOOw.XrX9_A:kGOm0BRk6jVKod6bj9zimGuUBJw28_tamxKZZAFgqK4",
  clientId: Date.now() + "",
});

export default function Chat() {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(Array);
  const [prevMessages, setPrevMessages] = useState(Array);
  const {user}= useUser()

  const [channel] = useChannel("public-chat", (message) => {
    setMessages((prev) => [...prev, message]);
  });

  async function sendMessage() {
    channel.publish("message", { text, date: Date.now() });
    setText("");
    fetch("http://localhost:3000/api/messages", {
      method: "POST",
      body: JSON.stringify({
      name: user?.username, text: text,
      }),
    });
  }

  useEffect(() => {
    fetch("http://localhost:3000/api/messages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setPrevMessages(data.documents);
      });
  }, [messages, prevMessages]);
  async function remove(id: number) {
    fetch(`http://localhost:3000/api/messages/${id}`, {
      method: "DELETE",
    });
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{display:'flex', flexDirection:"column"}}>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ height: 50, width: 200 }}
        ></input>
        <button onClick={sendMessage} style={{ height: 50, width: 50 }}>
          send
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {prevMessages &&
          prevMessages.map((message: any) => (
            <div style={{display:"flex", flexDirection:"column", alignItems: message.name === "aldaraa"? "flex-start": "flex-end" ,  margin: 10,}}>
              <p>{message.name}</p>
            <div
            onClick={() => remove(message._id)}
            key={message._id}
            style={{
              padding:10,
              backgroundColor: message.name ==="aldaraa" ? "white" : "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: message.name==="aldaraa" ? "black" : "white",
              borderRadius:20,
              marginTop:5,
              width:"200px",
              wordWrap:"break-word"
            }}
          >
            <p style={{}}>{message.text}</p>
            
          </div>
          </div>
            
            
          ))}
        {/* {messages &&
          messages.map((message: any) => (
            <div
              onClick={() => remove(message._id)}
              key={message.id}
              style={{
                height: 50,
                width: 250,
                backgroundColor: "white",
                margin: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {message.data.text}
            </div>
          ))} */}
      </div>
      </div>
     
    </div>
  );
}
