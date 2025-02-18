import FundPerformance from '../content/posts/funds/FundPerformance';
import Manifesto from '../content/posts/general/Manifesto';
import RenaissanceTech from '../content/posts/product/renaissanceTech';
import AISkillsTesting from '../content/posts/general/AiSkillTesting';
import ProductUpdates from '../content/posts/product/productsUpdate';
import InvestorFAQ from '../content/posts/investors-faq/Investors';
import SellTheWall from '../content/posts/general/selleWall';
import FundAtHushh from '../content/posts/funds/hushhFunds';
import SellTheWallMasterclass from '../content/posts/general/sellTheWalleMasterClass';
import FundAHushh from '../content/posts/funds/fundAHushh';
import CompensationReport from '../content/posts/general/compensationReport';
import AIEcommerceBudget from '../content/posts/general/EcomDesertBlue';
import HushhAlphaFund from '../content/posts/investors-faq/sharedClassExplanation';
import SubscriptionAgreementA from '../content/posts/investors-faq/subscriptionAgreementA';
import SubscriptionAgreementB from '../content/posts/investors-faq/subscriptionAgreementB';
import SubscriptionAgreementC from '../content/posts/investors-faq/subscriptionAgreementC';
import DailyMarketUpdate from '../content/posts/market/dailyMarketUpdates';
import MarketUpdate from '../content/posts/market/marektUpdate2';
import AlphaAlohaFundUpdate from '../content/posts/market/marketUpdate';
import WeeklyReport from '../content/posts/market/weeklyReport';
import MarketUpdate5Feb from '../content/posts/market/marketUpdate5feb'
import LimitedPartnershipAgreement from '../content/posts/investors-faq/limitedPartnershipAgreement';
import FeeSchedule from '../content/posts/funds/feeSchedule'

// Images
import FundsUpdateImg1 from '../components/images/0_Fund Performance.jpg';
import FundsUpdateImg2 from '../components/images/1_Fund Performance.jpg';
import FundsUpdateImg3 from '../components/images/2_Fund Performance.jpg';
import FundsUpdateImg4 from '../components/images/3_Fund Performance.jpg';
import ExhibitLPAImg from '../components/images/exhibitLPA.webp' 

import HushhAiLogoImg from '../components/images/blog2o.png';
import HushhWalletUpdates from '../content/posts/product/hushhProductUpdates';
import DailyMarketUpdateImg1 from '../components/images/0_Daily Market Update.jpg';
import DailyMarketUpdateImg2 from '../components/images/1_Daily Market Update.jpg';
import DailyMarketUpdateImg3 from '../components/images/2_Daily Market Update.jpg';
import DailyMarketUpdateImg4 from '../components/images/3_Daily Market Update.jpg';

// import ManifestoImg from '../components/images/0_Manifesto.jpg'
import ManifestoImg from '../components/images/1_Manifesto.jpg'
import SkillTesting from '../components/images/2_Manifesto.jpg'

import ProductUpdate1 from '../components/images/0_Product Updates.png'
import ProductUpdate2 from '../components/images/product-update.webp'
import ProductUpdate3 from '../components/images/stocks.png'
import HushhWalletImg from '../components/images/hushhWallet.png';
import LimitedPartneshipImg from '../components/images/Limited-Partnership-Agreement.jpg'

