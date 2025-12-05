import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';
import type { AccountStructure } from '../../types/onboarding';

export default function OnboardingStep7() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<AccountStructure | null>(null);
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
        .select('account_structure')
        .eq('user_id', user.id)
        .single();

      if (onboardingData?.account_structure) {
        setSelectedStructure(onboardingData.account_structure as AccountStructure);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleContinue = async () => {
    if (!selectedStructure || !userId || !config.supabaseClient) return;

    setIsLoading(true);
    try {
      await config.supabaseClient
        .from('onboarding_data')
        .update({
          account_structure: selectedStructure,
          current_step: 7,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      navigate('/onboarding/step-8');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-28 pb-12"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[640px] w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[40px] font-[500] leading-[1.2] text-[#0B1120]">
            What type of general account would you like to open?
          </h1>
        </div>

        {/* Account Options */}
        <div className="mb-8 border-2 border-[#E2E8F0] rounded-[16px] overflow-hidden">
          <button
            onClick={() => setSelectedStructure('individual')}
            className="w-full flex items-center justify-between p-6 hover:bg-[#F8FAFC] transition-colors border-b border-[#E2E8F0] last:border-b-0"
          >
            <span className="text-[18px] text-[#0B1120]">Individual account</span>
            <div 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedStructure === 'individual'
                  ? 'border-[#0B1120] bg-[#0B1120]'
                  : 'border-[#CBD5E1] bg-white'
              }`}
            >
              {selectedStructure === 'individual' && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </button>

          <button
            onClick={() => setSelectedStructure('other')}
            className="w-full flex items-center justify-between p-6 hover:bg-[#F8FAFC] transition-colors"
          >
            <span className="text-[18px] text-[#0B1120]">Other account type</span>
            <div 
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedStructure === 'other'
                  ? 'border-[#0B1120] bg-[#0B1120]'
                  : 'border-[#CBD5E1] bg-white'
              }`}
            >
              {selectedStructure === 'other' && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedStructure || isLoading}
          className={`w-full h-[56px] rounded-[16px] text-[17px] font-[500] tracking-[0.01em] transition-all duration-200 ${
            selectedStructure && !isLoading
              ? 'text-[#0B1120] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              : 'text-[#94A3B8] cursor-not-allowed'
          }`}
          style={{
            background: selectedStructure && !isLoading
              ? 'linear-gradient(to right, #00A9E0, #6DD3EF)'
              : '#E2E8F0'
          }}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
