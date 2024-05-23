import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash } from 'lucide-react';

interface Broker {
  brokerInfo: string;
  agencyName: string;
  partyRepresented: string;
  brokerPhoto: string;
}

interface AdditionalParty {
  type: string;
  info: string;
  instagramHandle: string;
  photo: string;
  publish: boolean;
}

interface LenderInfoProps {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (input: string, value: string | boolean) => void;
  handleBrokersChange: (brokers: Broker[]) => void;
  handleAdditionalPartiesChange: (additionalParties: AdditionalParty[]) => void;
  formData: any;
}

const LenderInfo: React.FC<LenderInfoProps> = ({ nextStep, prevStep, handleChange, handleBrokersChange, handleAdditionalPartiesChange, formData }) => {
  const [brokers, setBrokers] = useState<Broker[]>(formData.brokers);
  const [additionalParties, setAdditionalParties] = useState<AdditionalParty[]>(formData.additionalParties);

  const addBroker = () => {
    const newBrokers = [...brokers, { brokerInfo: '', agencyName: '', partyRepresented: '', brokerPhoto: '' }];
    setBrokers(newBrokers);
    handleBrokersChange(newBrokers);
  };

  const removeBroker = (index: number) => {
    const newBrokers = brokers.filter((_, i) => i !== index);
    setBrokers(newBrokers);
    handleBrokersChange(newBrokers);
  };

  const handleBrokerChange = (index: number, field: string, value: string) => {
    const updatedBrokers = brokers.map((broker, i) => (i === index ? { ...broker, [field]: value } : broker));
    setBrokers(updatedBrokers);
    handleBrokersChange(updatedBrokers);
  };

  const addAdditionalParty = () => {
    const newParties = [...additionalParties, { type: '', info: '', instagramHandle: '', photo: '', publish: false }];
    setAdditionalParties(newParties);
    handleAdditionalPartiesChange(newParties);
  };

  const removeAdditionalParty = (index: number) => {
    const newParties = additionalParties.filter((_, i) => i !== index);
    setAdditionalParties(newParties);
    handleAdditionalPartiesChange(newParties);
  };

  const handleAdditionalPartyChange = (index: number, field: string, value: string | boolean) => {
    const updatedParties = additionalParties.map((party, i) => (i === index ? { ...party, [field]: value } : party));
    setAdditionalParties(updatedParties);
    handleAdditionalPartiesChange(updatedParties);
  };

  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-8">
      <div className="mb-3">
        <h2 className="text-xl font-semibold">Parties Information</h2>
        <p className="text-sm text-gray-600">Please provide information about your deal below and verify its accuracy.</p>
      </div>

      {brokers.map((broker, index) => (
        <div key={index} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`brokerInfo-${index}`} className="font-semibold text-[#010101]">Broker Information *</Label>
              <Input
                id={`brokerInfo-${index}`}
                type="text"
                placeholder="Agent Name"
                value={broker.brokerInfo}
                onChange={(e) => handleBrokerChange(index, 'brokerInfo', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div>
              <Label htmlFor={`agencyName-${index}`} className="font-semibold text-[#010101]">Agency Name *</Label>
              <Input
                id={`agencyName-${index}`}
                type="text"
                placeholder="Agency"
                value={broker.agencyName}
                onChange={(e) => handleBrokerChange(index, 'agencyName', e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`partyRepresented-${index}`} className="font-semibold text-[#010101]">Party Represented *</Label>
              <Select onValueChange={(value) => handleBrokerChange(index, 'partyRepresented', value)} defaultValue={broker.partyRepresented}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Party" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Buyer">Buyer</SelectItem>
                  <SelectItem value="Seller">Seller</SelectItem>
                  <SelectItem value="Landlord">Landlord</SelectItem>
                  <SelectItem value="Tenant">Tenant</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor={`brokerPhoto-${index}`} className="font-semibold text-[#010101]">Upload Broker Photo</Label>
            <div className='p-5 shadow-custom rounded-md mt-2'>
              <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
                <input
                  id={`brokerPhoto-${index}`}
                  type="file"
                  onChange={(e) => handleBrokerChange(index, 'brokerPhoto', e.target.files?.[0]?.name || '')}
                  className="hidden"
                />
                <Label htmlFor={`brokerPhoto-${index}`} className="text-center text-gray-600 cursor-pointer">
                  Upload Broker Photo
                </Label>
              </div>
            </div>
          </div>

          {brokers.length > 1 && (
            <Button type="button" onClick={() => removeBroker(index)} className="mt-2 flex items-center gap-2" variant="destructive">
              <Trash className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}

      <Button type="button" onClick={addBroker} className="mt-2 flex items-center gap-2">
        <span>Add Another Broker</span>
      </Button>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">Additional Parties</h3>
        {additionalParties.map((party, index) => (
          <div key={index} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`type-${index}`} className="font-semibold text-[#010101]">Type *</Label>
                <Input
                  id={`type-${index}`}
                  type="text"
                  placeholder="Type (Lender, Title, Attorney, etc.)"
                  value={party.type}
                  onChange={(e) => handleAdditionalPartyChange(index, 'type', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>

              <div>
                <Label htmlFor={`info-${index}`} className="font-semibold text-[#010101]">Information *</Label>
                <Input
                  id={`info-${index}`}
                  type="text"
                  placeholder="Name"
                  value={party.info}
                  onChange={(e) => handleAdditionalPartyChange(index, 'info', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor={`instagramHandle-${index}`} className="font-semibold text-[#010101]">Instagram Handle *</Label>
                <Input
                  id={`instagramHandle-${index}`}
                  type="text"
                  placeholder="Ex. @solidinmiami"
                  value={party.instagramHandle}
                  onChange={(e) => handleAdditionalPartyChange(index, 'instagramHandle', e.target.value)}
                  className="mt-1 block w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor={`photo-${index}`} className="font-semibold text-[#010101]">Upload Photo</Label>
              <div className='p-5 shadow-custom rounded-md mt-2'>
                <div className="mt-1 flex items-center justify-center w-full h-[50px] border-2 border-dashed rounded-lg cursor-pointer">
                  <input
                    id={`photo-${index}`}
                    type="file"
                    onChange={(e) => handleAdditionalPartyChange(index, 'photo', e.target.files?.[0]?.name || '')}
                    className="hidden"
                  />
                  <Label htmlFor={`photo-${index}`} className="text-center text-gray-600 cursor-pointer">
                    Upload Photo
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex items-center mt-2">
              <input
                id={`publish-${index}`}
                type="checkbox"
                className="mr-2"
                checked={party.publish}
                onChange={(e) => handleAdditionalPartyChange(index, 'publish', (e.target as HTMLInputElement).checked)}
              />
              <Label htmlFor={`publish-${index}`} className="font-semibold text-[#010101]">Publish this information</Label>
            </div>

            {additionalParties.length > 1 && (
              <Button type="button" onClick={() => removeAdditionalParty(index)} className="mt-2 flex items-center gap-2" variant="destructive">
                <Trash className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" onClick={addAdditionalParty} className="mt-2 flex items-center gap-2">
        <span>Add Another Party</span>
      </Button>

    </form>
  );
};

export default LenderInfo;
