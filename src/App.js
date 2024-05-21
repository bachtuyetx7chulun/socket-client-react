import { useEffect, useState } from "react";
import "./App.css";
import { socket } from "./socket";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [profile, setProfile] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      console.log(value);
      setProfile(value);
    }

    function onNotification(value) {
      toast.success(value.content);
      const new_value = [...events, value];

      setEvents(new_value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("get_me", onFooEvent);
    socket.on("get_notification", onNotification);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("get_me", onFooEvent);
      socket.off("get_notification", onNotification);
    };
  }, [events]);

  function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
      (
        +c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
      ).toString(16)
    );
  }

  const sendMessage = () => {
    console.info("Đã gửi message", socket.id);
    // const uuid = uuidv4();
    socket.emit("connect_to", {
      object_id: "4a3c2d41-1f4b-4988-a773-a0489d3f0449",
      // object_id: uuid,
      from: "LMS",
    });
  };

  const getMe = () => {
    console.log("Call my profile");
    socket.emit("get_me");
  };

  return (
    <div className="App">
      <Toaster position="bottom-right" reverseOrder={true} />
      {socket.id}
      <br />
      {isConnected ? "Đang kết nối" : "Chưa kết nối"}
      <br />
      {`${profile?.object_id}`}
      <br />
      <button onClick={sendMessage}>Gửi trò chuyện</button>
      <button onClick={getMe}>Tao là ai</button>
      <br />
      {events.map((event, id) => {
        return (
          <div key={id}>
            <p>
              <strong>
                Event number - {event?.id} - {id}
              </strong>
            </p>
            <span>{event?.content}</span>
          </div>
        );
      })}
    </div>
  );
}

export default App;
