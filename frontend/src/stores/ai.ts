import { defineStore } from 'pinia';
import api from '@/services/api';

interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
  time: string;
}

interface SemanticResult {
  id: number;
  docName: string;
  score: number;
  excerpt: string;
  tags: string[];
}

export const useAIStore = defineStore('ai', {
  state: () => ({
    messages: {} as Record<string, ChatMessage[]>,
    searchResults: [] as SemanticResult[],
    isLoading: false,
    currentDocId: null as string | null,
  }),

  actions: {
    async sendMessage(docId: string, question: string) {
      if (!docId) return;
      
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      
      if (!this.messages[docId]) {
        this.messages[docId] = [
          {
            role: 'ai',
            content: "Bonjour ! Je suis Gemini. J'ai analysé votre document. Comment puis-je vous aider aujourd'hui ?",
            time,
          },
        ];
      }

      this.messages[docId].push({ role: 'user', content: question, time });
      this.isLoading = true;

      try {
        const response = await api.post(`/ai/chat/${docId}`, { question });
        const answer = response.data.answer;
        
        this.messages[docId].push({ 
          role: 'ai', 
          content: answer, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        });
      } catch (error: any) {
        this.messages[docId].push({ 
          role: 'ai', 
          content: `Désolé, j'ai rencontré une erreur : ${error.response?.data?.message || 'Erreur de connexion'}`, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        });
      } finally {
        this.isLoading = false;
      }
    },

    async performSemanticSearch(query: string) {
      this.isLoading = true;
      try {
        const response = await api.get(`/ai/explore`, { params: { q: query } });
        this.searchResults = response.data.results;
      } catch (error) {
        console.error('Semantic search failed:', error);
        this.searchResults = [];
      } finally {
        this.isLoading = false;
      }
    },

    clearChat(docId: string) {
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages[docId] = [
        { role: 'ai', content: 'Conversation réinitialisée. Je suis prêt pour vos questions.', time }
      ];
    }
  }
});
