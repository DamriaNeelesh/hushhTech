import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

export default function OnboardingStep3() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (!config.supabaseClient) return;
      
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }
      setUserId(user.id);
    };

    getCurrentUser();
  }, [navigate]);

  const handleFundSelect = async () => {
    if (!userId || !config.supabaseClient) return;

    try {
      // Save selected fund to database
      await config.supabaseClient
        .from('onboarding_data')
        .update({
          selected_fund: 'Fund A',
          current_step: 3,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      // Navigate to step 4
      navigate('/onboarding/step-4');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBack = () => {
    navigate('/onboarding/step-2');
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-28 pb-12"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[640px] w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[40px] font-[700] leading-[1.2] text-[#0B1120] mb-4">
            Please make your selection
          </h1>
          <p className="text-[18px] leading-[1.6] text-[#64748B]">
            Find an option that best suits your needs. You can change this later at any time.
          </p>
        </div>

        {/* Fund Card */}
        <button
          onClick={handleFundSelect}
          className="w-full p-6 rounded-[16px] border-2 border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all duration-200 text-left mb-8 group"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h3 className="text-[20px] font-[600] text-[#0B1120] mb-2">
                Hushh Fund A: AI-Powered Multi-Strategy Alpha.
              </h3>
              <p className="text-[16px] leading-[1.5] text-[#64748B]">
                Our inaugural fund, demonstrating an AI-driven value investing strategy designed to deliver consistent, market-beating returns and sustainable, risk-adjusted alpha.
              </p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-[#64748B] group-hover:text-[#0B1120] transition-colors"
              >
                <path 
                  d="M9 18l6-6-6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </button>

        {/* Back Button */}
        <button
          onClick={handleBack}
          className="text-[17px] font-[500] text-[#8B4513] hover:text-[#6B3410] transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
