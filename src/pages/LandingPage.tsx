import React, { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Leaf,
  Recycle,
  RefreshCw,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Target,
  Compass,
  Eye,
  Sprout,
  Users,
  Wind,
  Menu,
  X,
  Check,
} from 'lucide-react';
import { ImariLogo } from '../components/ImariLogo';
import { ASSETS, LANDING_STATS } from '../data/imariData';
import { AppRoute } from '../types';

interface LandingPageProps {
  onNavigate: (route: AppRoute) => void;
  isAuthenticated: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, isAuthenticated }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Home');

  // Contact form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Partnership Proposal');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setFormError('Please fill in your name, email address, and message.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormSubmitted(true);
    setFullName('');
    setEmail('');
    setMessage('');
  };

  const scrollToSection = (id: string, label: string) => {
    setActiveNav(label);
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home', 'Home');
            }}
            className="shrink-0 whitespace-nowrap"
          >
            <ImariLogo className="h-8" />
          </a>

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Technology', id: 'technology' },
              { label: 'Impact', id: 'impact' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id, item.label);
                }}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors border-b-2 ${
                  activeNav === item.label
                    ? 'text-[#0E7A3A] border-[#0E7A3A] font-semibold'
                    : 'border-transparent hover:text-slate-900'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(isAuthenticated ? 'dashboard' : 'login')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D4A27] hover:bg-[#0A3A1E] text-white text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{isAuthenticated ? 'Dashboard' : 'Login'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileNavOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-2">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Technology', id: 'technology' },
              { label: 'Impact', id: 'impact' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id, item.label)}
                className="block w-full text-left py-2 text-sm font-medium text-slate-700 hover:text-[#0E7A3A]"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-10 pb-14 sm:pt-14 sm:pb-16 overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 76% 36%, rgba(22, 163, 74, 0.09) 0%, rgba(236, 253, 245, 0.45) 36%, #FFFFFF 70%)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#0F172A] leading-[1.07] text-balance">
                Transforming <br />
                Waste. Creating <br />
                <span className="text-[#16A34A]">Value.</span>
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-md">
                IMARI combines smart technology and sustainable solutions to turn waste into
                valuable resources.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0D4A27] hover:bg-[#09381D] text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm"
                >
                  <span>Join for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('about', 'About')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-emerald-700/25 text-[#0D4A27] hover:bg-emerald-50 text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => scrollToSection('about', 'About')}
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-600 pt-4 cursor-pointer"
              >
                <span className="w-4 h-6 rounded-full border border-slate-300 inline-flex items-start justify-center pt-1">
                  <span className="w-1 h-1.5 rounded-full bg-emerald-600" />
                </span>
                <span>Scroll to explore</span>
              </button>
            </div>

            <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
              {/* Faint circular green aura ring matching screenshot */}
              <div
                className="pointer-events-none absolute -inset-4 sm:-inset-6 rounded-full border border-emerald-500/15"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-3 right-2 w-2.5 h-2.5 rounded-full bg-emerald-400/70"
                aria-hidden="true"
              />
              <div className="relative w-full rounded-tl-[110px] rounded-tr-[36px] rounded-br-[110px] rounded-bl-[36px] overflow-hidden shadow-[0_20px_50px_rgba(13,74,39,0.12)] border border-emerald-100/80 aspect-[4/3] bg-emerald-50">
                <img
                  src={ASSETS.heroFacility}
                  alt="IMARI automated composting and waste sorting facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {/* Floating top-right label matching screenshot */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-sm border border-emerald-100 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <Leaf className="w-3.5 h-3.5" />
                  </span>
                  <div className="leading-tight">
                    <div className="text-[11px] font-bold text-slate-900">A Cleaner,</div>
                    <div className="text-[11px] font-medium text-emerald-700">Greener Rwanda</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Floating Stats Strip */}
          <div className="mt-14 bg-white rounded-2xl border border-slate-100 shadow-[0_12px_36px_rgba(15,23,42,0.06)] px-6 py-5 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {LANDING_STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3.5 ${
                  idx < LANDING_STATS.length - 1 ? 'lg:border-r lg:border-slate-100 lg:pr-4' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
                  {stat.icon === 'recycle' && <Recycle className="w-5 h-5" />}
                  {stat.icon === 'leaf' && <Leaf className="w-5 h-5" />}
                  {stat.icon === 'compost' && <Sprout className="w-5 h-5" />}
                  {stat.icon === 'chart' && <TrendingUp className="w-5 h-5" />}
                </div>
                <div>
                  <div className="text-xl font-extrabold text-slate-900 tabular-nums leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About IMARI Section */}
      <section id="about" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#0E7A3A] uppercase">
                <span className="w-6 h-[2px] bg-[#0E7A3A]" />
                <span>About IMARI</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-balance">
                A Cleaner Rwanda, A Healthier Tomorrow.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                IMARI is an innovative waste management initiative designed to reduce waste,
                recover organic matter and promote a circular economy in Rwanda.
              </p>
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works', 'About')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D4A27] hover:bg-[#09381D] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-7 relative">
              <div className="rounded-3xl overflow-hidden aspect-[16/10] shadow-md border border-slate-100 relative bg-emerald-50">
                <img
                  src={ASSETS.rwandanHills}
                  alt="Green terraced hills and valleys in Rwanda"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 max-w-xs bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-slate-100 flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                  </span>
                  <p className="text-xs font-medium text-slate-700 leading-snug">
                    Cleaner cities. Healthier communities. A sustainable future.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission / Purpose / Vision Triad */}
          <div className="mt-14 pt-10 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5 md:pr-6 md:border-r md:border-slate-100">
              <div className="w-9 h-9 rounded-full bg-[#0D4A27] text-white flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                To create a cleaner environment through smart waste solutions.
              </p>
            </div>

            <div className="space-y-2.5 md:px-4 md:border-r md:border-slate-100">
              <div className="w-9 h-9 rounded-full bg-[#0D4A27] text-white flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Our Purpose</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                To turn waste into valuable resources and support a circular economy in Rwanda.
              </p>
            </div>

            <div className="space-y-2.5 md:pl-4">
              <div className="w-9 h-9 rounded-full bg-[#0D4A27] text-white flex items-center justify-center">
                <Eye className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                A sustainable Rwanda where waste is no longer a problem, but an opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-[#F7FBF8] border-y border-emerald-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <div className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#0E7A3A] uppercase">
              <span className="w-5 h-[2px] bg-[#0E7A3A]" />
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 text-balance">
              Smart Waste Management, Made Simple.
            </h2>
            <p className="text-sm text-slate-500">
              From collection to compost, IMARI makes waste management efficient and sustainable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {[
              {
                step: '1',
                title: 'Waste Collection',
                desc: 'Waste is collected from communities and businesses.',
                img: ASSETS.wasteCollection,
              },
              {
                step: '2',
                title: 'Automated Sorting',
                desc: 'AI-powered systems separate materials with high accuracy.',
                img: ASSETS.sortingConveyor,
              },
              {
                step: '3',
                title: 'Organic Recovery',
                desc: 'Organic waste is recovered and prepared for composting.',
                img: ASSETS.handsCompost,
              },
              {
                step: '4',
                title: 'Compost Production',
                desc: 'Controlled chambers turn organic waste into nutrient-rich compost.',
                img: ASSETS.heroFacility,
              },
            ].map((card, index) => (
              <div
                key={card.step}
                className="relative bg-white rounded-2xl border border-emerald-100/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                {index < 3 && (
                  <span
                    className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-emerald-200 text-[#0E7A3A] items-center justify-center shadow-xs"
                    aria-hidden="true"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </span>
                )}
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mb-4 bg-emerald-50">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -left-0.5 w-6 h-6 rounded-full bg-[#0D4A27] text-white text-xs font-bold flex items-center justify-center border-2 border-white">
                    {card.step}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Technology Section */}
      <section id="technology" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-md border border-slate-100 bg-emerald-50">
                <img
                  src={ASSETS.sortingConveyor}
                  alt="Automated waste sorting conveyor technology"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#0E7A3A] uppercase">
                <span className="w-6 h-[2px] bg-[#0E7A3A]" />
                <span>Our Technology</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-balance">
                Innovation for a Sustainable Future.
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Our advanced systems — from automated sorting to intelligent monitoring — ensure
                efficient waste management and maximum resource recovery.
              </p>

              <ul className="space-y-3 pt-1">
                {[
                  'Automated Sorting Systems',
                  'Smart Monitoring & Analytics',
                  'Efficient Composting Chambers',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm font-semibold text-slate-800">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-[#0E7A3A] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate(isAuthenticated ? 'monitor' : 'login')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D4A27] hover:bg-[#09381D] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="impact" className="py-16 sm:py-20 bg-[#FAFDFB]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#0E7A3A] uppercase">
                <span className="w-6 h-[2px] bg-[#0E7A3A]" />
                <span>Our Impact</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-balance">
                More Than Waste Management.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                IMARI creates lasting environmental, social and economic value for Rwanda.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D4A27] hover:bg-[#09381D] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Join IMARI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="lg:col-span-4 space-y-5">
              {[
                {
                  title: 'Cleaner Environment',
                  desc: 'Less waste in landfills and reduced greenhouse gas emissions.',
                  icon: Wind,
                },
                {
                  title: 'Valuable Resources',
                  desc: 'Organic waste is recovered and turned into nutrient-rich compost.',
                  icon: Sprout,
                },
                {
                  title: 'Stronger Communities',
                  desc: 'Cleaner cities, healthier environments and new green jobs.',
                  icon: Users,
                },
                {
                  title: 'Circular Economy',
                  desc: 'Waste becomes a resource, keeping value in the local economy.',
                  icon: RefreshCw,
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#0E7A3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-4">
              <div className="relative rounded-3xl overflow-hidden aspect-square shadow-md border border-slate-100 bg-emerald-50">
                <img
                  src={ASSETS.handsCompost}
                  alt="Hands holding nutrient-rich organic compost"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 right-4 w-44 rounded-2xl bg-[#0D4A27] text-white p-4 shadow-lg">
                  <p className="text-xs font-semibold leading-snug">
                    Turning today&rsquo;s waste into tomorrow&rsquo;s growth.
                  </p>
                  <Leaf className="w-5 h-5 text-emerald-300 mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-[#0E7A3A] uppercase">
                <span className="w-6 h-[2px] bg-[#0E7A3A]" />
                <span>Contact Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight text-balance">
                Let&rsquo;s Build a Greener Rwanda Together.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Have a question, partnership proposal or feedback? We&rsquo;d love to hear from
                you.
              </p>

              <div className="space-y-3 pt-2 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#0E7A3A]" />
                  <span>info@imari.rw</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#0E7A3A]" />
                  <span className="tabular-nums">+250 788 123 456</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#0E7A3A]" />
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_55%_45%,rgba(209,244,221,0.42),transparent_68%)] rounded-full"
              />
              <div className="relative bg-white rounded-3xl border border-slate-100 shadow-[0_12px_36px_rgba(15,23,42,0.06)] p-6 sm:p-8">
                {formSubmitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0E7A3A] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Message Received</h3>
                    <p className="text-sm text-slate-600 max-w-sm mx-auto">
                      Thank you for reaching out to IMARI. Our Kigali operations team will respond
                      shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="mt-2 px-5 py-2 rounded-full bg-[#0D4A27] text-white text-xs font-semibold cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                      />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        aria-label="Subject"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 bg-white focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Partnership Proposal">Partnership Proposal</option>
                        <option value="Municipal Waste Collection">Municipal Waste Collection</option>
                        <option value="Compost Supply Inquiry">Compost Supply Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                      </select>
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        placeholder="Your Message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 resize-none"
                      />
                    </div>
                    {formError && (
                      <p className="text-xs font-medium text-rose-600">{formError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#0D4A27] hover:bg-[#09381D] text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>&copy; 2026 IMARI. All rights reserved.</span>
          <span>Smart Waste &middot; Green Compost &middot; Cleaner Rwanda</span>
        </div>
      </footer>
    </div>
  );
};
