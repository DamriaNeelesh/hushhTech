import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';
import type { ReferralSource } from '../../types/onboarding';

const referralOptions: { value: ReferralSource; label: string }[] = [
  { value: 'podcast', label: 'Podcast' },
  { value: 'social_media_influencer', label: 'Social Media Influencer' },
  { value: 'social_media_ad', label: 'Social Media Ad' },
  { value: 'yahoo_finance', label: 'Yahoo Finance' },
  { value: 'ai_tool', label: 'AI Tool (e.g. ChatGPT)' },
  { value: 'website_blog_article', label: 'Website, Blog or Article' },
  { value: 'penny_hoarder', label: 'The Penny Hoarder' },
  { value: 'family_friend', label: 'Family or Friend' },
  { value: 'tv_radio', label: 'TV or Radio' },
  { value: 'other', label: 'Other' },
];

export default function OnboardingStep4() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<ReferralSource | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
        .select('referral_source')
        .eq('user_id', user.id)
        .single();

      if (onboardingData?.referral_source) {
        setSelectedSource(onboardingData.referral_source as ReferralSource);
      }
    };

    getCurrentUser();
  }, [navigate]);

  const handleContinue = async () => {
    if (!userId || !config.supabaseClient || !selectedSource) return;

    setIsLoading(true);
    try {
      await config.supabaseClient
        .from('onboarding_data')
        .update({
          referral_source: selectedSource,
          current_step: 4,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      navigate('/onboarding/step-5');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/onboarding/step-5');
  };

  const handleBack = () => {
    navigate('/onboarding/step-3');
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-28 pb-12"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[640px] w-full">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-[40px] font-[700] leading-[1.2] text-[#0B1120]">
            How did you hear about Hushh Fund A?
          </h1>
        </div>

        {/* Radio Options */}
        <div className="mb-6">
          {referralOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedSource(option.value)}
              className="w-full flex items-center p-4 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors text-left"
            >
              <div className="flex-shrink-0 mr-4">
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedSource === option.value
                      ? 'border-[#00A9E0] bg-white'
                      : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {selectedSource === option.value && (
                    <div className="w-3 h-3 rounded-full bg-[#00A9E0]"></div>
                  )}
                </div>
              </div>
              <span className="text-[18px] text-[#0B1120]">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedSource || isLoading}
          className={`w-full h-[56px] rounded-[16px] text-[17px] font-[650] tracking-[0.01em] mb-4 transition-all duration-200 ${
            selectedSource && !isLoading
              ? 'text-[#0B1120] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
              : 'text-[#94A3B8] cursor-not-allowed'
          }`}
          style={{
            background: selectedSource && !isLoading
              ? 'linear-gradient(to right, #00A9E0, #6DD3EF)'
              : '#E2E8F0'
          }}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>

        {/* Skip Button */}
        <button
          onClick={handleSkip}
          className="w-full h-[56px] rounded-[16px] text-[17px] font-[600] text-[#0B1120] border-2 border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all duration-200 mb-6"
        >
          Skip
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
