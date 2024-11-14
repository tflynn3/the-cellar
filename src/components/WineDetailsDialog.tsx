import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Wine } from '@/types/wine';
import { MapPin, Store, Calendar, GrapeIcon, Save, Timer, DollarSign, Wine as WineIcon, Star, StarOff } from 'lucide-react';
import { useState } from 'react';
import { DrinkWineDialog } from './DrinkWineDialog';

interface WineDetailsDialogProps {
  wine: Wine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onMarkAsDrank: (id: string, rating: Wine['consumed']) => void;
}

export function WineDetailsDialog({
  wine,
  open,
  onOpenChange,
  onUpdateNotes,
  onMarkAsDrank,
}: WineDetailsDialogProps) {
  const [notes, setNotes] = useState(wine.notes || '');
  const [drinkDialogOpen, setDrinkDialogOpen] = useState(false);

  const handleSaveNotes = () => {
    onUpdateNotes(wine.id, notes);
    onOpenChange(false);
  };

  const renderPriceIndicator = (price: number) => {
    return Array(price)
      .fill(0)
      .map((_, i) => (
        <DollarSign key={i} className="w-5 h-5 inline-block text-primary" />
      ));
  };

  const renderRating = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        i < rating ? 
          <Star key={i} className="w-4 h-4 fill-primary text-primary" /> :
          <StarOff key={i} className="w-4 h-4 text-muted-foreground" />
      ));
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{wine.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={wine.image}
                alt={wine.name}
                className="object-cover w-full h-full"
              />
              {wine.consumed && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white p-4">
                  <Badge variant="secondary" className="mb-4">Archived</Badge>
                  <div className="flex mb-2">{renderRating(wine.consumed.rating)}</div>
                  <p className="text-center mb-2">
                    Enjoyed on {new Date(wine.consumed.dateDrank).toLocaleDateString()}
                  </p>
                  <Badge variant={wine.consumed.wouldBuyAgain ? "default" : "secondary"}>
                    {wine.consumed.wouldBuyAgain ? "Would buy again" : "One time experience"}
                  </Badge>
                  {wine.consumed.foodPairings && wine.consumed.foodPairings.length > 0 && (
                    <div className="mt-4 text-center">
                      <p className="text-sm font-semibold mb-1">Paired well with:</p>
                      <p className="text-sm">{wine.consumed.foodPairings.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="text-lg" variant="secondary">{wine.style}</Badge>
                  <span className="font-mono">{renderPriceIndicator(wine.price)}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-base">
                    <GrapeIcon className="w-5 h-5" />
                    <span>{wine.grapes.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <MapPin className="w-5 h-5" />
                    <span>{wine.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Store className="w-5 h-5" />
                    <span>{wine.vendor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(wine.purchaseDate).toLocaleDateString()}</span>
                  </div>
                  {wine.drinkBy && (
                    <div className="flex items-center gap-2 text-base">
                      <Timer className="w-5 h-5" />
                      <span>Drink by {new Date(wine.drinkBy).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Notes</h3>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[150px]"
                  placeholder="Add your tasting notes, memories, or thoughts about this wine..."
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveNotes} className="flex-1 gap-2">
                    <Save className="w-4 h-4" />
                    Save Notes
                  </Button>
                  {!wine.consumed && (
                    <Button 
                      variant="secondary" 
                      className="flex-1 gap-2"
                      onClick={() => setDrinkDialogOpen(true)}
                    >
                      <WineIcon className="w-4 h-4" />
                      I Drank This
                    </Button>
                  )}
                </div>
              </div>

              {wine.consumed?.experience && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Experience Notes</h3>
                  <p className="text-muted-foreground">{wine.consumed.experience}</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DrinkWineDialog
        open={drinkDialogOpen}
        onOpenChange={setDrinkDialogOpen}
        onSubmit={(rating) => {
          onMarkAsDrank(wine.id, rating);
          setDrinkDialogOpen(false);
          onOpenChange(false);
        }}
      />
    </>
  );
}