import InvestorsFaQImg from '../components/images/inve.jpg'
import HushhAlphFundImg from '../components/images/blog2o.png'
import SubscriptionAgreementAImg from  '../components/images/subscriptionAgreement1.webp'
import SubscriptionAgreementBImg from '../components/images/subscriptionAgreement2.jpg'
import SubscriptionAgreementCImg from '../components/images/subscriptionAgreement3.webp'
import ExhibitLPA from '../content/posts/investors-faq/exhibitLPA';
import ManagementFee from '../components/images/management-fees.webp'
import InvestorSuitability from '../content/posts/investors-faq/investorsQuestionnaire';
import InvestorQImg from '../components/images/questionnaire.webp'
import WithdrawalSchedule from '../content/posts/investors-faq/withdrawalSchedule';
import WithdrawalImage from '../components/images/withdrawalScheduleImg.webp'
import RudeFAQ from '../content/posts/nda/rudeFaq';
import MarketUpdate6feb from '../content/posts/market/marketUpdate6feb';
import RiskAdjustedReturns from '../content/posts/nda/riskAdjust';
import OptionsStrategyRisks from '../content/posts/nda/optionsStrategy';
import LiquidityManagement from '../content/posts/nda/liquidityManagement';
import AMLKYCDocumentation from '../content/posts/funds/kycFundUpdates';
import WireTransferInstructions from '../content/posts/funds/wireTransformation';
import EvergreenFundHighlight from '../content/posts/nda/fundsHighlights';
import HushhInvestorMemo from '../content/posts/nda/investorMemo';
import RiskDisclosures from '../content/posts/nda/riskDisclosure';
import InvestorMaterials from '../content/posts/nda/roadmapInvestors';
import SECReport from '../content/posts/nda/secReport';
import SECReportRegD from '../content/posts/nda/secResport2';
import FundConcentrationAnalysis from '../content/posts/nda/secTeamAdjustment';
import TaxDisclosures from '../content/posts/nda/taxDisclosure';
import TaxSummary from '../content/posts/nda/taxSummary';
import ValuationFramework from '../content/posts/nda/valuationFramework';
import HushhAlphaFundNavUpdate from '../content/posts/funds/fundUpdatesJan';
import hushhPDA from '../content/posts/general/hushhPDA';
import PremiumInvestmentStrategy from '../content/posts/nda/premiumInvestmentStrategy';
import MaximizingAlpha from '../content/posts/nda/maximizingAlpha';
import MarketFundUpdate10feb from '../content/posts/market/marketUpdate10feb';
import InvestorProspectus from '../content/posts/nda/investorProspectus';
import Dmu14feb from '../content/posts/market/dmu14feb';
import HushhAlphaFundGrowthPlan from '../content/posts/general/growthPlan';
import PrivatePlacementMemorandum from '../content/posts/nda/PrivatePlacementMemorandum';
import OperatingAgreement from '../content/posts/nda/operatingAgreement';
import ValuationAnalysis from '../content/posts/nda/valuationAnalysis';
import dmu11feb from '../content/posts/market/dmu11feb';
import RentingMaximum from '../content/posts/nda/rentingMaxIncome';

export interface PostData {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  category: string;
  Component: React.ComponentType;
  image:string;
  accessLevel: string; 
}

