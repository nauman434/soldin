import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities, states } from '@/constants';
import { Label } from './ui/label';
import { Button } from './ui/button';

interface BasicInfoProps {
  nextStep: () => void;
  handleChange: (input: string, value: string) => void;
  formData: any;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ nextStep, handleChange, formData }) => {
  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-8 ">

      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="font-semibold text-[#010101]">First name</Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Jane"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <Label className="font-semibold text-[#010101]">Last name</Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <Label className="font-semibold text-[#010101]">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Ex. hey@soldin.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <Label className="font-semibold text-[#010101]">Property address</Label>
        <Input
          id="address1"
          type="text"
          placeholder="Address Line 1"
          value={formData.address1}
          onChange={(e) => handleChange('address1', e.target.value)}
          className="w-full"
        />
        <Input
          id="address2"
          type="text"
          placeholder="Address Line 2"
          value={formData.address2}
          onChange={(e) => handleChange('address2', e.target.value)}
          className="mt-1 block w-full"
        />
      </div>

      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-5">
          <Select onValueChange={(value) => handleChange('city', value)} defaultValue={formData.city}>
            <SelectTrigger >
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.value} value={city.value}>{city.city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-5">
          <Select onValueChange={(value) => handleChange('state', value)} defaultValue={formData.state}>
            <SelectTrigger >
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value}>{state.state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">

          <Input
            id="postalCode"
            type="text"
            placeholder="Post Code"
            value={formData.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            
          />
        </div>
      </div>

      <Button type="submit" className="w-full">Next</Button>
    </form>
  );
};

export default BasicInfo;
