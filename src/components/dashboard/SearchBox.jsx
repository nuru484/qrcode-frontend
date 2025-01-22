import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Search } from 'lucide-react';
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="space-y-4">
              <span>Search</span>
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

          <div className="flex flex-col items-center justify-center space-y-4 p-6">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <p key={index}>{result.title}</p>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">
                No results found
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
SearchBox.propTypes = {
  query: PropTypes.array,
};

export default SearchBox;
