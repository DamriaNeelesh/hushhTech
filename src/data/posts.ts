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
// Images
import FundsUpdateImg1 from '../components/images/0_Fund Performance.jpg';
import FundsUpdateImg2 from '../components/images/1_Fund Performance.jpg';
import FundsUpdateImg3 from '../components/images/2_Fund Performance.jpg';
import FundsUpdateImg4 from '../components/images/3_Fund Performance.jpg';

import HushhAiLogoImg from '../components/images/hushh_ai_logo.jpg';
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


import InvestorsFaQImg from '../components/images/inve.jpg'
import HushhAlphFundImg from '../components/images/hushh_ai_logo.jpg'
import SubscriptionAgreementAImg from  '../components/images/subscriptionAgreement1.webp'
import SubscriptionAgreementBImg from '../components/images/subscriptionAgreement2.jpg'
import SubscriptionAgreementCImg from '../components/images/subscriptionAgreement3.webp'




export interface PostData {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  category: string;
  Component: React.ComponentType;
  image:string;
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
  },
  {
    slug: 'general/ai-skills-testing',
    title: 'AI Skills and Testing',
    publishedAt: '2025-03-01',
    description:
      'Exploring the importance of AI skills in the modern workplace and how to test for them.',
    category: 'general',
    Component: AISkillsTesting,
    image: SkillTesting,
  },
  {
    slug: 'product/product-updates',
    title: 'Product Update: Exciting New Features Coming Soon!',
    publishedAt: '2025-02-03',
    description:
      'Announcement of upcoming product features that will revolutionize investment management and community interactions.',
    category: 'product updates',
    Component: ProductUpdates,
    image: ProductUpdate1,
  },
  {
    slug: 'investor-relations/investor-faq',
    title: '🤫 Fund Investor FAQ (Charlie Munger Caliber Edition)',
    publishedAt: '2025-02-05',
    description:
      'Comprehensive FAQ for 🤫 Fund investors, focusing on risk-adjusted returns and systematic investing.',
    category: 'investor relations',
    Component: InvestorFAQ,
    image: InvestorsFaQImg,
  },
  {
    slug: 'investment-strategies/sell-the-wall',
    title: 'Sell The Wall: The Hushh Way',
    publishedAt: '2025-02-10',
    description:
      "An in-depth breakdown of the 'Sell The Wall' strategy inspired by Jim Simons, adapted by Hushh for modern AI-driven markets.",
    category: 'investment strategies',
    Component: SellTheWall,
    image: HushhAiLogoImg,
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
  },
  {
    slug: 'financial-strategies/sell-the-wall-masterclass',
    title: 'Selling the Wall – A Masterclass in Monetizing Fear and Time Decay',
    publishedAt: '2025-03-01',
    description:
      'A strategic guide to transforming market volatility into sustainable income through the Sell the Wall approach.',
    category: 'financial strategies',
    Component: SellTheWallMasterclass,
    image: HushhAiLogoImg,
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
  },
  {
    slug: 'general/compensation-report',
    title:
      'Comprehensive Report on Compensation Patterns in Pune, Maharashtra',
    publishedAt: '2025-02-06',
    description:
      'Detailed insights into compensation patterns for young professionals in Pune.',
    category: 'general',
    Component: CompensationReport,
    image: DailyMarketUpdateImg3,
  },
  {
    slug: 'ecommerce/ai-ecommerce-budget',
    title: 'AI-First E-Commerce Solution for UAE Small Merchants',
    publishedAt: '2025-02-06',
    description:
      'A cost-efficient, AI-powered, scalable e-commerce solution for small merchants in the UAE.',
    category: 'ecommerce',
    Component: AIEcommerceBudget,
    image: ProductUpdate3,
  },
  {
    slug: 'investors-faq/shared-class-explanation',
    title: 'Hushh Technologies Alpha Fund, LP',
    publishedAt: '2025-02-07',
    description: 'Understanding the Different Classes of Shares & Investor FAQ',
    category: 'investor relations',
    Component: HushhAlphaFund,
    image: HushhAiLogoImg,
  },
  {
    slug: 'investors-faq/subscription-agreement-a',
    title: 'Class A Subscription Agreement',
    publishedAt: '2025-02-08',
    description:
      'Confidential private offering of Class A limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementA,
    image: SubscriptionAgreementAImg,
  },
  {
    slug: 'investors-faq/subscription-agreement-b',
    title: 'Class B Subscription Agreement',
    publishedAt: '2025-02-09',
    description:
      'Confidential private offering of Class B limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementB,
    image: SubscriptionAgreementBImg,
  },
  {
    slug: 'investors-faq/subscription-agreement-c',
    title: 'Class C Subscription Agreement',
    publishedAt: '2025-02-10',
    description:
      'Confidential private offering of Class C limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementC,
    image: SubscriptionAgreementCImg,
  },
  {
    slug: 'market/daily-market-update',
    title: 'Daily Market Update – January 28, 2025',
    publishedAt: '2025-01-28',
    description: 'Update description...',
    category: 'market',
    Component: DailyMarketUpdate,
    image: DailyMarketUpdateImg1,
  },
  {
    slug: 'market/feb-5-market-update',
    title: "🤫 Alpha Aloha Fund Market and Fund Update Report",
    publishedAt: "2025-02-05",
    description: "Comprehensive market and fund update for the Alpha Aloha Fund, covering key performance metrics, strategy highlights, and macro insights.",
    category: 'market',
    Component: MarketUpdate5Feb,
    image: DailyMarketUpdateImg1,
  },
  {
    slug: 'market/alpha-aloha-fund-update',
    title: '🤫 Alpha Aloha Fund Update',
    publishedAt: '2025-02-04',
    description:
      'Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.',
    category: 'market',
    Component: AlphaAlohaFundUpdate,
    image: DailyMarketUpdateImg3,
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
  },
];

export function getPosts(): PostData[] {
  return posts;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return posts.find((post) => post.slug === slug);
}