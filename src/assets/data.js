import { CreditCard, Files, LayoutDashboard, Receipt, Upload } from "lucide-react";

export const testimonials = [
  {
    name: "Alicia Morgan",
    role: "Operations Manager",
    company: "Skyline Ventures",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    quote: "CloudShare transformed how our teams collaborate on files. Uploads are faster, permissions are easier to manage, and sharing is seamless across devices.",
    rating: 5,
  },
  {
    name: "Marcus Lee",
    role: "Product Lead",
    company: "Nimbus Labs",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
    quote: "The CloudShare experience is incredibly user-friendly. Our files are secure, easy to locate, and the public sharing feature is a game changer for customer demos.",
    rating: 4,
  },
  {
    name: "Priya Shah",
    role: "Freelance Designer",
    company: "PixelWave Studio",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80",
    quote: "I love using CloudShare for client handoffs. The upload workflow is clean, and I can quickly share polished file previews with stakeholders.",
    rating: 4,
  },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "₹0",
    description: "Ideal for individuals testing CloudShare with essential file upload and sharing capabilities.",
    features: [
      "2 GB storage",
      "Basic file upload",
      "Share via public links",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "₹199",
    description: "Perfect for small teams who need more storage, advanced sharing controls, and priority access.",
    features: [
      "50 GB storage",
      "Advanced file permissions",
      "Folder collaboration",
      "Email support",
    ],
    cta: "Go Premium",
    highlighted: true,
  },
  {
    name: "Ultimate",
    price: "₹499",
    description: "Best for growing businesses that require unlimited sharing, analytics, and premium support.",
    features: [
      "Unlimited storage",
      "Custom branding",
      "Real-time activity insights",
      "24/7 priority support",
    ],
    cta: "Go Ultimate",
    highlighted: false,
  },
];

export const features = [
  {
    iconName: "Clock",
    iconColor: "text-indigo-500",
    title: "Transaction History",
    description: "Review file activity, download history, and billing details in one easy view.",
  },
  {
    iconName: "FileText",
    iconColor: "text-green-500",
    title: "File Management",
    description: "Organize, rename, and categorize your files with streamlined folder and tag controls.",
  },
  {
    iconName: "CreditCard",
    iconColor: "text-orange-500",
    title: "Flexible Credits",
    description: "Buy and use credits for storage, downloads, and premium sharing options whenever you need them.",
  },
  {
    iconName: "Share2",
    iconColor: "text-purple-500",
    title: "Simple Sharing",
    description: "Send files instantly with shareable links, access options, and quick permissions settings.",
  },
  {
    iconName: "Shield",
    iconColor: "text-red-500",
    title: "Security Storage",
    description: "Keep your files protected with encrypted storage, access control, and secure sharing links.",
  },
  {
    iconName: "FileText",
    iconColor: "text-sky-500",
    title: "Easy File Upload",
    description: "Upload files in seconds with drag-and-drop support and automatic resumable transfers.",
  },
];

export const sidemenudata = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: 2,
    label: "My Files",
    icon: Files,
    path: "/my-files",
  },
  {
    id: 3,
    label: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: 4,
    label: "Transactions",
    icon: Receipt,
    path: "/transactions",
  },
  {
    id: 5,
    label: "Subscription",
    icon: CreditCard,
    path: "/subscription",
  },
];
