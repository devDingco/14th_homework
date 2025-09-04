import { config } from '../config/environment';
import { tokenStorage } from '../apollo/auth';

// API 응답 타입
interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// API 에러 타입
interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// 기본 헤더 생성
const createHeaders = (customHeaders?: Record<string, string>) => {
  const token = tokenStorage.getToken();

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...customHeaders,
  };
};

// API 클라이언트 클래스
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  // GET 요청
  async get<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...options,
    });
  }

  // POST 요청
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // PUT 요청
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // DELETE 요청
  async delete<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...options,
    });
  }

  // PATCH 요청
  async patch<T>(endpoint: string, data?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // 파일 업로드
  async uploadFile<T>(endpoint: string, file: File, options?: RequestInit): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        // Content-Type은 브라우저가 자동으로 설정
        ...(options?.headers && { ...options.headers }),
      },
      ...options,
    });
  }

  // 다중 파일 업로드
  async uploadFiles<T>(endpoint: string, files: File[], options?: RequestInit): Promise<ApiResponse<T>> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers: {
        ...(options?.headers && { ...options.headers }),
      },
      ...options,
    });
  }

  // 기본 요청 메서드
  private async request<T>(endpoint: string, options: RequestInit): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers = createHeaders(options.headers as Record<string, string>);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }

      throw new Error('Unknown error occurred');
    }
  }
}

// 기본 API 클라이언트 인스턴스
export const apiClient = new ApiClient();

// 특정 서비스용 API 클라이언트들
export const geocodeApi = new ApiClient('/api');
export const uploadApi = new ApiClient('/api/upload');

// 유틸리티 함수들
export const apiUtils = {
  // 에러 처리
  handleError: (error: any): ApiError => {
    if (error instanceof Error) {
      return {
        message: error.message,
        status: 500,
      };
    }

    return {
      message: 'Unknown error occurred',
      status: 500,
    };
  },

  // 응답 검증
  validateResponse: <T>(response: ApiResponse<T>): boolean => {
    return response.status >= 200 && response.status < 300;
  },

  // 재시도 로직
  retry: async <T>(
    fn: () => Promise<T>,
    attempts: number = config.retryAttempts,
    delay: number = config.retryDelay
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error) {
      if (attempts <= 1) throw error;

      await new Promise((resolve) => setTimeout(resolve, delay));
      return apiUtils.retry(fn, attempts - 1, delay * 2);
    }
  },
};
