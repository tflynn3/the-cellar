import { useState } from 'react';
import { Wine } from '@/types/wine';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Store, Calendar, GrapeIcon, Timer, DollarSign, Star } from 'lucide-react';
import { WineDetailsDialog } from './WineDetailsDialog';

interface WineCardProps {
  wine: Wine;
  onUpdateNotes: (id: string, notes: string) => void;
  onMarkAsDrank: (id: string, rating: Wine['consumed']) => void;
}

export function WineCard({ wine, onUpdateNotes, onMarkAsDrank }: WineCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const renderPriceIndicator = (price: number) => {
    return Array(price)
      .fill(0)
      .map((_, i) => (
        <DollarSign key={i} className="w-4 h-4 inline-block text-primary" />
      ));
  };

  return (
    <>
      <Card 
        className="wine-card overflow-hidden cursor-pointer relative"
        onClick={() => setDialogOpen(true)}
      >
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={wine.image}
            alt={wine.name}
            className={`object-cover w-full h-full hover:scale-105 transition-transform duration-300 ${
              wine.consumed ? 'opacity-75' : ''
            }`}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="font-mono">
              {renderPriceIndicator(wine.price)}
            </Badge>
          </div>
          {wine.consumed && (
            <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 justify-center">
              <Badge className="gap-1">
                <Star className="w-4 h-4 fill-current" />
                {wine.consumed.rating}/5
              </Badge>
            </div>
          )}
        </div>
        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-xl leading-none">{wine.name}</h3>
            <Badge variant="secondary">{wine.style}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <GrapeIcon className="w-4 h-4" />
            <span>{wine.grapes.join(', ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{wine.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Store className="w-4 h-4" />
            <span>{wine.vendor}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(wine.purchaseDate).toLocaleDateString()}</span>
          </div>
          {wine.drinkBy && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Timer className="w-4 h-4" />
              <span>Drink by {new Date(wine.drinkBy).toLocaleDateString()}</span>
            </div>
          )}
          {wine.notes && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {wine.notes}
            </p>
          )}
        </CardContent>
      </Card>

      <WineDetailsDialog
        wine={wine}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onUpdateNotes={onUpdateNotes}
        onMarkAsDrank={onMarkAsDrank}
      />
    </>
  );
}