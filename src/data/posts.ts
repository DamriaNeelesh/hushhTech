import FundPerformance from '../content/posts/funds/FundPerformance';
import Manifesto from '../content/posts/general/Manifesto';
import RenaissanceTech from '../content/posts/funds/renaissanceTech';
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

export interface PostData {
  slug: string;
  title: string;
  publishedAt: string;
  description: string;
  category: string;
  Component: React.ComponentType;
}

export const posts: PostData[] = [
  {
    slug: 'funds/fund-performance',
    title: 'Fund Performance',
    publishedAt: '2025-01-28',
    description: 'Fund performance update covering net liquidation value, transaction statistics, and strategic commentary.',
    category: 'funds',
    Component: FundPerformance,
  },
  {
    slug: 'market/updates',
    title: 'Market Updates',
    publishedAt: '2025-02-04',
    description: 'Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.',
    category: 'funds',
    Component: MarketUpdate,
  },
  {
    slug: 'general/manifesto',
    title: 'Hushh Technologies Manifesto',
    publishedAt: '2025-01-28',
    description: 'Hushh Technologies Manifesto: The Future of Systematic AI-Driven Income Investing.',
    category: 'general',
    Component: Manifesto,
  },
  {
    slug: 'funds/renaissance-tech',
    title: "The 🤫 Fund – First 12 Investment Programs & Systems Inspired by Renaissance Technologies",
    publishedAt: "2025-02-03",
    description: 'An overview of the first 12 investment programs of The 🤫 Fund, detailing AI-driven strategies inspired by Renaissance Technologies.',
    category: 'funds',
    Component: RenaissanceTech,
  },
  {
    slug: 'general/ai-skills-testing',
    title: 'AI Skills and Testing',
    publishedAt: '2025-03-01',
    description: 'Exploring the importance of AI skills in the modern workplace and how to test for them.',
    category: 'general',
    Component: AISkillsTesting,
  },
  {
    slug: 'product/product-updates',
    title: 'Product Update: Exciting New Features Coming Soon!',
    publishedAt: '2025-02-03',
    description: 'Announcement of upcoming product features that will revolutionize investment management and community interactions.',
    category: 'product updates',
    Component: ProductUpdates,
  },
  {
    slug: 'investor-relations/investor-faq',
    title: '🤫 Fund Investor FAQ (Charlie Munger Caliber Edition)',
    publishedAt: '2025-02-05',
    description: 'Comprehensive FAQ for 🤫 Fund investors, focusing on risk-adjusted returns and systematic investing.',
    category: 'investor relations',
    Component: InvestorFAQ,
  },
  {
    slug: 'investment-strategies/sell-the-wall',
    title: 'Sell The Wall: The Hushh Way',
    publishedAt: '2025-02-10',
    description: "An in-depth breakdown of the 'Sell The Wall' strategy inspired by Jim Simons, adapted by Hushh for modern AI-driven markets.",
    category: 'investment strategies',
    Component: SellTheWall,
  },
  {
    slug: 'funds/hushh-technology-fund',
    title: 'Hushh Technology Fund L.P.',
    publishedAt: '2025-01-01',
    description: 'Executive summary and key details about the Hushh Technology Fund L.P., including structure, strategy, and projections.',
    category: 'fund updates',
    Component: FundAtHushh,
  },
  {
    slug: 'financial-strategies/sell-the-wall-masterclass',
    title: 'Selling the Wall – A Masterclass in Monetizing Fear and Time Decay',
    publishedAt: '2025-03-01',
    description: 'A strategic guide to transforming market volatility into sustainable income through the Sell the Wall approach.',
    category: 'financial strategies',
    Component: SellTheWallMasterclass,
  },
  {
    slug: 'investor-relations/fund-a-hushh',
    title: 'Fund A Hushh',
    publishedAt: '2025-02-05',
    description: 'An in-depth overview of Fund A Hushh, focusing on AI-driven, risk-managed investment strategies.',
    category: 'investor relations',
    Component: FundAHushh,
  },
  {
    slug: 'general/compensation-report',
    title: 'Comprehensive Report on Compensation Patterns in Pune, Maharashtra',
    publishedAt: '2025-02-06',
    description: 'Detailed insights into compensation patterns for young professionals in Pune.',
    category: 'general',
    Component: CompensationReport,
  },
  {
    slug: 'ecommerce/ai-ecommerce-budget',
    title: 'AI-First E-Commerce Solution for UAE Small Merchants',
    publishedAt: '2025-02-06',
    description: 'A cost-efficient, AI-powered, scalable e-commerce solution for small merchants in the UAE.',
    category: 'ecommerce',
    Component: AIEcommerceBudget,
  },
  {
    slug: 'investors-faq/shared-class-explanation',
    title: 'Hushh Technologies Alpha Fund, LP',
    publishedAt: '2025-02-07',
    description: 'Understanding the Different Classes of Shares & Investor FAQ',
    category: 'investor relations',
    Component: HushhAlphaFund,
  },
  {
    slug: 'investors-faq/subscription-agreement-a',
    title: 'Class A Subscription Agreement',
    publishedAt: '2025-02-08',
    description: 'Confidential private offering of Class A limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementA,
  },
  {
    slug: 'investors-faq/subscription-agreement-b',
    title: 'Class B Subscription Agreement',
    publishedAt: '2025-02-09',
    description: 'Confidential private offering of Class B limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementB,
  },
  {
    slug: 'investors-faq/subscription-agreement-c',
    title: 'Class C Subscription Agreement',
    publishedAt: '2025-02-10',
    description: 'Confidential private offering of Class C limited partnership interests.',
    category: 'investor relations',
    Component: SubscriptionAgreementC,
  },
  {
    slug: 'market/daily-market-update',
    title: 'Daily Market Update – January 28, 2025',
    publishedAt: '2025-01-28',
    description: 'Update description...',
    category: 'market',
    Component: DailyMarketUpdate,
  },
  {
    slug: 'market/alpha-aloha-fund-update',
    title: '🤫 Alpha Aloha Fund Update',
    publishedAt: '2025-02-04',
    description: 'Tuesday Evening Report – February 4, 2025, covering fund performance, market highlights, and insights from core holdings.',
    category: 'market',
    Component: AlphaAlohaFundUpdate,
  },
  {
    slug: 'market/weekly-report',
    title: 'Closing Day and Weekly Report – February 3, 2025',
    publishedAt: '2025-02-03',
    description: 'Closing day and weekly report for February 3, 2025, covering performance overview, transaction summary, and portfolio highlights.',
    category: 'market',
    Component: WeeklyReport,
  },
];

export function getPosts(): PostData[] {
  return posts;
}

export function getPostBySlug(slug: string): PostData | undefined {
  return posts.find((post) => post.slug === slug);
}