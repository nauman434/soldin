import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Label } from './ui/label';
import { assetTypes } from '@/constants';
import { Button } from './ui/button';

interface DealInfoProps {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: string, value: string) => void;
  formData: any;
}

const DealInfo: React.FC<DealInfoProps> = ({ nextStep, prevStep, handleChange, formData }) => {
  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-8">


      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="assetType" className="font-semibold text-[#010101]">Asset Type *</Label>
          <Select onValueChange={(value) => handleChange('assetType', value)} defaultValue={formData.assetType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Asset Type" />
            </SelectTrigger>
            <SelectContent>
              {/* Add asset types */}
              {assetTypes.map((asset) => (
                <SelectItem key={asset.id} value={asset.value}>{asset.name}</SelectItem>
              ))}
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="saleType" className="font-semibold text-[#010101]">Sale Type *</Label>
          <Select onValueChange={(value) => handleChange('saleType', value)} defaultValue={formData.saleType}>
            <SelectTrigger>
              <SelectValue placeholder="Select Sale Type" />
            </SelectTrigger>
            <SelectContent>
              {/* Add sale types */}
              <SelectItem value="loan">Loan</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
              {/* Add more options as needed */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="closingDate" className="font-semibold text-[#010101]">Closing Date *</Label>
          <Input
            id="closingDate"
            type="date"
            placeholder="mm/dd/yyyy"
            value={formData.closingDate}
            onChange={(e) => handleChange('closingDate', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="market" className="font-semibold text-[#010101]">Market *</Label>
          <Input
            id="market"
            type="text"
            placeholder="Ex. Brickell, Miami"
            value={formData.market}
            onChange={(e) => handleChange('market', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="salePrice" className="font-semibold text-[#010101]">Sale Price *</Label>
          <Input
            id="salePrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.salePrice}
            onChange={(e) => handleChange('salePrice', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="askingPrice" className="font-semibold text-[#010101]">Asking Price</Label>
          <Input
            id="askingPrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.askingPrice}
            onChange={(e) => handleChange('askingPrice', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="propertySqFt" className="font-semibold text-[#010101]">Property Square Feet</Label>
          <Input
            id="propertySqFt"
            type="text"
            placeholder="Ex. 16,000"
            value={formData.propertySqFt}
            onChange={(e) => handleChange('propertySqFt', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="units" className="font-semibold text-[#010101]">Units</Label>
          <Input
            id="units"
            type="text"
            placeholder="Ex. 40"
            value={formData.units}
            onChange={(e) => handleChange('units', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div >
        <Label htmlFor="propertyPhoto" className="font-semibold text-[#010101]">Upload Property Photo</Label>
        <div className='p-5 shadow-custom rounded-md mt-2'>
          <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
            <input
              id="propertyPhoto"
              type="file"
              onChange={(e) => handleChange('propertyPhoto', e.target.files?.[0]?.name || '')}
              className="hidden"
            />
            <Label htmlFor="propertyPhoto" className="text-center text-gray-600 cursor-pointer">
              Upload Property Photo
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" onClick={prevStep} variant={'outline'} >Back</Button>
        <Button type="submit" >Continue</Button>
      </div>
    </form>
  );
};

export default DealInfo;
