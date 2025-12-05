import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../resources/config/config';

// Types for location data from our Edge Function
interface Country {
  isoCode: string;
  name: string;
}

interface State {
  isoCode: string;
  name: string;
}

interface City {
  name: string;
}

// Supabase Edge Function URL
// Using hardcoded URL - will work in production via env vars
const LOCATIONS_API = 'https://ibsisfnjxeowvdtvgzff.supabase.co/functions/v1/get-locations';

function OnboardingStep10() {
  const navigate = useNavigate();
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [country, setCountry] = useState('US'); // ISO code
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Location data from Edge Function (replaces heavy country-state-city library)
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetch(`${LOCATIONS_API}?type=countries`);
        const result = await response.json();
        if (result.data) {
          setCountries(result.data);
        }
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchCountries();
  }, []);

  // Fetch states when country changes
  useEffect(() => {
    if (!country) {
      setStates([]);
      return;
    }

    const fetchStates = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetch(`${LOCATIONS_API}?type=states&country=${country}`);
        const result = await response.json();
        if (result.data) {
          setStates(result.data);
        }
      } catch (err) {
        console.error('Error fetching states:', err);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchStates();
  }, [country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (!country || !state) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetch(`${LOCATIONS_API}?type=cities&country=${country}&state=${state}`);
        const result = await response.json();
        if (result.data) {
          setCities(result.data);
        }
      } catch (err) {
        console.error('Error fetching cities:', err);
      } finally {
        setLoadingLocations(false);
      }
    };

    fetchCities();
  }, [country, state]);

  // Load existing data
  useEffect(() => {
    const loadData = async () => {
      if (!config.supabaseClient) return;

      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) return;

      const { data } = await config.supabaseClient
        .from('onboarding_data')
        .select('address_line_1, address_line_2, address_country, state, city, zip_code')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setAddressLine1(data.address_line_1 || '');
        setAddressLine2(data.address_line_2 || '');
        setCountry(data.address_country || 'US');
        setState(data.state || '');
        setCity(data.city || '');
        setZipCode(data.zip_code || '');
      }
    };

    loadData();
  }, []);

  const handleContinue = async () => {
    if (!addressLine1.trim() || !country || !state || !city || !zipCode.trim()) {
      setError('Please fill in all required fields');
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
        address_line_1: addressLine1.trim(),
        address_line_2: addressLine2.trim() || null,
        address_country: country,
        state: state,
        city: city,
        zip_code: zipCode.trim(),
        current_step: 10,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (upsertError) {
      setError('Failed to save data');
      setLoading(false);
      return;
    }

    navigate('/onboarding/step-11');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1120' }}>
            Enter your address
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
              Address line 1
            </label>
            <input
              type="text"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
            <p className="text-sm text-gray-600 mt-2">
              This should be the address used for tax purposes
            </p>
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              Address line 2
            </label>
            <input
              type="text"
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              Country
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState('');
                  setCity('');
                }}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400 appearance-none"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                <option value="">Select country...</option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1L8 8L15 1" stroke="#0B1120" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              State / Province
            </label>
            <div className="relative">
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity('');
                }}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400 appearance-none"
                style={{ backgroundColor: '#FFFFFF' }}
                disabled={!country}
              >
                <option value="">Select state...</option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1L8 8L15 1" stroke="#0B1120" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              City
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400 appearance-none"
                style={{ backgroundColor: '#FFFFFF' }}
                disabled={!state}
              >
                <option value="">Select city...</option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                  <path d="M1 1L8 8L15 1" stroke="#0B1120" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{ color: '#0B1120' }}>
              ZIP code
            </label>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              maxLength={5}
              className="w-48 px-4 py-4 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-gray-400"
              style={{ backgroundColor: '#FFFFFF' }}
            />
          </div>

        </div>

        <button
          onClick={handleContinue}
          disabled={loading || !addressLine1.trim() || !country || !state || !city || !zipCode.trim()}
          className="w-full py-4 rounded-lg text-lg font-semibold mb-4 transition-opacity disabled:opacity-50"
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

export default OnboardingStep10;
