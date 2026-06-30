import axios from '@/api/axios';

export interface Document {
  id: number;
  title: string;
  content?: string;
  ocr_text?: string;
  status: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  ai_summary?: string;
  metadata?: any;
}

export interface PaginatedDocuments {
  data: Document[];
  totalRecords: number;
  rows: number;
}

export const DocumentService = {
  async getDocuments(params: any): Promise<PaginatedDocuments> {
    const { data } = await axios.get('/api/documents', { params });
    return data;
  },

  async getDocument(id: number): Promise<Document> {
    const { data } = await axios.get(`/api/documents/${id}`);
    return data;
  },

async updateDocument(id: number, payload: any): Promise<{ message: string, document: Document }> {
    const { data } = await axios.put(`/api/documents/${id}`, payload);
    return data;
  },

  async deleteDocument(id: number): Promise<{ message: string }> {
    const { data } = await axios.delete(`/api/documents/${id}`);
    return data;
  },

  async getTrashedDocuments(): Promise<Document[]> {
    const { data } = await axios.get('/api/documents/trash');
    return data;
  },

  async restoreDocument(id: number): Promise<{ message: string, document: Document }> {
    const { data } = await axios.post(`/api/documents/${id}/restore`);
    return data;
  },

  async forceDeleteDocument(id: number): Promise<{ message: string }> {
    const { data } = await axios.delete(`/api/documents/${id}/force-delete`);
    return data;
  },
};
