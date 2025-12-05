import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

function OnboardingStep9() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load existing data
  useEffect(() => {
    const loadData = async () => {
      if (!config.supabaseClient) return;

      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) return;

      const { data, error } = await config.supabaseClient
        .from('onboarding_data')
        .select('legal_first_name, legal_last_name')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setFirstName(data.legal_first_name || '');
        setLastName(data.legal_last_name || '');
      }
    };

    loadData();
  }, []);

  const handleContinue = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name');
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
        legal_first_name: firstName.trim(),
        legal_last_name: lastName.trim(),
        current_step: 9,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      setError('Failed to save data');
      setLoading(false);
      return;
    }

    navigate('/onboarding/step-10');
  };

  const handleBack = () => {
    navigate('/onboarding/step-8');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1120' }}>
            Enter your full legal name
          </h1>
          <p className="text-lg text-gray-700">
            This should match the name on the bank account you're planning to use to invest.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="space-y-6 mb-8">
          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              Legal first name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              Legal last name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading || !firstName.trim() || !lastName.trim()}
          className="w-full py-4 rounded-lg text-lg font-semibold mb-4 transition-opacity disabled:opacity-50"
          style={{
            background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
            color: '#0B1120',
            fontWeight: 500,
          }}
        >
          {loading ? 'Saving...' : 'Continue'}
        </button>

        <button
          onClick={handleBack}
          className="w-full py-4 text-lg font-semibold"
          style={{ color: '#8B4513' }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default OnboardingStep9;
