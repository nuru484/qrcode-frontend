import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEvents } from '@/hooks/useEvent';

const SearchBox = () => {
  const { events } = useEvents();
  const handleSearch = (e) => {
    const search = events.data.filter((event) => {
      return event.title.toLowerCase().includes(e.target.value.toLowerCase());
    });

    console.log(search);
  };
  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
        <Input
          onChange={handleSearch}
          className="pl-10 w-full border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