export const posts: PostData[] = [
  {
    slug: 'funds/fund-performance',
    title: 'Fund Performance',
    publishedAt: '2025-01-28',
    description:
      'Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.',
    category: 'fund updates', // updated from 'funds'
    Component: FundPerformance,
    image: FundsUpdateImg2,
    accessLevel: 'NDA',
  },

  // ---------------------------------------
  {
    slug: 'funds/fund-highlights',
    title: "Highlighting the Evergreen Nature of the Fund",
    publishedAt: '2025-02-09',
    description: "Exploring the enduring, growth-oriented strategy that defines our evergreen fund.",
    category: 'fund updates', // updated from 'funds'
    Component: EvergreenFundHighlight,
    image: FundsUpdateImg1,
    accessLevel: 'NDA',
  },
  {
    slug: 'investors/hushh-investors-memo',
    title: "Hushh Technologies Investor Memo",
    publishedAt: '2025-02-09',
    description: "A detailed overview of Hushh Technologies’ vision, market opportunity, revenue model, and growth strategy.",
    category: 'investor relations & strategies',
    Component: HushhInvestorMemo,
    image: FundsUpdateImg2,
    accessLevel: 'NDA',
  },
  {
    slug: 'nda-apporved/risk-disclosures',
    title: "Risk Disclosures",
    publishedAt: '2025-02-09',
    description: "Comprehensive risk disclosure statement for the Alpha Aloha Fund, ensuring transparency and trust.",
    category: 'investor relations & strategies',
    Component: RiskDisclosures,
    image: FundsUpdateImg3,
    accessLevel: 'NDA',
  },
  {
    slug: 'investors/roadmap-material',
    title: "Investors Roadmap Materials",
    publishedAt: '2025-02-09',
    description: "A comprehensive set of materials and strategies to enhance transparency, build trust, and showcase the fund’s long-term potential.",
    category: 'investor relations & strategies',
    Component: InvestorMaterials,
    image: FundsUpdateImg4,
    accessLevel: 'NDA',
  },
  {
    slug: 'fund-compliance/sec-report',
    title: "SEC Report for Alpha Aloha Fund",
    publishedAt: '2025-02-09',
    description: "End of Day Summary: February 7, 2025 - Comprehensive performance and strategy analysis for the Alpha Aloha Fund.",
    category: 'investor relations & strategies',
    Component: SECReport,
    image: FundsUpdateImg1,
    accessLevel: 'NDA',
  },
  {
    slug: 'fund-compliance/sec-report-regD-filling',
    title: "SEC Report for Reg D Filing",
    publishedAt: '2025-02-09',
    description: "A detailed analysis of Alpha Aloha Fund’s financial health and performance as of February 7, 2025.",
    category: 'investor relations & strategies',
    Component: SECReportRegD,
    image: FundsUpdateImg2,
    accessLevel: 'NDA',
  },
  {
    slug: 'fund-analysis/discussion',
    title: "Analysis and Discussion of the Fund’s Concentrated Positions",
    publishedAt: '2025-02-09',
    description: "An in-depth examination of the Alpha Aloha Fund’s concentrated approach, highlighting its rationale, risks, rewards, and transparency strategies.",
    category: 'investor relations & strategies',
    Component: FundConcentrationAnalysis,
    image: FundsUpdateImg3,
    accessLevel: 'NDA',
  },
  {
    slug: 'nda-approval/tax-disclosures',
    title: "Tax Disclosures for Fund A",
    publishedAt: '2025-02-09',
    description: "A transparent and compliant tax disclosure framework for Fund A.",
    category: 'investor relations & strategies',
    Component: TaxDisclosures,
    image: FundsUpdateImg4,
    accessLevel: 'NDA',
  },
  {
    slug: 'nda-approval/tax-summary',
    title: "Tax Summary for High-Net-Worth Investors",
    publishedAt: "2025-02-09",
    description: "An optimized tax structure for global investors in the Renaissance Aloha & Alpha Fund.",
    category: 'investor relations & strategies',
    Component: TaxSummary,
    image: FundsUpdateImg1,
    accessLevel: 'NDA',
  },
  // ... existing code ...
{
  slug: 'nda/investor-prospectus',
  title: '🤫 Fund Investor Prospectus',
  publishedAt: '2025-02-12',
  description: 'AI-Driven Systematic Options Income Hedge Fund',
  category: 'investment strategies',
  Component: InvestorProspectus,
  image: HushhAiLogoImg,
  accessLevel: 'NDA',
},
{
  slug: 'investment-strategy/hushh-alpha-fund-growth-plan',
  title: 'A Realistic Growth Plan for Hushh Alpha Fund',
  publishedAt: '2025-02-12',
  description: 'A comprehensive growth plan for scaling the Hushh Alpha Fund to $1B AUM with sustainable, cash flow-driven alpha.',
  category: 'investment strategy',
  Component: HushhAlphaFundGrowthPlan,
  image: DailyMarketUpdateImg2, // Use the appropriate image
  accessLevel: 'Public',
},
{
  slug: 'investment-strategy/private-placement-memorandum',
  title: 'Private Placement Memorandum (PPM)',
  publishedAt: '2025-02-13',
  description: 'Confidential offering of limited partnership interests in Hushh Technologies Renaissance AI Fund, LP.',
  category: 'investment strategy',
  Component: PrivatePlacementMemorandum,
  image: DailyMarketUpdateImg1, // Use the appropriate image
  accessLevel: 'NDA',
},
{
  slug: 'legal/operating-agreement',
  title: 'Operating Agreement for Hushh Technologies LLC',
  publishedAt: '2025-02-12',
  description: 'Draft Articles of Ownership for Hushh Investments LLC, aligning with U.S. regulations and global market expansion.',
  category: 'legal',
  Component: OperatingAgreement,
  image: DailyMarketUpdateImg1, // Use the appropriate image
  accessLevel: 'NDA',
},
{
  slug: 'valuation/valuation-analysis',
  title: 'Valuation Analysis of HushhTech.com',
  publishedAt: '2025-02-12',
  description: 'A comprehensive valuation analysis of HushhTech.com, a fintech startup generating a 5% monthly return on a $7.5 million capital base.',
  category: 'legal',
  Component: ValuationAnalysis,
  image: DailyMarketUpdateImg1, // Use the appropriate image
  accessLevel: 'NDA',
},
{
  slug: 'market/latest-fund-update-11th-feb',
  title: '11thFeb Fund and Market Update Report',
  publishedAt: '2025-02-11',
  description: 'Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.',
  category: 'market',
  Component: dmu11feb,
  image: DailyMarketUpdateImg3, // Use the appropriate image
  accessLevel: 'Public',
},
{
  slug: 'investment-strategy/investment-framework-renting-maximum-income',
  title: 'Investment Framework: Owning the Best and Renting for Maximum Income',
  publishedAt: '2025-02-12',
  description: 'A comprehensive strategy for wealth creation through ownership and rental income.',
  category: 'investment strategy',
  Component: RentingMaximum,
  image: DailyMarketUpdateImg1,
  accessLevel: 'Public',
},
  {
    slug: 'nda-approval/valuation-framework',
    title: "Valuation Framework for Fund A",
    publishedAt: "2025-02-09",
    description: "A detailed analysis of the unique valuation model employed by Fund A.",
    category: 'investor relations & strategies',
    Component: ValuationFramework,
    image: FundsUpdateImg2,
    accessLevel: 'NDA',
  },
  // -----------------------------------------

  {
    slug: 'rude-faq/sell-the-wall',
    title: 'Rude FAQ - Sell the wall',
    publishedAt: '2025-02-08',
    description: "A no-nonsense FAQ about the 'Sell the Wall' strategy and smart investing.",
    category: 'investor relations & strategies',
    Component: RudeFAQ,
    image: HushhAiLogoImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'funds/fee-schedule',
    title: "Hushh Technologies Alpha Fund, LP – Fee Schedule",
    publishedAt: '2025-02-03',
    description: "Detailed breakdown of management and performance-based fees for Limited Partners investing in Hushh Technologies Alpha Fund, LP.",
    category: 'fund updates', // updated from 'funds'
    Component: FeeSchedule,
    image: ManagementFee,
    accessLevel: 'NDA',
  },
  // {
  //   slug: 'funds/alpha-aloha-fund-update',
  //   title: 'Alpha Aloha Fund Market and Fund Update Report',
  //   publishedAt: '2025-02-07',
  //   description: 'Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.',
  //   category: 'fund updates',
  //   Component: AlphaAlohaFundUpdate,
  //   image: DailyMarketUpdateImg1,
  //   accessLevel: 'Public',
  // },
  {
    slug: 'general/sell-the-wall-context',
    title: '“Sell the Wall” Explained in the Context of Jim Simons’ Quantitative Precision',
    publishedAt: '2025-02-15',
    description: 'An in-depth exploration of the “Sell the Wall” strategy through the lens of Jim Simons’ quantitative precision.',
    category: 'general',
    Component: SellTheWall,
    image: HushhAiLogoImg, // Update with the appropriate image if needed
    accessLevel: 'Public',
  },
  {
    slug: 'funds/alpha-aloha-fund-update-feb6',
    title: 'Alpha Aloha Fund Market and Fund Update Report - Feb 6, 2025',
    publishedAt: '2025-02-06',
    description: 'Detailed performance insights for the Alpha Aloha Fund, including NAV, cash position, earnings strategy, and macroeconomic trends.',
    category: 'fund updates',
    Component: MarketUpdate6feb,
    image: DailyMarketUpdateImg2,
    accessLevel: 'Public',
  },  
  {
    slug: 'product/hushh-wallet',
    title: 'Product Update - Hushh Wallet',
    publishedAt: '2025-01-28',
    description:
      'Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.',
    category: 'product updates', // updated from 'funds'
    Component: HushhWalletUpdates,
    image: HushhWalletImg,
    accessLevel: 'Public',
  },
  {
    slug: 'market/updates',
    title: 'Market Updates',
    publishedAt: '2025-02-04',
    description:
      'Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.',
    category: 'market', // updated from 'funds'
    Component: MarketUpdate,
    image: DailyMarketUpdateImg2,
    accessLevel: 'Public',
  },
  {
    slug: 'general/manifesto',
    title: 'Hushh Technologies Manifesto',
    publishedAt: '2025-01-28',
    description:
      'Hushh Technologies Manifesto: The Future of Systematic AI-Driven Income Investing.',
    category: 'general',
    Component: Manifesto,
    image: ManifestoImg,
    accessLevel: 'Public',
  },
  {
    slug: 'funds/renaissance-tech',
    title:
      "The 🤫 Fund – First 12 Investment Programs & Systems Inspired by Renaissance Technologies",
    publishedAt: '2025-02-03',
    description:
      'An overview of the first 12 investment programs of The 🤫 Fund, detailing AI-driven strategies inspired by Renaissance Technologies.',
      category: 'product updates',
      Component: RenaissanceTech,
    image: ProductUpdate2,
    accessLevel: 'Public',
  },
  // {
  //   slug: 'general/ai-skills-testing',
  //   title: 'AI Skills and Testing',
  //   publishedAt: '2025-02-05',
  //   description:
  //     'Exploring the importance of AI skills in the modern workplace and how to test for them.',
  //   category: 'general',
  //   Component: AISkillsTesting,
  //   image: SkillTesting,
  //   accessLevel: 'Public',
  // },
  {
    slug: 'product/product-updates',
    title: 'Product Update: Exciting New Features Coming Soon!',
    publishedAt: '2025-02-03',
    description:
      'Announcement of upcoming product features that will revolutionize investment management and community interactions.',
    category: 'product updates',
    Component: ProductUpdates,
    image: ProductUpdate1,
    accessLevel: 'Public',
  },
  {
    slug: 'investor-relations/investor-faq/charlie-munger-edition',
    title: '🤫 Fund Investor FAQ (Charlie Munger Caliber Edition)',
    publishedAt: '2025-02-05',
    description:
      'Comprehensive FAQ for 🤫 Fund investors, focusing on risk-adjusted returns and systematic investing.',
    category: 'investor relations & strategies',
    Component: InvestorFAQ,
    image: InvestorsFaQImg,
    accessLevel: 'Public',
  },
  {
    slug: 'investor-relations/withdrawer-schedule-lp',
    title: "LP – Withdrawal Schedule",
    publishedAt: "2025-02-03",
    description: "Terms and conditions for investor withdrawals from Hushh Technologies Alpha Fund, LP, ensuring liquidity and portfolio stability.",
    category: 'investor relations & strategies',
    Component: WithdrawalSchedule,
    image: WithdrawalImage,
    accessLevel: 'NDA',
  },
  {
    slug: 'investor-relations/investor-suitability-questionnarie',
    title: "LP – Investor Suitability Questionnaire",
    publishedAt: "2025-02-03",
    description: "Confidential questionnaire to assess investor eligibility for Hushh Technologies Alpha Fund, LP in compliance with SEC regulations.",
    category: 'investor relations & strategies',
    Component: InvestorSuitability,
    image: InvestorQImg,
    accessLevel: 'Public',
  },
  {
    slug: 'investment-strategies/sell-the-wall',
    title: 'Sell The Wall: The Hushh Way',
    publishedAt: '2025-02-10',
    description:
      "An in-depth breakdown of the 'Sell The Wall' strategy inspired by Jim Simons, adapted by Hushh for modern AI-driven markets.",
    category: 'investor relations & strategies',
    Component: SellTheWall,
    image: HushhAiLogoImg,
    accessLevel: 'Public',
  },
  {
    slug: 'market/aloha-alpha-fund-update',
    title: 'Daily Market Updates - 14th Feb',
    publishedAt: '2025-02-14',
    description: 'Internal review and investor communication for the Aloha Alpha Fund, highlighting performance and strategy updates.',
    category: 'market',
    Component: Dmu14feb,
    image: DailyMarketUpdateImg1, // Use the appropriate image
    accessLevel: 'Public',
  },
  {
    slug: 'investment-strategies/risk-adjusted-returs',
    title: "Example Risk-Adjusted Returns Scenarios",
    publishedAt: "2025-02-07",
    description: "Quantitative exploration of potential return outcomes based on market conditions and strategy performance.",
    category: 'investor relations & strategies',
    Component: RiskAdjustedReturns,
    image: HushhAiLogoImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'investment-strategies/limited-partnership-agreement',
    title: "LIMITED PARTNERSHIP AGREEMENT OF HUSHH TECHNOLOGIES ALPHA FUND, L.P.",
    publishedAt: '2025-02-03',
    description: "Agreement outlining the formation, management, and operational guidelines of Hushh Technologies Alpha Fund, L.P.",
    category: 'investor relations & strategies',
    Component: LimitedPartnershipAgreement,
    image: LimitedPartneshipImg,
    accessLevel: 'NDA',

  },
  {
    slug: 'investment-strategies/exhibit-lpa',
    title: "Exhibit A: Limited Partnership Agreement (LPA) of Hushh Technologies Alpha Fund, LP",
    publishedAt: "2025-02-03",
    description: "Institutional-grade, SEC-compliant investment framework for Hushh Technologies Alpha Fund, LP.",
    category: 'investor relations & strategies',
    Component: ExhibitLPA,
    image: ExhibitLPAImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'funds/hushh-technology-fund',
    title: 'Hushh Technology Fund L.P.',
    publishedAt: '2025-01-01',
    description:
      'Executive summary and key details about the Hushh Technology Fund L.P., including structure, strategy, and projections.',
    category: 'fund updates',
    Component: FundAtHushh,
    image: FundsUpdateImg3,
    accessLevel: 'Public',
  },
  {
    slug: 'funds/wire-transfer-instructions',
    title: 'Wire Transfer Instructions for Initial Investment',
    publishedAt: '2025-02-08',
    description: 'Confidential wire transfer instructions for subscribing to the Hushh Renaissance Aloha & Alpha Fund, LP.',
    category: 'fund updates',
    Component: WireTransferInstructions,
    image: FundsUpdateImg2,
    accessLevel: 'NDA',
  },
  {
    slug: 'financial-strategies/sell-the-wall-masterclass',
    title: 'Selling the Wall – A Masterclass in Monetizing Fear and Time Decay',
    publishedAt: '2025-01-25',
    description:
      'A strategic guide to transforming market volatility into sustainable income through the Sell the Wall approach.',
    category: 'financial strategies',
    Component: SellTheWallMasterclass,
    image: HushhAiLogoImg,
    accessLevel: 'Public',
  },
  {
    slug: 'investor-relations/fund-a-hushh',
    title: 'Fund A Hushh',
    publishedAt: '2025-02-05',
    description:
      'An in-depth overview of Fund A Hushh, focusing on AI-driven, risk-managed investment strategies.',
    category: 'fund updates', // updated from 'investor relations'
    Component: FundAHushh,
    image: FundsUpdateImg1,
    accessLevel: 'Public',
  },
  {
    slug: 'fund-updates/aml-kyc-documentation',
  title: 'Anti-Money Laundering (AML) & Know Your Customer (KYC) Documentation',
  publishedAt: '2025-02-08',
  description: 'Comprehensive compliance framework ensuring transparency and security in investor onboarding.',
  category: 'fund updates', // updated from 'investor relations'
    Component: AMLKYCDocumentation,
    image: FundsUpdateImg4,
    accessLevel: 'Public',
  },
  {
    slug: 'general/compensation-report',
    title: 'Comprehensive Report on Compensation Patterns in Pune, Maharashtra',
    publishedAt: '2025-02-06',
    description:
      'Detailed insights into compensation patterns for young professionals in Pune.',
    category: 'general',
    Component: CompensationReport,
    image: DailyMarketUpdateImg3,
    accessLevel: 'Public',
  },
  // {
  //   slug: 'ecommerce/ai-ecommerce-budget',
  //   title: 'AI-First E-Commerce Solution for UAE Small Merchants',
  //   publishedAt: '2025-02-06',
  //   description:
  //     'A cost-efficient, AI-powered, scalable e-commerce solution for small merchants in the UAE.',
  //   category: 'ecommerce',
  //   Component: AIEcommerceBudget,
  //   image: ProductUpdate3,
  // },
  {
    slug: 'investors-faq/shared-class-explanation',
    title: 'Shares and Investors FAQ',
    publishedAt: '2025-02-07',
    description: 'Understanding the Different Classes of Shares & Investor FAQ',
    category: 'investor relations & strategies',
    Component: HushhAlphaFund,
    image: HushhAiLogoImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'general/hushh-pda',
    title: 'HushhPDA: Empowering Personal Data Management',
    publishedAt: '2025-01-31',
    description: 'An introduction to HushhPDA, the world’s first personal data assistant, and its role in revolutionizing personal data management.',
    category: 'general',
    Component: hushhPDA,
    image: HushhAiLogoImg, // Update with the appropriate image if needed
    accessLevel: 'Public',
  },
  {
    slug: 'nda/maximizing-advanced-strategies',
    title: 'Maximizing Alpha: Advanced Strategies for Selling the Wall on Apple (AAPL)',
    publishedAt: '2025-02-10',
    description: 'A detailed strategy for maximizing alpha through advanced options strategies on AAPL.',
    category: 'nda',
    Component: MaximizingAlpha,
    image: HushhAiLogoImg, 
    accessLevel: 'NDA',
  },
  {
    slug: 'funds/market-fund-update-10th-feb',
    title: 'Alpha Aloha Fund Market and Fund Update Report',
    publishedAt: '2025-02-10',
    description: 'A comprehensive update on the Alpha Aloha Fund’s market performance and strategic highlights.',
    category: 'fund updates',
    Component: MarketFundUpdate10feb,
    image: HushhAiLogoImg, // Ensure the image path is correct
    accessLevel: 'Public',
  },
  {
    slug: 'funds/premium-investment-strategy',
    title: 'A Premium Investment Strategy for Accredited Investors',
    publishedAt: '2025-02-13',
    description: 'An overview of the Aloha & Alpha Fund, a premium investment strategy for accredited investors, compliant with ADGM and UAE law.',
    category: 'fund updates',
    Component: PremiumInvestmentStrategy,
    image: HushhAiLogoImg, // Update with the appropriate image if needed
    accessLevel: 'NDA',
  },
  {
    slug: 'funds/hushh-alpha-fund-nav-update',
    title: 'Hushh Alpha Fund – NAV Update & Earnings Report (As of January 31, 2025)',
    publishedAt: '2025-01-31',
    description: 'Comprehensive NAV update and earnings report for Hushh Alpha Fund, highlighting key performance metrics and strategic insights.',
    category: 'fund updates',
    Component: HushhAlphaFundNavUpdate,
    image: FundsUpdateImg4,
    accessLevel: 'Public',
  },
  {
    slug: 'investors-faq/subscription-agreement-a',
    title: 'Class A Subscription Agreement',
    publishedAt: '2025-02-08',
    description:
      'Confidential private offering of Class A limited partnership interests.',
    category: 'investor relations & strategies',
    Component: SubscriptionAgreementA,
    image: SubscriptionAgreementAImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'investors-faq/subscription-agreement-b',
    title: 'Class B Subscription Agreement',
    publishedAt: '2025-02-09',
    description:
      'Confidential private offering of Class B limited partnership interests.',
    category: 'investor relations & strategies',
    Component: SubscriptionAgreementB,
    image: SubscriptionAgreementBImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'strategy/details-strategy-risks',
    title: "Detailed Options Strategy Risks",
    publishedAt: "2025-02-08",
    description: "Comprehensive breakdown of risks in the Fund’s options-based investment strategy.",
    category: 'investor relations & strategies',
    Component: OptionsStrategyRisks,
    image: HushhAiLogoImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'investors-faq/subscription-agreement-c',
    title: 'Class C Subscription Agreement',
    publishedAt: '2025-02-10',
    description:
      'Confidential private offering of Class C limited partnership interests.',
    category: 'investor relations & strategies',
    Component: SubscriptionAgreementC,
    image: SubscriptionAgreementCImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'guidelines/liquidity-management',
    title: "Liquidity Management Guidelines",
    publishedAt: '2025-02-08',
    description: "A comprehensive framework for ensuring capital availability & portfolio stability.",
    category: 'investor relations & strategies',
    Component: LiquidityManagement,
    image: SubscriptionAgreementCImg,
    accessLevel: 'NDA',
  },
  {
    slug: 'market/daily-market-update',
    title: 'Daily Market Update – January 28, 2025',
    publishedAt: '2025-01-28',
    description: 'Markets rallied, driven by strong earnings from major tech companies and optimism about the Federal Reserve’s upcoming decisions on interest rates.',
    category: 'market',
    Component: DailyMarketUpdate,
    image: DailyMarketUpdateImg1,
    accessLevel: 'Public',
  },
  {
    slug: 'market/feb-5-market-update',
    title: "🤫 Alpha Aloha Fund Market and Fund Update Report",
    publishedAt: "2025-02-05",
    description: "Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.",
    category: 'market',
    Component: MarketUpdate5Feb,
    image: DailyMarketUpdateImg1,
    accessLevel: 'Public',
  },

  {
    slug: 'market/alpha-aloha-fund-update',
    title: 'Fund Update 4th Feb',
    publishedAt: '2025-02-04',
    description:
      'Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.',
    category: 'market',
    Component: AlphaAlohaFundUpdate,
    image: DailyMarketUpdateImg3,
    accessLevel: 'Public',
  },
  {
    slug: 'market/weekly-report',
    title: 'Closing Day and Weekly Report – February 3, 2025',
    publishedAt: '2025-02-03',
    description:
      'Closing day and weekly report for February 3, 2025, covering performance overview, transaction summary, and portfolio highlights.',
    category: 'market',
    Component: WeeklyReport,
    image: DailyMarketUpdateImg4,
    accessLevel: 'Public',
  },
];

export function getPosts(): PostData[] {
  return posts;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return posts.find((post) => post.slug === slug);
}