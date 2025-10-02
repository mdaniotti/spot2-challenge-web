import { useState } from "react";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { LinkIcon, ExternalLink, TrashIcon, Eye } from "lucide-react";
import { isExpired } from "@/utils";
import { Url } from "@/types/Url";
import { useApi } from "@/hooks/useApi";

const UrlList = ({
  urls,
  onUrlDeleted,
}: {
  urls: Url[];
  onUrlDeleted?: (deletedId: string) => void;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { execute } = useApi<void>({
    method: "delete",
    url: "/urls", // Will be passed dynamically the id
    enabled: false,
  });

  const handleRedirect = (shortCode: string) => {
    window.open(`/${shortCode}`, "_blank");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this URL?")) {
      return;
    }

    try {
      setDeletingId(id);
      await execute(undefined, `/urls/${id}`);

      // Notificar al componente padre que se eliminó esta URL específica
      if (onUrlDeleted) {
        onUrlDeleted(id);
      }

      enqueueSnackbar("URL deleted successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting URL:", error);
      enqueueSnackbar("Error deleting URL", {
        variant: "error",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (urls.length === 0) {
    return (
      <div className="text-center py-12">
        <LinkIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No URLs shortened
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Start shortening your first URL above.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header - Only visible on desktop */}
      <div className="hidden md:flex px-4 items-center space-x-4 font-semibold text-gray-800">
        <p className="w-[10%]">ID</p>
        <p className="w-[15%]">Code</p>
        <p className="w-[65%]">Original URL</p>
        <p className="w-[10%]">Actions</p>
      </div>

      {urls.map((url) => (
        <div
          key={url.id}
          className={`border rounded-lg p-4 ${
            isExpired(url.expires_at)
              ? "border-red-200 bg-red-50"
              : "border-gray-200 bg-white"
          }`}
        >
          {/* Desktop layout */}
          <div className="hidden md:flex items-center space-x-4">
            <span className="w-[10%] truncate text-primary">#{url.id}</span>
            <span className="w-[15%] text-gray-600">{url.short_code}</span>
            <span className="w-[65%] truncate text-gray-600">
              {url.original_url}
            </span>
            <div className="flex items-center space-x-2 w-[10%]">
              <Link to={`/urls/${url.id}`}>
                <Eye className="h-5 w-5 text-primary hover:text-yellow-700" />
              </Link>

              <button
                onClick={() => handleRedirect(url.short_code)}
                disabled={isExpired(url.expires_at)}
                className="p-1 text-primary hover:text-yellow-700 disabled:opacity-50 disabled:hover:text-primary"
                title="Redirect to original URL"
              >
                <ExternalLink className="h-5 w-5" />
              </button>

              <button
                onClick={() => handleDelete(url.id)}
                disabled={deletingId === url.id}
                className="p-1 text-red-700 hover:text-red-500 disabled:opacity-50"
                title="Delete URL"
              >
                {deletingId === url.id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                ) : (
                  <TrashIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="md:hidden space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-primary font-medium">#{url.id}</span>
              <div className="flex items-center space-x-2">
                <Link to={`/urls/${url.id}`}>
                  <Eye className="h-5 w-5 text-primary hover:text-yellow-700" />
                </Link>

                <button
                  onClick={() => handleRedirect(url.short_code)}
                  disabled={isExpired(url.expires_at)}
                  className="p-1 text-primary hover:text-yellow-700 disabled:opacity-50"
                  title="Redirect to original URL"
                >
                  <ExternalLink className="h-5 w-5" />
                </button>

                <button
                  onClick={() => handleDelete(url.id)}
                  disabled={deletingId === url.id}
                  className="p-1 text-red-600 hover:text-red-700 disabled:opacity-50"
                  title="Delete URL"
                >
                  {deletingId === url.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                  ) : (
                    <TrashIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Code
                </p>
                <p className="text-gray-600 font-mono text-sm">
                  {url.short_code}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Original URL
                </p>
                <p className="text-gray-600 text-sm break-all">
                  {url.original_url}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* TODO: Add pagination */}
    </div>
  );
};

export default UrlList;
