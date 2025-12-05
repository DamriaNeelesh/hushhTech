import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

function OnboardingStep11() {
  const navigate = useNavigate();
  const [ssn, setSsn] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

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
        .select('ssn_encrypted, date_of_birth')
        .eq('user_id', user.id)
        .single();

      if (data) {
        // Don't pre-fill SSN for security
        setDob(data.date_of_birth || '');
      }
    };

    loadData();
  }, []);

  // Format SSN
  const formatSSN = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 5) return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 5)}-${cleaned.slice(5, 9)}`;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSSN(e.target.value);
    setSsn(formatted);
  };

  // Format date
  const formatDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4) return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  };

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatDate(e.target.value);
    setDob(formatted);
  };

  const handleContinue = async () => {
    if (!ssn.trim() || !dob.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (ssn.length !== 11) {
      setError('Please enter a complete Social Security number');
      return;
    }

    if (dob.length !== 10) {
      setError('Please enter a complete date of birth');
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
        ssn_encrypted: ssn, // In production, encrypt this before storing
        date_of_birth: dob,
        current_step: 11,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      setError('Failed to save data');
      setLoading(false);
      return;
    }

    navigate('/onboarding/step-12');
  };

  const handleBack = () => {
    navigate('/onboarding/step-10');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-[28px] md:text-[36px] mb-4" style={{ color: '#0B1120', fontWeight: 500 }}>
            We just need a few more details
          </h1>
          <p className="text-lg text-gray-700">
            This should be the same information you use on your tax returns.
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
              Social Security number
            </label>
            <input
              type="text"
              value={ssn}
              onChange={handleSSNChange}
              placeholder="___-__-____"
              maxLength={11}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>

          {/* Info box */}
          <div className="bg-gray-100 rounded-lg p-4">
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-start gap-3 w-full text-left"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-1 flex-shrink-0">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z" fill="#0B1120"/>
              </svg>
              <div className="flex-1">
                <p className="font-semibold" style={{ color: '#0B1120' }}>
                  Why do we need your SSN?
                </p>
                {showInfo && (
                  <p className="text-sm text-gray-700 mt-2">
                    Federal law requires us to collect this for tax reporting purposes. Your data is encrypted and protected with bank-grade security.
                  </p>
                )}
              </div>
            </button>
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              Date of birth
            </label>
            <input
              type="text"
              value={dob}
              onChange={handleDobChange}
              placeholder="MM/DD/YYYY"
              maxLength={10}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={loading || ssn.length !== 11 || dob.length !== 10}
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

export default OnboardingStep11;
