import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WineRating } from '@/types/wine';
import { Star, StarOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface DrinkWineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (rating: WineRating) => void;
}

export function DrinkWineDialog({ open, onOpenChange, onSubmit }: DrinkWineDialogProps) {
  const [rating, setRating] = useState(0);
  const [wouldBuyAgain, setWouldBuyAgain] = useState(true);
  const [foodPairings, setFoodPairings] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      dateDrank: new Date().toISOString(),
      wouldBuyAgain,
      foodPairings: foodPairings.split(',').map(p => p.trim()).filter(Boolean),
      experience: experience.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Archive This Wine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Rating</Label>
            <div className="flex gap-1">
              {Array(5).fill(0).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="hover:scale-110 transition-transform"
                  onClick={() => setRating(i + 1)}
                >
                  {i < rating ? (
                    <Star className="w-8 h-8 fill-primary text-primary" />
                  ) : (
                    <StarOff className="w-8 h-8 text-muted-foreground" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="buyAgain">Would buy again</Label>
            <Switch
              id="buyAgain"
              checked={wouldBuyAgain}
              onCheckedChange={setWouldBuyAgain}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pairings">Food Pairings (comma-separated)</Label>
            <Input
              id="pairings"
              value={foodPairings}
              onChange={(e) => setFoodPairings(e.target.value)}
              placeholder="e.g., Grilled steak, Blue cheese, Dark chocolate"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Notes</Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Share your experience with this wine..."
            />
          </div>

          <Button type="submit" className="w-full">Archive Wine</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}