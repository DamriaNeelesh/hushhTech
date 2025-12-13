import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

type RecurringFrequency = 'once_a_month' | 'twice_a_month' | 'weekly' | 'every_other_week';

function OnboardingStep14() {
  const navigate = useNavigate();
  const [frequency, setFrequency] = useState<RecurringFrequency>('once_a_month');
  const [investmentDay, setInvestmentDay] = useState('1st');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500000);
  const [customAmount, setCustomAmount] = useState('');
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
        .select('recurring_frequency, recurring_day_of_month, recurring_amount')
        .eq('user_id', user.id)
        .single();

      if (data) {
        if (data.recurring_frequency) setFrequency(data.recurring_frequency);
        if (data.recurring_day_of_month) setInvestmentDay(data.recurring_day_of_month);
        if (data.recurring_amount) {
          const amount = data.recurring_amount;
          if ([500000, 750000, 1000000, 1500000].includes(amount)) {
            setSelectedAmount(amount);
          } else {
            setSelectedAmount(null);
            setCustomAmount(amount.toString());
          }
        }
      }
    };

    loadData();
  }, []);

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    setCustomAmount(e.target.value.replace(/[^\d]/g, ''));
  };

  const getFinalAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const completeOnboarding = async (skipRecurring: boolean = false) => {
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

    const finalAmount = getFinalAmount();
    
    // Convert day string to integer
    const convertDayToInt = (day: string | number): number => {
      // If already a number, return it
      if (typeof day === 'number') return day;
      // If string "Last", return 31
      if (day === 'Last') return 31;
      // Extract number from string like "1st", "2nd", etc.
      return parseInt(day.replace(/\D/g, ''));
    };
    
    // Map frequency to database values
    const convertFrequencyToDb = (freq: RecurringFrequency): string => {
      const frequencyMap: Record<RecurringFrequency, string> = {
        'once_a_month': 'monthly',
        'twice_a_month': 'bimonthly',
        'weekly': 'weekly',
        'every_other_week': 'biweekly'
      };
      return frequencyMap[freq];
    };
    
    const updateData: any = {
      user_id: user.id,
      current_step: 14,
      is_completed: true,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!skipRecurring && finalAmount > 0) {
      updateData.recurring_frequency = convertFrequencyToDb(frequency);
      updateData.recurring_day_of_month = convertDayToInt(investmentDay);
      updateData.recurring_amount = finalAmount;
    }

    const { error: upsertError } = await config.supabaseClient
      .from('onboarding_data')
      .upsert(updateData, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      setError('Failed to save data');
      setLoading(false);
      return;
    }

    // Redirect to identity verification
    // Redirect to Meet CEO page (payment layer)
    navigate('/onboarding/meet-ceo');
  };

  const handleContinue = () => {
    const finalAmount = getFinalAmount();
    if (finalAmount < 10) {
      setError('Amount must be at least $10');
      return;
    }
    completeOnboarding(false);
  };

  const handleSkip = () => {
    completeOnboarding(true);
  };

  const handleBack = () => {
    navigate('/onboarding/step-13');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-[28px] md:text-[36px] mb-4" style={{ color: '#0B1120', fontWeight: 500 }}>
              Make a recurring investment
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Grow your wealth with periodic contributions.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {/* Frequency */}
          <div className="mb-6">
            <label className="block text-base mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
              Frequency
            </label>
            <div className="flex flex-wrap gap-3">
              {[
                { value: 'once_a_month', label: 'Once a month' },
                { value: 'twice_a_month', label: 'Twice a month' },
                { value: 'weekly', label: 'Weekly' },
                { value: 'every_other_week', label: 'Every other week' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFrequency(option.value as RecurringFrequency)}
                  className="px-6 py-3 rounded-full border-2 transition-colors"
                  style={{
                    borderColor: frequency === option.value ? '#0B1120' : '#D1D5DB',
                    backgroundColor: frequency === option.value ? '#F3F4F6' : '#FFFFFF',
                    color: '#0B1120',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Investment days */}
          <div className="mb-6">
            <label className="block text-base mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
              Investment days
            </label>
            <div className="relative">
              <select
                value={investmentDay}
                onChange={(e) => setInvestmentDay(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400 appearance-none"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="5th">5th</option>
                <option value="10th">10th</option>
                <option value="15th">15th</option>
                <option value="20th">20th</option>
                <option value="25th">25th</option>
                <option value="Last">Last day of month</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1L8 8L15 1" stroke="#0B1120" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Amount */}
          <div className="mb-8">
            <label className="block text-base mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
              Amount
            </label>
            <div className="flex flex-wrap gap-3 mb-3">
              {[500000, 750000, 1000000, 1500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountClick(amount)}
                  className="px-6 py-3 rounded-full border-2 transition-colors"
                  style={{
                    borderColor: selectedAmount === amount ? '#0B1120' : '#D1D5DB',
                    backgroundColor: selectedAmount === amount ? '#F3F4F6' : '#FFFFFF',
                    color: '#0B1120',
                  }}
                >
                  ${amount.toLocaleString()}
                </button>
              ))}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-semibold text-gray-400">
                $
              </span>
              <input
                type="text"
                value={customAmount}
                onChange={handleCustomAmountChange}
                placeholder="Other Amount"
                className="w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
                style={{ 
                  backgroundColor: '#FFFFFF',
                  color: customAmount ? '#0B1120' : '#9CA3AF'
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading || getFinalAmount() < 10}
          className="w-full py-4 rounded-lg text-lg font-semibold mb-3 transition-opacity disabled:opacity-50"
          style={{
            background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
            color: '#0B1120',
            fontWeight: 500,
          }}
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>

        <button
          onClick={handleSkip}
          disabled={loading}
          className="w-full py-4 rounded-lg text-lg font-semibold mb-3 border-2 transition-opacity disabled:opacity-50"
          style={{
            borderColor: '#0B1120',
            backgroundColor: '#FFFFFF',
            color: '#0B1120',
          }}
        >
          I'll do this later
        </button>

        <button
          onClick={handleBack}
          disabled={loading}
          className="w-full py-4 text-lg font-semibold"
          style={{ color: '#8B4513' }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default OnboardingStep14;
