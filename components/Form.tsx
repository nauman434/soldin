'use client'

import React, { useState } from 'react';
import BasicInfo from '@/components/BasicInfo';
import DealInfo from '@/components/DealInfo';
import LenderInfo from '@/components/LenderInfo';
import SelectPromo from '@/components/SelectPromo';

const Form: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    assetType: '',
    saleType: '',
    closingDate: '',
    market: '',
    salePrice: '',
    askingPrice: '',
    propertySqFt: '',
    units: '',
    propertyPhoto: '',
    brokerInfo: '',
    agencyName: '',
    noBroker: false,
    brokerPhoto: '',
    lenderInfo: '',
    instagramHandle: '',
    hideLenderInfo: false,
    lenderPhoto: '',
    landlordInfo: '',
    landlordInstagramHandle: '',
    hideLandlordInfo: false,
    landlordPhoto: '',
    boostPost: false,
    boostOption: '',
    speedPost: false,
    igStory: false,
    igStoryOption: '',
    dealDetails: '',
    lenderDetails: '',
    promoCode: '',
  });

  const formParts = [
    { id: 1, name: 'Basic info' },
    { id: 2, name: 'Deal Info' },
    { id: 3, name: 'Lender Info' },
    { id: 4, name: 'Select Promo' }
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input: string, value: string | boolean) => {
    setFormData({ ...formData, [input]: value });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between gap-4">
        {formParts.map(part => (
          <div
            key={part.id}
            className={`w-[149px] border-b-4 ${part.id === step ? 'border-b-black font-semibold' : 'text-gray-400'} pb-2`}
          >
            {part.name}
          </div>
        ))}
      </div>

      {/* Step Information */}
      <div className='flex flex-col gap-2 mt-6'>
        <h4 className='font-bold text-xl'>{formParts.find(part => part.id === step)?.name} Information</h4>
        <p>Please provide information about your deal below and verify its accuracy.</p>
      </div>

      {step === 1 && <BasicInfo nextStep={nextStep} handleChange={handleChange} formData={formData} />}
      {step === 2 && <DealInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
      {step === 3 && <LenderInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
      {step === 4 && <SelectPromo handleSubmit={handleSubmit} prevStep={prevStep} handleChange={handleChange} formData={formData} />}
    </div>
  );
};

export default Form;
