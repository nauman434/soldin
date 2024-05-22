import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface LenderInfoProps {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: string, value: string | boolean) => void;
  formData: any;
}

const LenderInfo: React.FC<LenderInfoProps> = ({ nextStep, prevStep, handleChange, formData }) => {
  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-8">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Lender Information</h2>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="brokerInfo" className="font-semibold text-[#010101]">Broker Information *</Label>
          <Input
            id="brokerInfo"
            type="text"
            placeholder="Agent Name"
            value={formData.brokerInfo}
            onChange={(e) => handleChange('brokerInfo', e.target.value)}
            className="mt-1 block w-full"
            disabled={formData.noBroker}
          />
        </div>

        <div>
          <Label htmlFor="agencyName" className="font-semibold text-[#010101]">Agency Name *</Label>
          <Input
            id="agencyName"
            type="text"
            placeholder="Agency"
            value={formData.agencyName}
            onChange={(e) => handleChange('agencyName', e.target.value)}
            className="mt-1 block w-full"
            disabled={formData.noBroker}
          />
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input
          id="noBroker"
          type="checkbox"
          className="mr-2"
          checked={formData.noBroker}
          onChange={(e) => handleChange('noBroker', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="noBroker" className="font-semibold text-[#010101]">No brokers were involved</Label>
      </div>

      <div>
        <Label htmlFor="brokerPhoto" className="font-semibold text-[#010101]">Upload Broker Photo</Label>
        <div className='p-5 shadow-custom rounded-md mt-2'>
          <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
            <input
              id="brokerPhoto"
              type="file"
              onChange={(e) => handleChange('brokerPhoto', e.target.files?.[0]?.name || '')}
              className="hidden"
              disabled={formData.noBroker}
            />
            <Label htmlFor="brokerPhoto" className="text-center text-gray-600 cursor-pointer">
              Upload Broker Photo
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="lenderInfo" className="font-semibold text-[#010101]">Lender Information *</Label>
          <Input
            id="lenderInfo"
            type="text"
            placeholder="Ex. Chase Bank"
            value={formData.lenderInfo}
            onChange={(e) => handleChange('lenderInfo', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="instagramHandle" className="font-semibold text-[#010101]">Instagram Handle *</Label>
          <Input
            id="instagramHandle"
            type="text"
            placeholder="Ex. @solidinmiami"
            value={formData.instagramHandle}
            onChange={(e) => handleChange('instagramHandle', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input
          id="hideLenderInfo"
          type="checkbox"
          className="mr-2"
          checked={formData.hideLenderInfo}
          onChange={(e) => handleChange('hideLenderInfo', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="hideLenderInfo" className="font-semibold text-[#010101]">Hide Lender Information/All Cash Deal</Label>
      </div>

      <div>
        <Label htmlFor="lenderPhoto" className="font-semibold text-[#010101]">Upload Lender(s) Photo</Label>
        <div className='p-5 shadow-custom rounded-md mt-2'>
          <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
            <input
              id="lenderPhoto"
              type="file"
              onChange={(e) => handleChange('lenderPhoto', e.target.files?.[0]?.name || '')}
              className="hidden"
            />
            <Label htmlFor="lenderPhoto" className="text-center text-gray-600 cursor-pointer">
              Upload Lender(s) Photo
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="landlordInfo" className="font-semibold text-[#010101]">Landlord Information *</Label>
          <Input
            id="landlordInfo"
            type="text"
            placeholder="Ex. Jane Doe"
            value={formData.landlordInfo}
            onChange={(e) => handleChange('landlordInfo', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>

        <div>
          <Label htmlFor="landlordInstagramHandle" className="font-semibold text-[#010101]">Instagram Handle *</Label>
          <Input
            id="landlordInstagramHandle"
            type="text"
            placeholder="Ex. @solidinmiami"
            value={formData.landlordInstagramHandle}
            onChange={(e) => handleChange('landlordInstagramHandle', e.target.value)}
            className="mt-1 block w-full"
          />
        </div>
      </div>

      <div className="flex items-center mt-2">
        <input
          id="hideLandlordInfo"
          type="checkbox"
          className="mr-2"
          checked={formData.hideLandlordInfo}
          onChange={(e) => handleChange('hideLandlordInfo', (e.target as HTMLInputElement).checked)}
        />
        <Label htmlFor="hideLandlordInfo" className="font-semibold text-[#010101]">Hide Landlord Information</Label>
      </div>

      <div>
        <Label htmlFor="landlordPhoto" className="font-semibold text-[#010101]">Upload Landlord(s) Photo</Label>
        <div className='p-5 shadow-custom rounded-md mt-2'>
          <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
            <input
              id="landlordPhoto"
              type="file"
              onChange={(e) => handleChange('landlordPhoto', e.target.files?.[0]?.name || '')}
              className="hidden"
            />
            <Label htmlFor="landlordPhoto" className="text-center text-gray-600 cursor-pointer">
              Upload Landlord(s) Photo
            </Label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button type="button" onClick={prevStep} variant="outline">Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
};

export default LenderInfo;
