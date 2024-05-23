import React, { useState } from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { cities, states } from '@/constants';
import { Label } from './ui/label';

interface BasicInfoProps {
  nextStep: () => void;
  handleChange: (input: string, value: string | boolean, index?: number) => void;
  formData: any;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ nextStep, handleChange, formData }) => {
  const [hideAddress, setHideAddress] = useState(formData.hideAddress || false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setHideAddress(isChecked);
    handleChange('hideAddress', isChecked); // Update formData with hideAddress value
  };

  const continueStep = (e: React.FormEvent) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <form onSubmit={continueStep} className="space-y-8">
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

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label className="font-semibold text-[#010101]">Property address</Label>
          <input
            id={`hideAddress`}
            type='checkbox'
            checked={hideAddress}
            onChange={handleCheckboxChange}
            className="ml-3"
          />
          <Label htmlFor={`hideAddress`} className="text-gray-600">Hide address</Label>
        </div>

        <Input
          id={`address1`}
          type="text"
          placeholder="Address Line 1"
          value={formData.addresses[0].address1}
          onChange={(e) => handleChange('address1', e.target.value, 0)}
          className="w-full"
        />
        <Input
          id={`address2`}
          type="text"
          placeholder="Address Line 2 (Optional)"
          value={formData.addresses[0].address2}
          onChange={(e) => handleChange('address2', e.target.value, 0)}
          className="mt-3 block w-full"
        />
        <div className="grid grid-cols-12 gap-2 mt-3">
          <div className="col-span-5">
            <Select onValueChange={(value) => handleChange('city', value, 0)} defaultValue={formData.addresses[0].city}>
              <SelectTrigger>
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
            <Select onValueChange={(value) => handleChange('state', value, 0)} defaultValue={formData.addresses[0].state}>
              <SelectTrigger>
                <SelectValue placeholder="Select State" />
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
              id={`postalCode`}
              type="text"
              placeholder="Postal Code"
              value={formData.addresses[0].postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value, 0)}
            />
          </div>
        </div>

        {hideAddress && (
          <div className="mt-4">
            <p className="font-bold text-gray-600">Fee: $200</p>
            <p className="text-sm text-gray-600">
              If you would like to hide the address, you can pay to hide it in the caption, although we still need the address internally.
              We will use the picture of the property we find unless you attach a picture of the property.
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default BasicInfo;
