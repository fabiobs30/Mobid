// useWebSocket.ts
import { useEffect } from 'react';
import { useAuth } from "../../Hooks/Auth";

type MessageHandler = (event: MessageEvent) => void;

const messageHandlers: Set<MessageHandler> = new Set();

export const addMessageHandler = (handler: MessageHandler) => {
  messageHandlers.add(handler);
};

export const removeMessageHandler = (handler: MessageHandler) => {
  messageHandlers.delete(handler);
};

const useWebSocket = () => {
  const { cliente } = useAuth();

  useEffect(() => {
    if (!cliente?.cliente_id) return;

    const socket = new WebSocket(`ws://192.168.15.39:8000/ws/cliente/${cliente.cliente_id}`);

    socket.onmessage = (event: MessageEvent) => {
      messageHandlers.forEach((handler) => handler(event));
    };
    return () => {
      socket.close();
    };
  }, [cliente?.cliente_id]);
};

export default useWebSocket;
