// useWebSocket.ts
import { useEffect } from 'react';
import { useAuth } from "../../../Hooks/Auth";


type MessageHandler = (event: WebSocketMessageEvent) => void;

const messageHandlers: Set<MessageHandler> = new Set();

export const addMessageHandler = (handler: MessageHandler) => {
  messageHandlers.add(handler);
};

export const removeMessageHandler = (handler: MessageHandler) => {
  messageHandlers.delete(handler);
};

const useWebSocket = () => {
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario?.cliente_id) return;

    const socket = new WebSocket(`ws://192.168.101.4:8000/ws/cliente/${usuario.cliente_id}`);

    socket.onmessage = (event: WebSocketMessageEvent) => {
      // Supondo que a mensagem recebida seja uma string JSON
      const data: WebSocketMessageEvent = JSON.parse(event.data);

      messageHandlers.forEach((handler) => handler(data));
    };

    return () => {
      socket.close();
    };
  }, [usuario?.cliente_id]);
};

export default useWebSocket;