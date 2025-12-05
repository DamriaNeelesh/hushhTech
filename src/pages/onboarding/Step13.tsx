import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

function OnboardingStep13() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const loadData = async () => {
      if (!config.supabaseClient) return;

      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) return;

      const { data } = await config.supabaseClient
        .from('onboarding_data')
        .select('initial_investment_amount')
        .eq('user_id', user.id)
        .single();

      if (data && data.initial_investment_amount) {
        setAmount(data.initial_investment_amount.toString());
      }
    };

    loadData();
  }, []);

  // Format amount with commas
  const formatAmount = (value: string) => {
    const cleaned = value.replace(/[^\d.]/g, '');
    const parts = cleaned.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.length > 1 ? `${parts[0]}.${parts[1].slice(0, 2)}` : parts[0];
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAmount(e.target.value);
    setAmount(formatted);
  };

  const getNumericAmount = () => {
    return parseFloat(amount.replace(/,/g, '')) || 0;
  };

  const handleContinue = async () => {
    const numericAmount = getNumericAmount();
    
    if (!amount || numericAmount < 500000) {
      setError('Amount must be $500,000 or higher');
      return;
    }

    setLoading(true);
    setError(null);

    if (!config.supabaseClient) {
      setError('Configuration error');
      setLoading(false);
      return;
    }

    const { data: { user } } = await config.supabaseClient.auth.getUser();
    if (!user) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    const { error: upsertError } = await config.supabaseClient
      .from('onboarding_data')
      .upsert({
        user_id: user.id,
        initial_investment_amount: numericAmount,
        current_step: 13,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      setError('Failed to save data');
      setLoading(false);
      return;
    }

    navigate('/onboarding/step-14');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-[28px] md:text-[36px] mb-6" style={{ color: '#0B1120', fontWeight: 500 }}>
              Initial investment amount
            </h1>
          </div>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-semibold" style={{ color: '#0B1120' }}>
              $
            </span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              placeholder="1,000,000"
              className="w-full pl-12 pr-4 py-6 border-2 border-gray-900 rounded-lg text-2xl font-semibold focus:outline-none focus:border-gray-900"
              style={{ backgroundColor: '#FFFFFF', color: '#0B1120' }}
            />
          </div>

          {error && (
            <p className="text-red-600 mb-4">{error}</p>
          )}

          {/* Investment requirement notice */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mt-1 flex-shrink-0">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="#0B1120"/>
              </svg>
              <div>
                <p className="text-sm text-gray-700">
                  We are currently accepting investments of $1 million or greater for this fund.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading || getNumericAmount() < 500000}
          className="w-full py-4 rounded-lg text-lg font-semibold transition-opacity disabled:opacity-50"
          style={{
            background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
            color: '#0B1120',
            fontWeight: 500,
          }}
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}

export default OnboardingStep13;
