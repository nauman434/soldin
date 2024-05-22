import React from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SelectPromoProps {
  prevStep: () => void;
  handleChange: (input: string, value: string | boolean) => void;
  formData: any;
  handleSubmit: () => void;
}

const SelectPromo: React.FC<SelectPromoProps> = ({ prevStep, handleChange, formData, handleSubmit }) => {
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <form onSubmit={submitForm} className="space-y-8">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Select Your Post</h2>
        <p className="text-sm text-gray-600">Please provide information about your deal below and verify its accuracy.</p>
      </div>

      <div className="flex items-center mt-2">
        
        <input
          id="boostPost"
          type="checkbox"
          className="mr-2"
          checked={formData.boostPost}
          onChange={(e) => handleChange('boostPost', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="boostPost" className="font-semibold text-[#010101]">Boost Your Post</Label>
      </div>
      <div className="mt-1">
        <Label htmlFor="boostOption" className="sr-only">Boost Option</Label>
        <Select onValueChange={(value) => handleChange('boostOption', value)} defaultValue={formData.boostOption}>
          <SelectTrigger>
            <SelectValue placeholder="$50 Boost (your listing gets an additional 2,500 impressions)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50Boost">$50 Boost (your listing gets an additional 2,500 impressions)</SelectItem>
            {/* Add more options as needed */}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center mt-2">
      <input
          id="speedPost"
          type="checkbox"
          className="mr-2"
          checked={formData.speedPost}
          onChange={(e) => handleChange('speedPost', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="speedPost" className="font-semibold text-[#010101]">$250 Speed Post: Your Post appears in 12 hours!</Label>
      </div>

      <div className="flex items-center mt-2">
      <input
          id="igStory"
          type="checkbox"
          className="mr-2"
          checked={formData.igStory}
          onChange={(e) => handleChange('igStory', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="igStory" className="font-semibold text-[#010101]">Get featured in our IG Story (2x more views!)</Label>
      </div>
      <div className="mt-1">
        <Label htmlFor="igStoryOption" className="sr-only">IG Story Option</Label>
        <Select onValueChange={(value) => handleChange('igStoryOption', value)} defaultValue={formData.igStoryOption}>
          <SelectTrigger >
            <SelectValue placeholder="@solidinmiami – $150" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="150IGStory">@solidinmiami – $150</SelectItem>
            {/* Add more options as needed */}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" onClick={prevStep} variant="outline">Back</Button>
        <Button type="submit">Checkout</Button>
      </div>
    </form>
  );
};

export default SelectPromo;
