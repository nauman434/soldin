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
  updateTotalFee: (fee: number, title: string) => void;
}

const DealInfo: React.FC<DealInfoProps> = ({ nextStep, prevStep, handleChange, formData, updateTotalFee }) => {
  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleNumberChange = (input: string, value: string) => {
    const rawValue = value.replace(/,/g, '');
    if (!isNaN(Number(rawValue))) {
      handleChange(input, formatNumber(rawValue));
      if (input === 'salePrice') {
        calculateFee(Number(rawValue));
      }
    }
  };

  const calculateFee = (salePrice: number) => {
    let fee = 0;
    let title = 'Sale Price Fee';
    if (salePrice < 1000000) {
      fee = 300;
    } else if (salePrice >= 1000000 && salePrice < 2500000) {
      fee = 220;
    } else if (salePrice >= 2500000 && salePrice < 25000000) {
      fee = 100;
    }
    updateTotalFee(fee, title);
  };

  const getFeeDescription = (salePrice: number) => {
    if (salePrice < 1000000) {
      return 'Below $1M - Fee: $300';
    } else if (salePrice >= 1000000 && salePrice < 2500000) {
      return 'Below $2.5M - Fee: $220';
    } else if (salePrice >= 2500000 && salePrice < 25000000) {
      return 'Below $25M - Fee: $100';
    }
    return '';
  };

  const calculatePSF = () => {
    const salePrice = Number(formData.salePrice.replace(/,/g, ''));
    const propertySqFt = Number(formData.propertySqFt.replace(/,/g, ''));
    if (!isNaN(salePrice) && !isNaN(propertySqFt) && propertySqFt > 0) {
      return (salePrice / propertySqFt).toFixed(2);
    }
    return '';
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
              {assetTypes.map((asset) => (
                <SelectItem key={asset.id} value={asset.value}>{asset.name}</SelectItem>
              ))}
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
              <SelectItem value="loan">Loan</SelectItem>
              <SelectItem value="lease">Lease</SelectItem>
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
            onChange={(e) => handleNumberChange('salePrice', e.target.value)}
            className="mt-1 block w-full"
          />
          <div className="mt-1 text-sm text-gray-600 flex items-center">
            {formData.salePrice && (
              <>
                <input type="radio" checked readOnly className="mr-2" />
                <span>{getFeeDescription(Number(formData.salePrice.replace(/,/g, '')))}</span>
              </>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="askingPrice" className="font-semibold text-[#010101]">Asking Price</Label>
          <Input
            id="askingPrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.askingPrice}
            onChange={(e) => handleNumberChange('askingPrice', e.target.value)}
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
            onChange={(e) => handleNumberChange('propertySqFt', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="psf" className="font-semibold text-[#010101]">PSF (Price per Square Foot)</Label>
          <Input
            id="psf"
            type="text"
            placeholder="Calculated PSF"
            value={calculatePSF()}
            readOnly
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="originalPrice" className="font-semibold text-[#010101]">Original Price</Label>
          <Input
            id="originalPrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.originalPrice}
            onChange={(e) => handleNumberChange('originalPrice', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="lastAskingPrice" className="font-semibold text-[#010101]">Last Asking Price</Label>
          <Input
            id="lastAskingPrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.lastAskingPrice}
            onChange={(e) => handleNumberChange('lastAskingPrice', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="soldPrice" className="font-semibold text-[#010101]">Sold Price (if it’s sold)</Label>
          <Input
            id="soldPrice"
            type="text"
            placeholder="Ex. $10,000,000"
            value={formData.soldPrice}
            onChange={(e) => handleNumberChange('soldPrice', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div>
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
    </form>
  );
};

export default DealInfo;
