import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkIcon, TimerIcon } from "lucide-react";
import { EXPIRATION_TIMES, EXPIRATION_OPTIONS } from "@/constants";
import { useApi } from "@/hooks/useApi";
import { Url } from "@/types/Url";
import { useSnackbar } from "notistack";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    loading,
    error: apiError,
    execute,
    reset,
  } = useApi<Url>({
    method: "post",
    url: "/urls",
    enabled: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      setError(null);
      reset();

      // Convert expiration time to actual date
      let expiresAt = null;
      if (expirationTime && expirationTime !== "never") {
        const now = new Date();
        const timeMs =
          EXPIRATION_TIMES[expirationTime as keyof typeof EXPIRATION_TIMES];
        if (timeMs) {
          expiresAt = new Date(now.getTime() + timeMs);
        }
      }

      await execute({
        url: url.trim(),
        expires_at: expiresAt ? expiresAt.toISOString() : null,
      });

      setUrl("");
      setExpirationTime("");

      enqueueSnackbar("URL shortened successfully", {
        variant: "success",
      });

      navigate("/urls");
    } catch (err: any) {
      if (err?.errors) {
        setError(Object.values(err.errors).flat().join(", "));
      } else {
        setError(apiError || "Error shortening the URL. Please try again.");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Original URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="expirationTime"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Expiration Time (Optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <TimerIcon className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="expirationTime"
              value={expirationTime}
              onChange={(e) => setExpirationTime(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white appearance-none cursor-pointer"
              disabled={loading}
            >
              {EXPIRATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !url.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Shortening...
            </div>
          ) : (
            "Shorten URL"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
