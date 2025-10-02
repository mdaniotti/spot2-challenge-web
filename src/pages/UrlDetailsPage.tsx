import { useParams, Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  ArrowLeft,
  ExternalLink,
  CopyIcon,
  TrashIcon,
  Calendar,
  MousePointer,
  Clock,
} from "lucide-react";
import { copyToClipboard, isExpired, formatDate } from "@/utils";
import { useApi } from "@/hooks/useApi";
import { Url } from "@/types/Url";

const UrlDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data: response,
    loading,
    error,
  } = useApi<{ success: boolean; data: Url }>({
    method: "get",
    url: `/urls/${id}`,
    enabled: !!id,
  });

  const url = response?.data;

  const { execute: deleteUrl } = useApi<void>({
    method: "delete",
    url: `/urls/${id}`,
    enabled: false,
  });

  const handleCopyToClipboard = async (text: string) => {
    const success = await copyToClipboard(text);
    enqueueSnackbar(success ? "URL copied!" : "Error copying URL", {
      variant: success ? "success" : "error",
    });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this URL?")) {
      return;
    }

    try {
      await deleteUrl();
      enqueueSnackbar("URL deleted successfully", {
        variant: "success",
      });

      navigate("/urls");
    } catch (error) {
      console.error("Error deleting URL:", error);
      enqueueSnackbar("Error deleting URL", {
        variant: "error",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            URL not found
          </h1>
          <p className="text-gray-600 mb-6">
            The URL you are looking for does not exist or has been deleted.
          </p>
          <Link
            to="/urls"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            URLs Shortened List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/urls"
          className="inline-flex items-center text-primary hover:text-yellow-700 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          URLs Shortened List
        </Link>

        <div
          className={`bg-white rounded-lg shadow-md p-6 ${
            isExpired(url.expires_at)
              ? "border-red-200 bg-red-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Shorten URL</h2>
            <button
              onClick={handleDelete}
              className="p-2 inline-flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
              title="Delete URL"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete URL
            </button>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                ID:
              </label>
              <span className="text-gray-900 font-medium">#{url.id}</span>
            </div>
            <div className="my-5 flex items-center space-x-2">
              <label className="block text-sm font-medium text-gray-700">
                Status:
              </label>
              <span
                className={`px-2 py-1 rounded-md text-xs font-medium shadow-md ${
                  isExpired(url?.expires_at || "")
                    ? "bg-red-100 text-red-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {isExpired(url?.expires_at || "") ? "Expired" : "Active"}
              </span>
            </div>
          </div>

          {/* URL Information */}
          <div className="space-y-6">
            {/* Short URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short URL:
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded-md text-sm font-mono shadow-md">
                  {url.short_url}
                </code>
                <button
                  onClick={() => handleCopyToClipboard(url.short_url)}
                  className="p-1 text-primary hover:text-yellow-700 hover:bg-yellow-50 rounded-md"
                  title="Copy Short URL"
                >
                  <CopyIcon className="h-5 w-5" />
                </button>
                <a
                  href={url.short_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-primary hover:text-yellow-700 hover:bg-yellow-50 rounded-md"
                  title="Open Short URL"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Original URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original URL:
              </label>
              <div className="flex items-center space-x-2">
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded-md text-sm break-all shadow-md">
                  {url.original_url}
                </code>
                <button
                  onClick={() => handleCopyToClipboard(url.original_url)}
                  className="p-1 text-primary hover:text-yellow-700 hover:bg-yellow-50 rounded-md"
                  title="Copy Original URL"
                >
                  <CopyIcon className="h-5 w-5" />
                </button>
                <a
                  href={url.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 text-primary hover:text-yellow-700 hover:bg-yellow-50 rounded-md"
                  title="Open Original URL"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Code:
              </label>
              <code className="px-3 py-2 bg-gray-100 rounded-md text-sm font-mono shadow-md">
                {url.short_code}
              </code>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Clicks */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <div className="flex items-center">
                  <MousePointer className="h-8 w-8 text-primary" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Clicks</p>
                    <p className="text-md font-bold text-gray-900">
                      {url.clicks}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created Date */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Created</p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatDate(url.created_at)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expires Date */}
              <div className="bg-gray-50 rounded-lg p-4 shadow-md">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-primary" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-700">Expire</p>
                    <p
                      className={`text-sm font-bold ${
                        isExpired(url.expires_at)
                          ? "text-red-600"
                          : "text-gray-900"
                      }`}
                    >
                      {formatDate(url?.expires_at || "")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrlDetailsPage;
