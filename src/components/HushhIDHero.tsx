import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface HushhIDHeroProps {
  userName?: string;
  onCreateClick: () => void;
}

export const HushhIDHero: React.FC<HushhIDHeroProps> = ({ 
  userName = "there", 
  onCreateClick 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [nameVisible, setNameVisible] = useState(false);
  const [bulletVisible, setBulletVisible] = useState([false, false, false]);

  useEffect(() => {
    // Card entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Name reveal animation
    const nameTimer = setTimeout(() => setNameVisible(true), 400);
    
    // Staggered bullet animations
    const bullet1 = setTimeout(() => {
      setBulletVisible(prev => [true, prev[1], prev[2]]);
    }, 600);
    
    const bullet2 = setTimeout(() => {
      setBulletVisible(prev => [prev[0], true, prev[2]]);
    }, 660);
    
    const bullet3 = setTimeout(() => {
      setBulletVisible(prev => [prev[0], prev[1], true]);
    }, 720);

    return () => {
      clearTimeout(timer);
      clearTimeout(nameTimer);
      clearTimeout(bullet1);
      clearTimeout(bullet2);
      clearTimeout(bullet3);
    };
  }, []);

  const benefits = [
    "Create your investor profile once.",
    "Save to wallet. Share anywhere.",
    "No more repetitive forms."
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" 
         style={{ backgroundColor: '#F5F5F7' }}>
      
      {/* Hero Card */}
      <div 
        className={`
          w-full max-w-[680px] bg-white rounded-[24px] 
          transition-all duration-250 ease-out
          ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-[0.96]'}
        `}
        style={{
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Top Highlight */}
        <div 
          className="h-px w-full rounded-t-[24px]" 
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)'
          }}
        />
        
        <div className="px-6 py-6 sm:px-8 sm:py-7">
          {/* Meta Label */}
          <div 
            className={`
              text-[13px] font-semibold tracking-[0.08em] mb-2
              transition-all duration-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
            style={{ 
              color: '#86868B',
              letterSpacing: '0.08em'
            }}
          >
            INVESTOR PROFILE
          </div>

          {/* Headline with Name Animation */}
          <h2 
            className={`
              text-[28px] sm:text-[30px] font-semibold leading-[1.15] mb-4
              transition-all duration-200
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
            `}
            style={{ 
              color: '#1D1D1F',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif'
            }}
          >
            Hello{' '}
            <span 
              className={`
                inline-block transition-all duration-400
                ${nameVisible ? 'opacity-100' : 'opacity-0'}
              `}
              style={{
                background: 'linear-gradient(90deg, #007AFF 0%, #00C7FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {userName}
            </span>
            ,
          </h2>

          {/* Benefits with Dividers */}
          <div className="space-y-0 mb-5">
            {benefits.map((benefit, index) => (
              <div key={index}>
                {/* Divider */}
                <div 
                  className="h-px w-full my-3"
                  style={{ backgroundColor: '#E5E5E7' }}
                />
                
                {/* Benefit Row */}
                <div 
                  className={`
                    flex items-start gap-3 py-1
                    transition-all duration-200
                    ${bulletVisible[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                  `}
                  style={{ 
                    transitionDelay: `${index * 60}ms` 
                  }}
                >
                  {/* Blue Bullet */}
                  <div 
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-[9px]"
                    style={{ backgroundColor: '#007AFF' }}
                  />
                  
                  {/* Benefit Text */}
                  <p 
                    className="text-[16px] sm:text-[17px] leading-[1.35]"
                    style={{ 
                      color: '#6E6E73',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
                    }}
                  >
                    {benefit}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Final Divider */}
            <div 
              className="h-px w-full mt-3"
              style={{ backgroundColor: '#E5E5E7', opacity: 0.5 }}
            />
          </div>

          {/* CTA Link Row */}
          <button
            onClick={onCreateClick}
            className="
              group w-full flex items-center justify-between 
              px-4 py-3 -mx-4
              rounded-xl
              transition-all duration-150 ease-out
              hover:bg-[#F5F5F7]
              active:scale-[0.98]
            "
          >
            <span 
              className="text-[17px] font-medium"
              style={{ 
                color: '#007AFF',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif'
              }}
            >
              Create Your Hushh ID
            </span>
            
            <ChevronRight 
              className="
                w-[14px] h-[14px] 
                transition-transform duration-150 ease-out
                group-hover:translate-x-0.5
                group-active:translate-x-1
              "
              style={{ color: '#007AFF' }}
              strokeWidth={2.5}
            />
          </button>

          {/* Helper Text */}
          <p 
            className="text-[13px] leading-[1.4] mt-4 text-center"
            style={{ color: '#86868B' }}
          >
            Takes under a minute. Your details stay private.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HushhIDHero;
