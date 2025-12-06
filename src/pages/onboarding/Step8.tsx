import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import config from '../../resources/config/config';

export default function OnboardingStep8() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!config.supabaseClient) return;
      
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUserId(user.id);

      // Load existing data if any
      const { data: onboardingData } = await config.supabaseClient
        .from('onboarding_data')
        .select('phone_number, phone_country_code')
        .eq('user_id', user.id)
        .single();

      if (onboardingData?.phone_number) {
        setPhoneNumber(onboardingData.phone_number);
      }
      if (onboardingData?.phone_country_code) {
        setCountryCode(onboardingData.phone_country_code);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleCountryChange = (value: string, country: any) => {
    // Only update the country code when country changes
    setCountryCode(`+${country.dialCode}`);
  };

  const handleContinue = async () => {
    if (!phoneNumber || !userId || !config.supabaseClient) return;

    setIsLoading(true);
    try {
      await config.supabaseClient
        .from('onboarding_data')
        .update({
          phone_number: phoneNumber,
          phone_country_code: countryCode,
          current_step: 8,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      navigate('/onboarding/step-9');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding/step-7');
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-28 pb-12"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[640px] w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[28px] md:text-[36px] font-[500] leading-[1.2] text-[#0B1120] mb-4">
            Enter your phone number
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#64748B]">
            We use your phone number as a backup means of contact, and will not call you with solicitations.
          </p>
        </div>

        {/* Phone Number Input - Separated Layout */}
        <div className="mb-4">
          <label className="block text-[16px] font-[500] text-[#0B1120] mb-2">
            Phone number
          </label>
          <div className="flex gap-3">
            {/* Country Code Dropdown */}
            <div style={{ width: '140px', flexShrink: 0 }}>
              <PhoneInput
                country={'us'}
                value={countryCode.replace('+', '')}
                onChange={handleCountryChange}
                enableSearch={true}
                disableCountryCode={false}
                disableDropdown={false}
                inputStyle={{
                  width: '100%',
                  height: '56px',
                  fontSize: '17px',
                  borderRadius: '12px',
                  border: '2px solid #E2E8F0',
                  color: '#0B1120',
                  paddingLeft: '58px',
                  fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif',
                  fontWeight: '500',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                }}
                buttonStyle={{
                  borderRadius: '12px 0 0 12px',
                  border: '2px solid #E2E8F0',
                  borderRight: 'none',
                  backgroundColor: 'white',
                  width: '50px',
                }}
                containerStyle={{
                  width: '100%',
                }}
                searchStyle={{
                  width: '90%',
                  margin: '10px auto',
                }}
                dropdownStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  width: '300px',
                }}
              />
            </div>
            
            {/* Phone Number Input */}
            <div style={{ flex: 1 }}>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only digits
                  if (value.length <= 10) {
                    setPhoneNumber(value);
                  }
                }}
                placeholder="(999) 999-9999"
                className="w-full h-[56px] rounded-[12px] border-2 border-[#E2E8F0] px-4 text-[17px] text-[#0B1120] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#00A9E0] focus:ring-2 focus:ring-[rgba(0,169,224,0.12)] transition-all"
                style={{
                  fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif',
                }}
              />
            </div>
          </div>
        </div>

        {/* Disclaimer Text */}
        <p className="text-[14px] leading-[1.6] text-[#64748B] mb-8">
          Hushh uses your phone number for sending verification codes to secure your account. You may disable this in settings. Standard rates apply.
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!phoneNumber || phoneNumber.length < 10 || isLoading}
          className={`w-full h-[56px] rounded-[16px] text-[17px] font-[500] tracking-[0.01em] mb-4 transition-all duration-200 ${
            phoneNumber && phoneNumber.length >= 10 && !isLoading
              ? 'text-[#0B1120] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              : 'text-[#94A3B8] cursor-not-allowed'
          }`}
          style={{
            background: phoneNumber && phoneNumber.length >= 10 && !isLoading
              ? 'linear-gradient(to right, #00A9E0, #6DD3EF)'
              : '#E2E8F0'
          }}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="w-full text-[17px] font-[500] text-[#8B4513] hover:text-[#6B3410] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
