import { useRouteError, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 font-sans mx-4">
      <div className="max-w-md w-full text-center p-8 mx-4 bg-white shadow-lg rounded-xl border border-gray-100">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-600 text-2xl">!</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            {error?.statusText ||
              error?.message ||
              'We encountered an unexpected error'}
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-200 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Return to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
