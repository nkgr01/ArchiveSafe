import axios from '@/api/axios';

export interface UploadResponse {
  message: string;
  document: {
    id: number;
    title: string;
    status: string;
  };
}

export interface UploadStatus {
  id: number;
  title: string;
  content_available: boolean;
  // Backend can also return a processing status (used by DocUpload.vue)
  status?: string;
}


export const UploadService = {
  async uploadFile(file: File, title?: string, onProgress?: (percent: number) => void): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    if (title) {
      formData.append('title', title);
    }

    const { data } = await axios.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      }
    });
    return data;
  },

  async getUploadStatus(id: number): Promise<UploadStatus> {
    const { data } = await axios.get(`/api/upload/status/${id}`);
    return data;
  }
};
