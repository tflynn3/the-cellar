import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wine } from '@/types/wine';

interface WineFiltersProps {
  wines: Wine[];
  filters: {
    style: string;
    location: string;
    vendor: string;
    grape: string;
  };
  onFilterChange: (filters: {
    style: string;
    location: string;
    vendor: string;
    grape: string;
  }) => void;
}

export function WineFilters({ wines, filters, onFilterChange }: WineFiltersProps) {
  const styles = Array.from(new Set(wines.map(wine => wine.style)));
  const locations = Array.from(new Set(wines.map(wine => wine.location)));
  const vendors = Array.from(new Set(wines.map(wine => wine.vendor)));

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <Select
          value={filters.style}
          onValueChange={(value) => onFilterChange({ ...filters, style: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Styles</SelectItem>
            {styles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={filters.location}
          onValueChange={(value) => onFilterChange({ ...filters, location: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Select
          value={filters.vendor}
          onValueChange={(value) => onFilterChange({ ...filters, vendor: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Vendor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Vendors</SelectItem>
            {vendors.map((vendor) => (
              <SelectItem key={vendor} value={vendor}>
                {vendor}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Input
          placeholder="Search by Grape"
          value={filters.grape}
          onChange={(e) => onFilterChange({ ...filters, grape: e.target.value })}
        />
      </div>
    </div>
  );
}