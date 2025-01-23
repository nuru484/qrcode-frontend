import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, ChevronRight, Calendar, MapPin, Info } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBox = ({ query = [] }) => {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSearch, setSelectedSearch] = useState(null);
  const searchTimeout = useRef(null);

  const handleSearch = (e) => {
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      const search = query.filter((event) =>
        event.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchResults(search);
    }, 300);
  };

  const handleEventClick = (event) => {
    setSelectedSearch(event);
  };

  const handleCloseDialog = () => {
    setSelectedSearch(null);
  };

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
        <Input
          onChange={handleSearch}
          onFocus={() => setSearching(true)}
          className="pl-10 w-full border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm"
          placeholder="Search..."
          aria-label="Search input"
        />
      </div>

      <Dialog open={searching} onOpenChange={setSearching}>
        <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="space-y-4">
              <span className="text-xl font-bold text-gray-800">Search</span>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
                <Input
                  onChange={handleSearch}
                  onFocus={() => setSearching(true)}
                  className="pl-10 w-full border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm"
                  placeholder="Search..."
                  aria-label="Search input"
                />
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-80 overflow-y-auto">
            {searchResults.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 hover:bg-emerald-50 transition-colors cursor-pointer group"
                  >
                    <div
                      className="flex-grow"
                      onClick={() => handleEventClick(result)}
                    >
                      <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600">
                        {result.title}
                      </h3>
                      {result.description && (
                        <p className="text-xs text-gray-500 mt-1">
                          {result.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center p-6">
                <p className="text-sm text-gray-500 text-center bg-gray-50 p-4 rounded-lg">
                  No results found
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedSearch} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-lg bg-white rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-gray-800">
              {selectedSearch?.title || 'Event Details'}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col p-6 space-y-6">
            {selectedSearch?.description && (
              <p className="text-gray-700 text-sm leading-relaxed">
                {selectedSearch.description}
              </p>
            )}
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10m-4 9h-2m-6 0a9 9 0 1118 0H4z"
                />
              </svg>
              <p className="text-gray-600 text-sm">
                {selectedSearch?.date
                  ? new Date(selectedSearch.date).toLocaleDateString()
                  : 'Date not specified'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 19.364l-1.415-1.415a2 2 0 010-2.828l12-12a2 2 0 012.828 0l1.415 1.415a2 2 0 010 2.828l-12 12a2 2 0 01-2.828 0z"
                />
              </svg>
              <p className="text-gray-600 text-sm">
                {selectedSearch?.location || 'Location not specified'}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

SearchBox.propTypes = {
  query: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

export default SearchBox;
