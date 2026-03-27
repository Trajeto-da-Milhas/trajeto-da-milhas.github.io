export interface SiteContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    videoUrl: string;
    ctaText: string;
    ctaLink: string;
    stats: Array<{ value: string; label: string }>;
  };
  whatis: {
    title: string;
    description: string;
    imageUrl: string;
  };
  benefits: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  testimonials: Array<{
    id: string;
    name: string;
    role: string;
    avatarUrl: string;
    text: string;
    stars: number;
  }>;
  pricing: {
    sectionTitle: string;
    plans: Array<{
      id: string;
      name: string;
      period: string;
      installments: string;
      totalPrice: string;
      checkoutLink: string;
      highlighted: boolean;
      features: string[];
    }>;
  };
  bonuses: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string;
  }>;
  guarantee: {
    days: number;
    title: string;
    description: string;
  };
  faq: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  about: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    experienceBadge: {
      value: string;
      label: string;
    };
    achievements: string[];
  };
}
