import { proactiveMessage } from '../data/sarah';

export type ChatMessage = {
  id: string;
  role: 'ai' | 'user';
  text: string;
};

export function useChat() {
  return {
    data: {
      proactiveMessage,
      history: [] as ChatMessage[],
    },
    isLoading: false,
    error: null,
  };
}
