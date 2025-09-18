// src/lib/constants.ts
import {
  Wallet,
  Boxes,
  Users,
  TrendingUp,
  ClipboardList,
  BarChart3,
  Building2,
  FileText,
  Settings,
  ShieldCheck,
  Twitter,
  Linkedin,
  Github,
  Youtube,
} from 'lucide-react';

// ===== HERO SECTION =====
export const heroContent = {
  title: "Enterprise Resource Planning, Reimagined",
  subtitle: "Unify finance, inventory, HR, sales, and analytics in one elegant, modern platform built for tomorrow’s leaders.",
  primaryCta: "Start Free Trial",
  secondaryCta: "Watch Demo",
};

// ===== FEATURES SECTION =====
export interface Feature {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>; // ✅ Modern icon type
}

export const features: Feature[] = [
  {
    title: "Finance & Accounting",
    description: "Automate invoicing, payroll, and financial reporting with real-time insights and audit trails.",
    icon: Wallet,
  },
  {
    title: "Inventory & Supply Chain",
    description: "Track stock levels, manage suppliers, optimize warehouse operations, and prevent stockouts.",
    icon: Boxes,
  },
  {
    title: "Human Resource",
    description: "Streamline recruitment, attendance, performance reviews, payroll, and compliance management.",
    icon: Users,
  },
  {
    title: "Sales & CRM",
    description: "Manage leads, deals, pipelines, customer communications, and forecasting in one unified workspace.",
    icon: TrendingUp,
  },
  {
    title: "Project Management",
    description: "Plan tasks, track progress, allocate resources, collaborate with teams, and hit deadlines.",
    icon: ClipboardList,
  },
  {
    title: "Reports & Analytics",
    description: "Visualize KPIs, generate custom dashboards, export data, and make strategic decisions with confidence.",
    icon: BarChart3,
  },
];

// ===== TESTIMONIALS SECTION =====
export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Lin",
    role: "COO, TechNova Inc.",
    content: "Platinum ERP transformed how we manage operations. Intuitive, powerful, and beautifully designed — our team adopted it in days.",
    avatar: "https://via.placeholder.com/100/9F7AEA/FFFFFF?text=SL",
  },
  {
    name: "James Wu",
    role: "CFO, Global Retail Group",
    content: "Finally, an ERP that doesn’t feel like a relic from the 90s. The financial module alone saved us 20 hours per month.",
    avatar: "https://via.placeholder.com/100/00B8D9/FFFFFF?text=JW",
  },
  {
    name: "Alex Rivera",
    role: "CTO, Innovate Labs",
    content: "The API is a dream, the UI is stunning, and the support team actually replies. Rare combination in enterprise software.",
    avatar: "https://via.placeholder.com/100/EC4899/FFFFFF?text=AR",
  },
];

// ===== STATS SECTION =====
export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" },
  { value: "GDPR", label: "Compliant" },
];

// ===== FOOTER NAVIGATION =====
export interface FooterLink {
  title: string;
  links: Array<{
    name: string;
    href: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  }>;
}

export const footerLinks: FooterLink[] = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features", icon: BarChart3 },
      { name: "Pricing", href: "/pricing", icon: Wallet },
      { name: "Inventory", href: "/inventory", icon: Boxes },
      { name: "Finance", href: "/finance", icon: Building2 },
      { name: "Analytics", href: "/analytics", icon: TrendingUp },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about", icon: Users },
      { name: "Blog", href: "/blog", icon: FileText },
      { name: "Careers", href: "/careers", icon: Settings },
      { name: "Contact", href: "/contact", icon: ShieldCheck },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Compliance", href: "/compliance" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Twitter", href: "#", icon: Twitter },
      { name: "LinkedIn", href: "#", icon: Linkedin },
      { name: "GitHub", href: "#", icon: Github },
      { name: "YouTube", href: "#", icon: Youtube },
    ],
  },
];

// ===== SOCIAL PROOF =====
export const trustedBy = [
  "https://via.placeholder.com/120x40/141828/FFFFFF?text=ACME",
  "https://via.placeholder.com/120x40/141828/FFFFFF?text=GLOBAL+TECH",
  "https://via.placeholder.com/120x40/141828/FFFFFF?text=INNOVATE+LTD",
  "https://via.placeholder.com/120x40/141828/FFFFFF?text=RETAIL+PRO",
];