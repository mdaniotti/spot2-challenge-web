import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { useApi } from "../hooks/useApi";

const RedirectPage = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    execute: getRedirectUrl,
    loading,
    error: apiError,
  } = useApi<{ success: boolean; original_url: string }>({
    method: "get",
    url: `/${code}`,
    enabled: false,
    onSuccess: (data) => {
      if (data.original_url) {
        setTimeout(() => {
          window.location.href = data.original_url;
        }, 1500);
      } else {
        setError("Redirect URL not found in response");
        setRedirecting(false);
      }
    },
    onError: (error: any) => {
      console.error("Error during redirect:", error);
      if (error?.response?.status === 404) {
        setError("URL not found");
        enqueueSnackbar("URL not found", { variant: "error" });
      } else if (error?.response?.status === 410) {
        setError("URL expired");
        enqueueSnackbar("URL expired", { variant: "warning" });
      } else {
        setError("Network error during redirect");
        enqueueSnackbar("Network error during redirect", { variant: "error" });
      }
      setRedirecting(false);
    },
  });

  useEffect(() => {
    if (!code) {
      navigate("/urls");
      return;
    }

    const handleRedirect = async () => {
      setRedirecting(true);
      setError(null);
      await getRedirectUrl();
    };

    handleRedirect();
  }, [code, navigate]);

  const handleGoBack = () => {
    navigate("/urls");
  };

  const currentError = error || apiError;

  if (currentError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Redirect Error
          </h2>
          <p className="text-gray-600 mb-6">{currentError}</p>
          <button
            onClick={handleGoBack}
            className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
          >
            Back to URLs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {redirecting || loading ? (
          <>
            <div className="relative mb-6">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-primary mx-auto"></div>
              <ExternalLink className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Redirecting...
            </h2>
            <p className="text-gray-600 mb-4">
              We are taking you to your destination
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-primary h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
          </>
        ) : (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Redirect Success!
            </h2>
            <p className="text-gray-600 mb-4">
              You will be redirected in a few seconds...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-pulse w-full"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RedirectPage;
