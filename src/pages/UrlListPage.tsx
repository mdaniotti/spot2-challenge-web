import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import UrlList from "@/components/UrlList";
import { Url } from "@/types/Url";

const UrlListPage = () => {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useApi<{ data: Url[] }>({
    method: "get",
    url: "/urls",
  });

  const [localUrls, setLocalUrls] = useState<Url[]>([]);

  useEffect(() => {
    if (data?.data) {
      setLocalUrls(data.data);
    }
  }, [data?.data]);

  const urls = localUrls.length > 0 ? localUrls : data?.data || [];

  const handleUrlDeleted = (deletedId: string) => {
    setLocalUrls((prev) => prev.filter((url) => url.id !== deletedId));
  };

  return (
    <main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Shortened URLs
            </h2>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center justify-center sm:px-3 py-1.5 px-2 bg-transparent text-primary rounded-md hover:text-gray-900 hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors w-full sm:w-auto"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Shorten URL
            </button>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                Loading...
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-8 px-4">
              <p className="text-red-600 text-sm sm:text-base break-words">
                {error}
              </p>
              <button
                onClick={refetch}
                className="mt-4 px-4 py-2 text-primary rounded hover:text-yellow-700 text-sm sm:text-base"
              >
                Retry
              </button>
            </div>
          ) : (
            <UrlList urls={urls} onUrlDeleted={handleUrlDeleted} />
          )}
        </div>
      </div>
    </main>
  );
};

export default UrlListPage;
