import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SearchBox = ({ query = [] }) => {
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
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
                    <div className="flex-grow">
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
