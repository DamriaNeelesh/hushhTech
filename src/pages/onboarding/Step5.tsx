import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import config from '../../resources/config/config';

export default function OnboardingStep5() {
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

  const handleContinue = async () => {
    if (!userId || !config.supabaseClient) return;

    try {
      // Update current step in database
      await config.supabaseClient
        .from('onboarding_data')
        .update({
          current_step: 5,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId);

      // Navigate to step 6
      navigate('/onboarding/step-6');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center px-6 pt-28 pb-12"
      style={{ fontFamily: 'Inter, -apple-system, system-ui, "SF Pro Text", sans-serif' }}
    >
      <div className="max-w-[640px] w-full text-center">
        {/* Lottie Animation */}
        <div className="flex justify-center mb-8">
          <div style={{ width: '280px', height: '280px' }}>
            <DotLottieReact
              src="https://lottie.host/58d10cd9-7087-4394-bb55-3ad6f07d3db6/9epWGP0u3F.lottie"
              loop
              autoplay
            />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-[40px] font-[700] leading-[1.2] text-[#0B1120] mb-4">
          Let's continue with some information about you
        </h1>

        {/* Description */}
        <p className="text-[18px] leading-[1.6] text-[#64748B] mb-10">
          To comply with federal regulations, and as is typical with any investment platform, we are required to collect certain personal information about you.
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full h-[56px] rounded-[16px] text-[17px] font-[650] tracking-[0.01em] text-[#0B1120] cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          style={{
            background: 'linear-gradient(to right, #00A9E0, #6DD3EF)'
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
