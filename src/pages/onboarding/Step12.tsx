import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import config from '../../resources/config/config';

function OnboardingStep12() {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = async () => {
    // Update current step in database
    if (config.supabaseClient) {
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (user) {
        await config.supabaseClient
          .from('onboarding_data')
          .upsert({
            user_id: user.id,
            current_step: 12,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });
      }
    }

    navigate('/onboarding/step-13');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        {/* Animated Checkmark */}
        <div className="mb-8 flex justify-center">
          <DotLottieReact
            src="https://lottie.host/86f77e20-ba3c-41d1-b34e-d4f830287a9d/117a6nTfnR.lottie"
            loop
            autoplay
            style={{ width: 280, height: 280 }}
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl mb-4" style={{ color: '#0B1120', fontWeight: 500 }}>
            Finish up and invest
          </h1>
          <p className="text-lg text-gray-700">
            Finally, we'll collect your initial investment amount, securely connect a funding source, and place your investment when you're ready.
          </p>
        </div>

        <button
          onClick={handleContinue}
          className="w-full py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
          style={{
            background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
            color: '#0B1120',
            fontWeight: 500,
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default OnboardingStep12;
