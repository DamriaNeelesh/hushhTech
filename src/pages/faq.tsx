import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: "What Is HushhTech’s Core Mission?",
    answer: `We are an AI-first financial services and investment management company focused on generating sustainable “aloha income” (recurring cash flow) for investors. By blending data-driven strategies, advanced option overlays, and free-cash-flow-rich equities, we strive for both predictable income and long-term capital appreciation.
    Important: This FAQ is not a solicitation to sell securities. It is for informational purposes only.`
  },
  { 
    question: "Who Can Invest in HushhTech’s Strategies?",
    answer: `Currently, our advanced derivative and AI strategies (like “Sell the Wall”) are typically available only to accredited or qualified investors. This adheres to U.S. securities laws and regulations.
    • We may, in the future, offer more broadly accessible vehicles (such as ETFs), but no public offering is made at this time.
    • Interested parties should verify eligibility and meet KYC/AML standards before participation.`
  },
  {
    question: "How Does HushhTech Use AI?",
    answer: `Our platform integrates artificial intelligence and machine learning models to:
    1. Analyze market data (volatility, fundamental performance).
    2. Automate trade decisions (e.g., option strike pricing).
    3. Optimize risk-adjusted returns in real-time.
    While AI helps identify market opportunities quickly, human oversight remains in place to confirm or override critical decisions.`
  },
  {
    question: "Is My Data Safe with HushhTech?",
    answer: `Yes. We follow strict data privacy laws (e.g., GDPR, CCPA) and employ bank-grade encryption to protect personal and financial information.
    • Consent-Centric Approach: hushh.ai is built around user permission; no data is processed or shared without explicit consent.
    • Security Measures: We utilize multi-factor authentication, routine penetration testing, and zero-trust architecture to guard against breaches.`
  },
  {
    question: "What Does “Aloha Income” Mean in Practical Terms?",
    answer: `“Aloha income” refers to regular cash flow generated from option premiums and other yield-focused overlays on free-cash-flow-rich stocks.
    • Not Guaranteed: Option trading has risks, including assignment and capped upside; user/investor due diligence is paramount.
    • Potential Upside: Steady monthly or weekly premium can smooth returns, but no strategy is immune to market downturns.
    Disclaimer: Past results do not guarantee future performance.`
  },
  {
    question: "Why Is Hushh Focused on Free Cash Flow (FCF) Companies?",
    answer: `We believe high-FCF businesses (like top tech, consumer staples, or financials) offer:
    • More stability in downturns due to strong balance sheets.
    • Potential for both dividend yield and robust fundamentals.
    • Liquid options markets, conducive to premium generation strategies.`
  },
  {
    question: "What Are the Key Risks I Should Know?",
    answer: `1. Market Volatility: Options strategies thrive on volatility but can result in losses if markets move swiftly against positions.
    2. AI & Model Risk: Our algorithms rely on data and historical patterns, which may deviate in extreme or unforeseen events.
    3. Regulatory Changes: Future regulations (SEC, CFTC) might limit or alter certain derivatives or AI-based trading methods.
    4. Suitability: Options-based strategies may not suit all investors. Always assess personal risk tolerance.`
  },
  {
    question: "Is This an Offer to Invest or Buy Securities?",
    answer: `No. This FAQ, like all public HushhTech materials, is for general information only and does not constitute an offer or solicitation of securities. Any official offering would be presented under private placement or registered frameworks, accompanied by appropriate legal disclaimers and subscription documentation.`
  },
  {
    question: "How Does HushhTech Ensure Ethical AI Usage?",
    answer: `1. Human Oversight: AI-driven decisions remain subject to final sign-off by experienced portfolio managers.
    2. AI Ethics Committee: We regularly review algorithms for fairness, bias, and compliance with data privacy laws.
    3. Transparency: We strive to be explainable—providing clarity on how models arrive at critical risk or trade decisions.`
  },
  {
    question: "How Can I Learn More or Get Involved?",
    answer: `• Potential Investors: If you are an accredited investor, reach out to our Investor Relations team at ir@hushhtech.com.
    • General Public: Follow us for technology updates, educational content, and “Sell the Wall” insights.
    • Partnerships/Developers: Our hushh.ai APIs and documentation are available for qualified fintech or developer partners. Contact developers@hushh.ai or developer@hushhtech.com to discuss collaboration.`
  },
  {
    question: "Final Disclaimer",
    answer: `All references to possible returns or income are forward-looking statements. Realized gains may differ significantly based on market volatility, assignment risk, and model performance. No guarantee is made regarding profitability, and all potential investors should consult professional advisers prior to participating in any hushh-related strategies.
    (This FAQ is subject to revision and updated compliance standards.)`
  }
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
  
    const toggleAccordion = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };
  
    return (
      <div className="w-full  mx-auto px-6 py-12 bg-gray-100 text-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">Frequently Asked Questions</h2>
        <div className="space-y-6 w-full">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`w-full bg-white rounded-lg shadow-md transition-all duration-300 ${openIndex === index ? 'shadow-xl' : 'shadow-md'}`}
            >
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-6 cursor-pointer"
              >
                <h3 className="text-base md:text-xl font-semibold">{faq.question}</h3>
                <span className="text-xl text-gray-600">
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </div>
              {openIndex === index && (
                <div className="px-6 text-sm md:text-lg pb-6 text-gray-700 transition-all duration-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
export default Faq;