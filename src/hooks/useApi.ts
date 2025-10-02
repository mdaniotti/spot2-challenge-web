import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Error in response interceptor:", error);
    if (error.response?.status === 422) {
      // Validation errors
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
    // Here we can try refresh the token if the user is logged in, and if not, redirect to the login page
  }
);

type Method = "get" | "post" | "put" | "delete" | "patch";

interface UseApiOptions<T> {
  method: Method;
  url: string;
  data?: any;
  enabled?: boolean; // Whether to execute the request automatically
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (newData?: any, dynamicUrl?: string) => Promise<T>;
  reset: () => void;
  refetch: () => Promise<T>;
}

export const useApi = <T = any>({
  method,
  url,
  data,
  enabled = true,
  onSuccess,
  onError,
}: UseApiOptions<T>): UseApiReturn<T> => {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const executeRequest = useCallback(
    async (requestData?: any, requestUrl?: string): Promise<T> => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        let response;
        const requestPayload = requestData !== undefined ? requestData : data;
        const targetUrl = requestUrl || url;

        switch (method) {
          case "get":
            response = await api.get(targetUrl);
            break;
          case "post":
            response = await api.post(targetUrl, requestPayload);
            break;
          case "put":
            response = await api.put(targetUrl, requestPayload);
            break;
          case "patch":
            response = await api.patch(targetUrl, requestPayload);
            break;
          case "delete":
            response = await api.delete(targetUrl);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        const responseData = response.data;
        setState({ data: responseData, loading: false, error: null });

        if (onSuccess) {
          onSuccess(responseData);
        }

        return responseData;
      } catch (error: any) {
        const errorMessage = error?.message || "An error occurred";
        setState((prev) => ({ ...prev, loading: false, error: errorMessage }));

        if (onError) {
          onError(error);
        }

        throw error;
      }
    },
    [method, url, data, onSuccess, onError]
  );

  const execute = useCallback(
    (newData?: any, dynamicUrl?: string) => {
      return executeRequest(newData, dynamicUrl);
    },
    [executeRequest]
  );

  const refetch = useCallback(() => executeRequest(), [executeRequest]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (enabled && method === "get") {
      executeRequest();
    }
  }, [enabled, method, executeRequest]);

  return {
    ...state,
    execute,
    reset,
    refetch,
  };
};

export default api;
