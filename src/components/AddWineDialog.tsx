import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wine } from '@/types/wine';
import { PlusCircle } from 'lucide-react';

interface AddWineDialogProps {
  onAddWine: (wine: Omit<Wine, 'id'>) => void;
}

export function AddWineDialog({ onAddWine }: AddWineDialogProps) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const wine = {
      name: formData.get('name') as string,
      image: imageUrl,
      style: formData.get('style') as string,
      grapes: (formData.get('grapes') as string).split(',').map(g => g.trim()),
      location: formData.get('location') as string,
      vendor: formData.get('vendor') as string,
      purchaseDate: formData.get('purchaseDate') as string,
      drinkBy: formData.get('drinkBy') as string || undefined,
      price: parseInt(formData.get('price') as string, 10),
      notes: formData.get('notes') as string,
    };
    
    onAddWine(wine);
    setOpen(false);
    setImageUrl('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Add Wine
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Wine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Bottle Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Preview"
                className="w-32 h-48 object-cover rounded-md"
              />
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="name">Wine Name</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="style">Style</Label>
            <Input id="style" name="style" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="grapes">Grapes (comma-separated)</Label>
            <Input id="grapes" name="grapes" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor</Label>
            <Input id="vendor" name="vendor" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Purchase Date</Label>
            <Input id="purchaseDate" name="purchaseDate" type="date" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="drinkBy">Drink By Date</Label>
            <Input id="drinkBy" name="drinkBy" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price Range</Label>
            <Select name="price" defaultValue="2">
              <SelectTrigger>
                <SelectValue placeholder="Select price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">$ Budget</SelectItem>
                <SelectItem value="2">$$ Moderate</SelectItem>
                <SelectItem value="3">$$$ Premium</SelectItem>
                <SelectItem value="4">$$$$ Luxury</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" />
          </div>
          
          <Button type="submit" className="w-full">Add Wine</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}