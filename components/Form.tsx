'use client';

import React, { useState, useEffect } from 'react';
import BasicInfo from '@/components/BasicInfo';
import DealInfo from '@/components/DealInfo';
import LenderInfo from '@/components/LenderInfo';
import SelectPromo from '@/components/SelectPromo';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PriceDetail {
  title: string;
  price: number;
}

const Form: React.FC = () => {
  const [step, setStep] = useState(1);
  const [totalFee, setTotalFee] = useState(0); // State to track total fee
  const [priceDetails, setPriceDetails] = useState<PriceDetail[]>([]); // State to track price details
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    addresses: [
      {
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
      },
    ],
    hideAddress: false,
    assetType: '',
    saleType: '',
    closingDate: '',
    market: '',
    salePrice: '',
    askingPrice: '',
    originalPrice: '',
    lastAskingPrice: '',
    soldPrice: '',
    propertySqFt: '',
    units: '',
    propertyPhoto: '',
    brokers: [{ brokerInfo: '', agencyName: '', partyRepresented: '', brokerPhoto: '' }],
    additionalParties: [{ type: '', info: '', instagramHandle: '', photo: '', publish: false }],
    noBroker: false,
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
    { id: 3, name: 'Parties Info' },
    { id: 4, name: 'Select Promo' }
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (input: string, value: string | boolean, index?: number) => {
    if (index !== undefined) {
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index] = {
        ...updatedAddresses[index],
        [input]: value,
      };
      setFormData({ ...formData, addresses: updatedAddresses });
    } else {
      setFormData({ ...formData, [input]: value });
    }
  };

  const handleBrokersChange = (brokers: { brokerInfo: string; agencyName: string; partyRepresented: string; brokerPhoto: string; }[]) => {
    setFormData({ ...formData, brokers });
  };

  const handleAdditionalPartiesChange = (additionalParties: { type: string; info: string; instagramHandle: string; photo: string; publish: boolean; }[]) => {
    setFormData({ ...formData, additionalParties });
  };

  const handleSubmit = () => {
    console.log('Form Data:', formData);
    // Perform any additional form submission logic here (e.g., API calls)
  };

  const updateTotalFee = (fee: number, title: string) => {
    const existingDetailIndex = priceDetails.findIndex(detail => detail.title === title);
    let newPriceDetails = [...priceDetails];

    if (existingDetailIndex !== -1) {
      newPriceDetails[existingDetailIndex] = { title, price: fee };
    } else {
      newPriceDetails.push({ title, price: fee });
    }

    setPriceDetails(newPriceDetails);

    const newTotalFee = newPriceDetails.reduce((total, detail) => total + detail.price, 0);
    setTotalFee(newTotalFee);
  };

  useEffect(() => {
    let fee = 0;
    const newPriceDetails: PriceDetail[] = [];

    if (formData.hideAddress) {
      fee += 200;
      newPriceDetails.push({ title: 'Hide Address', price: 200 });
    }

    // Calculate other fees based on formData

    setTotalFee(fee);
    setPriceDetails(newPriceDetails);
  }, [formData.hideAddress]); // Note the dependency on formData.hideAddress

  return (
    <div className="relative space-y-8">
      <div className="flex justify-between lg:gap-4 gap-2">
        {formParts.map(part => (
          <div
            key={part.id}
            className={`lg:text-[16px] text-[12px] w-[149px] border-b-4 ${part.id === step ? 'border-b-black font-semibold' : 'text-gray-400'} pb-2`}
          >
            {part.name}
          </div>
        ))}
      </div>

      {step === 1 && <BasicInfo nextStep={nextStep} handleChange={handleChange} formData={formData} />}
      {step === 2 && <DealInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} updateTotalFee={updateTotalFee} />}
      {step === 3 && <LenderInfo nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} formData={formData} handleBrokersChange={handleBrokersChange} handleAdditionalPartiesChange={handleAdditionalPartiesChange} />}
      {step === 4 && <SelectPromo handleSubmit={handleSubmit} prevStep={prevStep} handleChange={handleChange} formData={formData} />}

      <div className='flex justify-between gap-4 items-center bg-gray-100 p-5 rounded-lg'>
        <Sheet>
          <SheetTrigger>
            <Button type="button" variant={'default'}>See Your Pricing</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Price Details</SheetTitle>
              <SheetDescription>
                <ul className='mt-8'>
                  {priceDetails.map((detail, index) => (
                    <li key={index} className="flex justify-between mb-2">
                      <span>{detail.title}</span>
                      <span>${detail.price}</span>
                    </li>
                  ))}
                </ul>
                <div className='mt-4 pt-4 border-t flex justify-between items-center'>
                  <span className='font-bold text-primary'>Total</span>
                  <span className='text-xl font-bold'>${totalFee}</span>
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <div className="">
          <p className="font-bold">Your Total – ${totalFee}</p>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        {step > 1 && <Button type="button" onClick={prevStep} className="w-full mr-2" variant={'outline'}>Back</Button>}
        {step < 4 && <Button type="button" onClick={nextStep} className="w-full">Continue</Button>}
        {step === 4 && <Button type="button" onClick={handleSubmit} className="w-full ml-2">Checkout</Button>}
      </div>
    </div>
  );
};

export default Form;
