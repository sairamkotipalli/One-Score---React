import React from 'react';
import Header from '../../components/ui/Header';
import CreditScoreWidget from './components/CreditScoreWidget';
import LatestUpdates from './components/LatestUpdates';
import QuickActions from './components/QuickActions';
import DidYouKnow from './components/DidYouKnow';
import LearningSection from './components/LearningSection';
import ShareWithFriends from './components/ShareWithFriends';
import OffersSection from './components/OffersSection';

const CREDIT_SCORES = [
  {
    id: 1,
    bureau: "CIBIL",
    slug: "cibil-score",
    score: 750,
    maxScore: 900,
    nextUpdate: "15 days",
    color: "#059669"
  },
  {
    id: 2,
    bureau: "Experian",
    slug: "experian-score",
    score: 720,
    maxScore: 900,
    nextUpdate: "22 days",
    color: "#2563EB"
  }
];

const LATEST_UPDATES = [
  {
    id: 1,
    type: "score_increase",
    title: "Credit Score Improved",
    description: "Your CIBIL score increased by 15 points this month due to timely payments",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    type: "payment",
    title: "Payment Recorded",
    description: "Your credit card payment of ₹5,000 has been successfully recorded",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    type: "inquiry",
    title: "New Credit Inquiry",
    description: "HDFC Bank made a soft inquiry on your credit report",
    timestamp: "3 days ago"
  },
  {
    id: 4,
    type: "alert",
    title: "Payment Due Soon",
    description: "Your personal loan EMI of ₹8,500 is due in 5 days",
    timestamp: "5 days ago"
  }
];

const QUICK_ACTIONS = [
  { id: 1, label: "EMI Calculator", icon: "Calculator", color: "#2563EB", route: "/insights" },
  { id: 2, label: "Loan Planner", icon: "PiggyBank", color: "#059669", route: "/my-loans" },
  { id: 3, label: "Score Tips", icon: "TrendingUp", color: "#7C3AED", route: "/insights" },
  { id: 4, label: "View Offers", icon: "Gift", color: "#F59E0B", route: "/offers" }
];

const DID_YOU_KNOW_TIPS = [
  { id: 1, text: "Paying your credit card bills on time can improve your credit score by up to 35%. Set up automatic payments to never miss a due date." },
  { id: 2, text: "Keeping your credit utilization below 30% shows lenders you're responsible with credit. Try to use less than ₹30,000 if your limit is ₹1,00,000." },
  { id: 3, text: "Having a mix of credit types (credit cards, personal loans, home loans) can positively impact your credit score by demonstrating diverse credit management." },
  { id: 4, text: "Checking your own credit score doesn't hurt it. Regular monitoring helps you catch errors early and track your financial progress." }
];

const LEARNING_ARTICLES = [
  {
    id: 1,
    title: "Understanding Your Credit Score: A Complete Guide",
    excerpt: "Learn what factors influence your credit score and how to improve it effectively over time",
    category: "Credit Basics",
    readTime: "5 min read",
    image: "/assets/images/image1.png",
    imageAlt: "Professional financial advisor explaining credit score concepts to young couple using laptop and documents on modern office desk"
  },
  {
    id: 2,
    title: "Top 10 Ways to Boost Your Credit Score Fast",
    excerpt: "Discover proven strategies to increase your credit score quickly and maintain good financial health",
    category: "Tips & Tricks",
    readTime: "7 min read",
    image: "/assets/images/image2.jpeg",
    imageAlt: "Upward trending financial graph with green arrow showing credit score improvement on digital tablet screen"
  },
  {
    id: 3,
    title: "Credit Card vs Personal Loan: Which is Better?",
    excerpt: "Compare the pros and cons of credit cards and personal loans to make informed borrowing decisions",
    category: "Comparison",
    readTime: "6 min read",
    image: "/assets/images/image3.jpeg",
    imageAlt: "Close-up of multiple credit cards and loan documents arranged on wooden table with calculator and pen"
  },
  {
    id: 4,
    title: "How to Read Your Credit Report Like a Pro",
    excerpt: "Master the art of analyzing your credit report to identify errors and improvement opportunities",
    category: "Advanced",
    readTime: "8 min read",
    image: "/assets/images/image4.png",
    imageAlt: "Business professional reviewing detailed credit report document with magnifying glass and highlighting important sections"
  }
];

const WORD_OF_DAY = {
  word: "Credit Utilization",
  definition: "The ratio of your current credit card balances to your credit limits, expressed as a percentage. Lower utilization indicates better credit management."
};

const FEATURED_OFFERS = [
  {
    id: 1,
    title: "Personal Loan at 10.5% Interest",
    description: "Get instant approval up to ₹5 lakhs with minimal documentation",
    image: "/assets/images/image5.jpeg",
    imageAlt: "Happy young couple celebrating loan approval while holding house keys and documents in modern living room",
    badge: "Limited Time",
    validUntil: "Valid till Dec 31, 2025"
  },
  {
    id: 2,
    title: "Zero Annual Fee Credit Card",
    description: "Enjoy lifetime free credit card with 5% cashback on all purchases",
    image: "/assets/images/image6.jpeg",
    imageAlt: "Premium metallic credit card with chip technology displayed on elegant black surface with soft lighting",
    badge: "Exclusive",
    validUntil: "Valid till Jan 15, 2026"
  }
];

const HomeDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-24 px-5 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-1">Welcome back!</h1>
          <p className="text-sm text-muted-foreground">Here's your credit health overview</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {CREDIT_SCORES.map((score) => (
            <CreditScoreWidget key={score.id} {...score} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <LatestUpdates updates={LATEST_UPDATES} />
          </div>
          <div className="space-y-4">
            <DidYouKnow tips={DID_YOU_KNOW_TIPS} />
          </div>
        </div>

        <div className="mb-6">
          <QuickActions actions={QUICK_ACTIONS} />
        </div>

        <div className="mb-6">
          <LearningSection articles={LEARNING_ARTICLES} wordOfDay={WORD_OF_DAY} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <OffersSection offers={FEATURED_OFFERS} />
          </div>
          <div>
            <ShareWithFriends />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeDashboard;