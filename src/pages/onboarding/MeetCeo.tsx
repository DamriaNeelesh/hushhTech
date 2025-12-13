import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import config from '../../resources/config/config';

type PaymentState = 'loading' | 'not_paid' | 'verifying' | 'paid' | 'booked';

function MeetCeoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentState, setPaymentState] = useState<PaymentState>('loading');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hushhCoins, setHushhCoins] = useState(0);

  // Check for payment success callback
  useEffect(() => {
    window.scrollTo(0, 0);
    checkPaymentStatus();
  }, []);

  // Handle Stripe callback
  useEffect(() => {
    const payment = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');

    if (payment === 'success' && sessionId) {
      verifyPayment(sessionId);
    } else if (payment === 'cancel') {
      setError('Payment was cancelled. Please try again.');
      setPaymentState('not_paid');
    }
  }, [searchParams]);

  const checkPaymentStatus = async () => {
    if (!config.supabaseClient) {
      setPaymentState('not_paid');
      return;
    }

    try {
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      // Check if user has already paid
      const { data: payment } = await config.supabaseClient
        .from('ceo_meeting_payments')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (payment?.payment_status === 'completed') {
        setHushhCoins(payment.hushh_coins_awarded || 100);
        if (payment.calendly_booked) {
          setPaymentState('booked');
        } else {
          setPaymentState('paid');
        }
      } else {
        setPaymentState('not_paid');
      }
    } catch (err) {
      console.error('Error checking payment status:', err);
      setPaymentState('not_paid');
    }
  };

  const verifyPayment = async (sessionId: string) => {
    setPaymentState('verifying');
    setError(null);

    try {
      const { data: { session } } = await config.supabaseClient!.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${config.SUPABASE_URL}/functions/v1/onboarding-verify-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ sessionId }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setHushhCoins(result.hushhCoinsAwarded || 100);
        setPaymentState('paid');
        // Clear URL params
        window.history.replaceState({}, '', '/onboarding/meet-ceo');
      } else {
        throw new Error(result.error || 'Payment verification failed');
      }
    } catch (err: any) {
      console.error('Payment verification error:', err);
      setError(err.message || 'Failed to verify payment');
      setPaymentState('not_paid');
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await config.supabaseClient!.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(
        `${config.SUPABASE_URL}/functions/v1/onboarding-create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({}),
        }
      );

      const result = await response.json();

      if (result.alreadyPaid) {
        setPaymentState('paid');
        return;
      }

      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error(result.error || 'Failed to create checkout session');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to start payment');
      setLoading(false);
    }
  };

  const handleCalendlyBooked = async () => {
    // Mark as booked in database
    if (config.supabaseClient) {
      const { data: { user } } = await config.supabaseClient.auth.getUser();
      if (user) {
        await config.supabaseClient
          .from('ceo_meeting_payments')
          .update({ calendly_booked: true, updated_at: new Date().toISOString() })
          .eq('user_id', user.id);
      }
    }
    setPaymentState('booked');
  };

  const handleContinueToProfile = () => {
    navigate('/hushh-user-profile');
  };

  const handleBack = () => {
    navigate('/onboarding/step-14');
  };

  // Loading state
  if (paymentState === 'loading' || paymentState === 'verifying') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">
            {paymentState === 'verifying' ? 'Verifying your payment...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pt-28 pb-12" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
            <span className="text-4xl">👤</span>
          </div>
          <h1 className="text-[28px] md:text-[36px] mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
            Meet Manish Sainani
          </h1>
          <p className="text-lg text-gray-600">
            CEO & Co-Founder of Hushh Technologies
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Not Paid State */}
        {paymentState === 'not_paid' && (
          <>
            {/* Why Pay $1 */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="text-xl mb-4" style={{ color: '#0B1120', fontWeight: 500 }}>
                Why pay $1?
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600">🛡️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bot Protection</p>
                    <p className="text-sm text-gray-600">Ensures only real users can book meetings with our CEO</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600">🪙</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Earn 100 Hushh Coins</p>
                    <p className="text-sm text-gray-600">Get 100 Hushh Coins credited to your account upon payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600">📅</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Direct Access</p>
                    <p className="text-sm text-gray-600">Book a personal meeting with CEO Manish Sainani</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 rounded-full text-lg font-semibold mb-4 transition-all disabled:opacity-50 shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
                color: '#0B1120',
              }}
            >
              {loading ? 'Redirecting to payment...' : 'Pay $1 to Schedule Meeting'}
            </button>

            {/* Back Button */}
            <button
              onClick={handleBack}
              disabled={loading}
              className="w-full py-3 text-lg font-medium"
              style={{ color: '#8B4513' }}
            >
              Back
            </button>
          </>
        )}

        {/* Paid State - Show Calendly */}
        {paymentState === 'paid' && (
          <>
            {/* Success Message */}
            <div className="bg-green-50 rounded-2xl p-6 mb-6 text-center">
              <div className="text-4xl mb-3">🎉</div>
              <h2 className="text-xl mb-2" style={{ color: '#0B1120', fontWeight: 500 }}>
                Payment Successful!
              </h2>
              <p className="text-gray-600">
                You've earned <span className="font-bold text-yellow-600">{hushhCoins} Hushh Coins</span>
              </p>
            </div>

            {/* Calendly Instructions */}
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-center">
              <h2 className="text-xl mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
                Book Your Meeting
              </h2>
              <p className="text-gray-600 mb-4">
                Choose a convenient time to meet with Manish Sainani
              </p>
            </div>

            {/* Calendly Embed */}
            <div className="rounded-2xl overflow-hidden shadow-lg mb-6" style={{ height: '700px' }}>
              <iframe
                src="https://calendly.com/hushh"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a meeting with Manish Sainani"
              ></iframe>
            </div>

            {/* After Booking Button */}
            <button
              onClick={handleCalendlyBooked}
              className="w-full py-4 rounded-full text-lg font-semibold mb-4 transition-all shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
                color: '#0B1120',
              }}
            >
              I've Booked My Meeting - Continue
            </button>

            <button
              onClick={handleContinueToProfile}
              className="w-full py-3 text-lg font-medium text-gray-500 hover:text-gray-700"
            >
              Skip - I'll book later
            </button>
          </>
        )}

        {/* Booked State */}
        {paymentState === 'booked' && (
          <>
            <div className="bg-green-50 rounded-2xl p-8 mb-8 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl mb-3" style={{ color: '#0B1120', fontWeight: 500 }}>
                All Set!
              </h2>
              <p className="text-gray-600 mb-2">
                Your meeting is scheduled with Manish Sainani.
              </p>
              <p className="text-gray-600">
                You've earned <span className="font-bold text-yellow-600">{hushhCoins} Hushh Coins</span>!
              </p>
            </div>

            <button
              onClick={handleContinueToProfile}
              className="w-full py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              style={{
                background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
                color: '#0B1120',
              }}
            >
              Continue to My Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MeetCeoPage;
