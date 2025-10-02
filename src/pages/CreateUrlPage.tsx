import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import UrlForm from "@/components/UrlForm";

const CreateUrlPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/urls"
          className="inline-flex items-center text-sm font-medium text-primary hover:text-yellow-700 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          URLs Shortened List
        </Link>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shorten URL</h2>
          <UrlForm />
        </div>
      </div>
    </main>
  );
};

export default CreateUrlPage;
