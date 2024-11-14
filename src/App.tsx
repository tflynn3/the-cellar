import { useState } from 'react';
import { Wine } from '@/types/wine';
import { WineCard } from '@/components/WineCard';
import { AddWineDialog } from '@/components/AddWineDialog';
import { WineFilters } from '@/components/WineFilters';
import { Wine as WineIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initialWines } from '@/data/initialWines';

function App() {
  const [wines, setWines] = useState<Wine[]>(initialWines);
  const [filters, setFilters] = useState({
    style: 'all',
    location: 'all',
    vendor: 'all',
    grape: '',
  });

  const handleAddWine = (newWine: Omit<Wine, 'id'>) => {
    setWines([
      ...wines,
      {
        ...newWine,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setWines(wines.map(wine => 
      wine.id === id ? { ...wine, notes } : wine
    ));
  };

  const handleMarkAsDrank = (id: string, rating: Wine['consumed']) => {
    setWines(wines.map(wine =>
      wine.id === id ? { ...wine, consumed: rating } : wine
    ));
  };

  const activeWines = wines.filter(wine => !wine.consumed);
  const archivedWines = wines.filter(wine => wine.consumed);

  const filteredWines = (wineList: Wine[]) => {
    return wineList.filter(wine => {
      return (filters.style === 'all' || wine.style === filters.style) &&
             (filters.location === 'all' || wine.location.includes(filters.location)) &&
             (filters.vendor === 'all' || wine.vendor.includes(filters.vendor)) &&
             (!filters.grape || wine.grapes.some(g => g.toLowerCase().includes(filters.grape.toLowerCase())));
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WineIcon className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">Wine Collection</h1>
            </div>
            <AddWineDialog onAddWine={handleAddWine} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <WineFilters
          wines={wines}
          filters={filters}
          onFilterChange={setFilters}
        />
        
        <Tabs defaultValue="collection" className="mt-8">
          <TabsList className="grid w-full grid-cols-2 max-w-[400px] mx-auto">
            <TabsTrigger value="collection">Collection ({activeWines.length})</TabsTrigger>
            <TabsTrigger value="archive">Archive ({archivedWines.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="collection" className="mt-6">
            <div className="wine-grid">
              {filteredWines(activeWines).map((wine) => (
                <WineCard 
                  key={wine.id} 
                  wine={wine} 
                  onUpdateNotes={handleUpdateNotes}
                  onMarkAsDrank={handleMarkAsDrank}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="archive" className="mt-6">
            <div className="wine-grid">
              {filteredWines(archivedWines).map((wine) => (
                <WineCard 
                  key={wine.id} 
                  wine={wine} 
                  onUpdateNotes={handleUpdateNotes}
                  onMarkAsDrank={handleMarkAsDrank}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default App;