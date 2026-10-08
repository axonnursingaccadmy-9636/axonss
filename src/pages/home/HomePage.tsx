import { Link } from "react-router-dom";
import {
  GraduationCap,
  Stethoscope,
  Globe,
  HeartPulse,
  BookOpen,
  Users,
  Video,
  Trophy,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { SEO } from "@/components/ui/SEO";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/config/routes";
import { SITE_CONFIG } from "@/config/site";

const iconMap: Record<string, typeof Stethoscope> = {
  Stethoscope,
  Globe,
  GraduationCap,
  HeartPulse,
  BookOpen,
};

const features = [
  { icon: Video, title: "Video Classes", description: "HD quality lectures from expert educators" },
  { icon: BookOpen, title: "PDF Notes", description: "Comprehensive study material for every topic" },
  { icon: Trophy, title: "Weekly Warrior", description: "Competitive weekly tests to track progress" },
  { icon: MessageSquare, title: "AI Mentor", description: "24/7 AI-powered doubt resolution" },
];

const steps = [
  { number: "01", title: "Sign Up", description: "Create your free account in seconds" },
  { number: "02", title: "Enroll", description: "Choose a course and get instant access" },
  { number: "03", title: "Start Learning", description: "Watch classes, take tests, track progress" },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="AXON — Master Nursing Exams"
        description={SITE_CONFIG.description}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 25% 25%, white 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <Badge variant="accent" dot className="mb-4 bg-white/10 border-white/20 text-accent-300">
              <Sparkles className="h-3 w-3" />
              Premium Nursing Exam Prep
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Master Nursing Exams
              <span className="block text-accent-400">with Confidence</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-primary-100 max-w-2xl mx-auto">
              NORCET, NCLEX, M.Sc Nursing, Staff Nurse & B.Sc Nursing — all in one platform with video classes, PDF notes, weekly tests, and AI mentor.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to={ROUTES.SIGNUP}>
                <Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                  Get Started Free
                </Button>
              </Link>
              <Link to={ROUTES.COURSES}>
                <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                  Explore Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Categories */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900">Exam Categories</h2>
            <p className="mt-2 text-neutral-500">Choose your target exam and start preparing</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {SITE_CONFIG.examCategories.map((category) => {
              const Icon = iconMap[category.icon] || BookOpen;
              return (
                <Card key={category.id} hover padding="lg" className="group">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{category.name}</h3>
                      <p className="text-sm text-neutral-500 mt-0.5">{category.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900">Everything You Need to Succeed</h2>
            <p className="mt-2 text-neutral-500">Comprehensive learning tools in one platform</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Card key={feature.title} padding="lg" className="text-center">
                <div className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-base font-bold text-neutral-900">{feature.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900">How It Works</h2>
            <p className="mt-2 text-neutral-500">Start learning in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center relative">
                <div className="text-5xl font-bold text-primary-100 mb-3">{step.number}</div>
                <h3 className="text-lg font-bold text-neutral-900">{step.title}</h3>
                <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center">
              <ShieldCheck className="h-8 w-8 text-primary-600" />
              <div>
                <p className="font-semibold text-neutral-900">Secure Payments</p>
                <p className="text-sm text-neutral-500">Razorpay protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Users className="h-8 w-8 text-primary-600" />
              <div>
                <p className="font-semibold text-neutral-900">Expert Educators</p>
                <p className="text-sm text-neutral-500">Learn from the best</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Zap className="h-8 w-8 text-primary-600" />
              <div>
                <p className="font-semibold text-neutral-900">Fast & Responsive</p>
                <p className="text-sm text-neutral-500">Works on any device</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-primary-600 to-secondary-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Ready to Start Your Journey?</h2>
          <p className="mt-3 text-primary-100 text-lg">
            Join thousands of nursing aspirants preparing with AXON
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to={ROUTES.SIGNUP}>
              <Button variant="accent" size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Create Free Account
              </Button>
            </Link>
            <Link to={ROUTES.LOGIN}>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
