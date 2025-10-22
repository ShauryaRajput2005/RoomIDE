import { useEffect, useRef } from "react";
import CodeEditor from "../components/CodeEditor";
import { initSocket } from "../socket";
import { useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ACTIONS } from "../Actions";

function EditorPage({ setClients, setRoomId }) {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);

  useEffect(() => {
    if (!location.state) return;

    const init = async () => {
      socketRef.current = await initSocket();

      const handleErrors = () => {
        toast.error("Socket connection failed");
        navigate("/");
      };

      socketRef.current.on("connect_error", handleErrors);
      socketRef.current.on("connect_failed", handleErrors);

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        name: location.state.name,
      });

      socketRef.current.on(ACTIONS.JOINED, ({ clients, name, socketId }) => {
        setClients(clients);
        if (name !== location.state.name)
          toast.success(`${name} joined the room`);

        socketRef.current.emit(ACTIONS.SYNC_CODE, {
          code: codeRef.current,
          socketId,
        });
      });

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, name }) => {
        setClients((prev) => prev.filter((c) => c.socketId !== socketId));
        toast(`${name} left the room`);
      });
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  if (!location.state) return <Navigate to="/" />;

  return (
    <CodeEditor
      socketRef={socketRef}
      roomId={roomId}
      onCodeChange={(code) => {
        codeRef.current = code;
      }}
    />
  );
}

export default EditorPage;
