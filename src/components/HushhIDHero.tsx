import React from 'react';

interface HushhIDHeroProps {
  userName?: string;
  onCreateClick: () => void;
}

/**
 * Mobile-first investor profile hero rebuilt with a WorldQuant-inspired,
 * white-on-white editorial layout, hairline micro-accents, and subtle tactile states.
 */
export const HushhIDHero: React.FC<HushhIDHeroProps> = ({
  userName = 'there',
  onCreateClick,
}) => {
  const benefits = [
    'Create your investor profile once.',
    'Save to wallet. Share anywhere.',
    'No more repetitive forms.',
  ];

  return (
    <section className="bg-white">
      <div
        className="mx-auto max-w-[520px] px-6 pt-[56px] pb-[48px] sm:px-8"
        style={{
          fontFamily:
            '"Inter", "SF Pro Display", "Segoe UI", system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Header block */}
        <div className="text-left">
          <p
            className="text-[12px] font-semibold tracking-[0.18em] uppercase text-[#6B7280] mb-4"
            style={{ letterSpacing: '0.18em' }}
          >
            Investor Profile
          </p>
          <h1 className="text-[40px] font-[700] leading-[1.10] text-[#0B1120] mb-4">
            Hello {userName},
          </h1>
          <p className="text-[18px] leading-[1.65] text-[#475569] max-w-[90%] mb-8">
            Create your verified investor identity once and carry it everywhere—secure, shareable, and ready when you are.
          </p>
          <div className="relative h-px w-full bg-[#E5E7EB]">
            <span
              aria-hidden
              className="absolute left-0 top-1/2 h-[2px] w-4 -translate-y-1/2 bg-[#00A9E0]"
            />
          </div>
        </div>

        {/* Benefit panel */}
        <div className="mt-6">
          <div className="rounded-[18px] border border-[#E5E7EB] divide-y divide-[#E5E7EB] overflow-hidden">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-4 px-4 py-4 min-h-[64px] text-left transition-colors duration-150 active:bg-[#F9FAFB]"
              >
                <div className="w-9 h-9 rounded-full border border-[#E5E7EB] bg-white flex items-center justify-center flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 10.5L8.8 13l5.2-6"
                      stroke="#0B1120"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-[18px] font-semibold leading-[1.55] text-[#111827]">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA area */}
        <div className="mt-6 space-y-3">
          <button
            onClick={onCreateClick}
            className="w-full h-[54px] rounded-[16px] text-[#0B1120] text-[17px] font-semibold tracking-[0.01em] transition-[transform,filter] duration-150 active:scale-[0.985] active:brightness-[0.94] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0B1120] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            style={{
              background: 'linear-gradient(to right, #00A9E0, #6DD3EF)',
              fontWeight: 650,
            }}
          >
            Create Your Hushh ID →
          </button>
          <p className="text-[13px] leading-[1.45] text-[#6B7280]">
            Takes under a minute. Your details stay private.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HushhIDHero;
