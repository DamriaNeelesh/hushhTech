import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';
import type { AccountType } from '../../types/onboarding';

export default function OnboardingStep1() {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState<AccountType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      if (!config.supabaseClient) return;
      
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUserId(user.id);

      // Check if user already has onboarding data
      const { data: onboardingData } = await config.supabaseClient
        .from('onboarding_data')
        .select('account_type, current_step')
        .eq('user_id', user.id)
        .single();

      if (onboardingData?.account_type) {
        setSelectedAccount(onboardingData.account_type as AccountType);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleContinue = async () => {
    if (!selectedAccount || !userId || !config.supabaseClient) return;

    setIsLoading(true);
    try {
      // Save to Supabase
      const { error } = await config.supabaseClient
        .from('onboarding_data')
        .upsert({
          user_id: userId,
          account_type: selectedAccount,
          current_step: 1,
          completed_steps: [1],
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error saving onboarding data:', error);
        return;
      }

      // Navigate to step 2
      navigate('/onboarding/step-2');
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
          <h1 className="text-[40px] font-[500] leading-[1.2] text-[#0B1120] mb-4">
            What account would you like to open?
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#64748B]">
            Start creating an account that meets your goals. You can add another later.
          </p>
        </div>

        {/* Account Options */}
        <div className="space-y-4 mb-8">
          {/* General Account */}
          <button
            onClick={() => setSelectedAccount('general')}
            className={`w-full text-left p-6 rounded-[16px] border-2 transition-all duration-200 ${
              selectedAccount === 'general'
                ? 'border-[#00A9E0] bg-[#F0F9FF]'
                : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="text-[14px] text-[#64748B] mb-2">$1 million minimum</div>
                <h3 className="text-[20px] font-[500] text-[#0B1120] mb-2">
                  General investing account
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#64748B]">
                  A flexible investing account created to help you build long-term wealth.
                </p>
              </div>
              <div className="flex-shrink-0 mt-2">
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAccount === 'general'
                      ? 'border-[#00A9E0] bg-[#00A9E0]'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {selectedAccount === 'general' && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          </button>

          {/* Retirement Account */}
          <button
            onClick={() => setSelectedAccount('retirement')}
            className={`w-full text-left p-6 rounded-[16px] border-2 transition-all duration-200 ${
              selectedAccount === 'retirement'
                ? 'border-[#00A9E0] bg-[#F0F9FF]'
                : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="text-[14px] text-[#64748B] mb-2">$5 million minimum</div>
                <h3 className="text-[20px] font-[500] text-[#0B1120] mb-2">
                  Retirement account
                </h3>
                <p className="text-[16px] leading-[1.5] text-[#64748B]">
                  Transfer, rollover, or start a new IRA with tax benefits for your retirement.
                </p>
              </div>
              <div className="flex-shrink-0 mt-2">
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedAccount === 'retirement'
                      ? 'border-[#00A9E0] bg-[#00A9E0]'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {selectedAccount === 'retirement' && (
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedAccount || isLoading}
          className={`w-full h-[56px] rounded-[16px] text-[17px] font-[500] tracking-[0.01em] transition-all duration-200 ${
            selectedAccount && !isLoading
              ? 'text-[#0B1120] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              : 'text-[#94A3B8] cursor-not-allowed'
          }`}
          style={{
            background: selectedAccount && !isLoading
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
