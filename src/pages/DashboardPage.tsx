import React, { useState } from 'react';
import {
  Leaf,
  ArrowRight,
  Thermometer,
  Droplets,
  Wind,
  Clock,
  Recycle,
  Lightbulb,
  Activity,
  Layers,
  Bell,
} from 'lucide-react';
import { SmoothAreaLineChart } from '../components/Charts';
import {
  ASSETS,
  DASHBOARD_ALERTS,
  DASHBOARD_COMPOST_SERIES,
  DASHBOARD_RECENT_ACTIVITY,
} from '../data/imariData';
import { AppRoute } from '../types';

interface DashboardPageProps {
  onNavigate: (route: AppRoute) => void;
}

type RangeKey = keyof typeof DASHBOARD_COMPOST_SERIES;

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [range, setRange] = useState<RangeKey>('7 days');
  const activeSeries = DASHBOARD_COMPOST_SERIES[range];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left Main Column */}
      <div className="lg:col-span-8 space-y-5">
        {/* Hero Composting System Banner matching image_ca8bfb07.png */}
        <section
          className="relative overflow-hidden rounded-2xl border border-emerald-200/70 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background:
              'linear-gradient(108deg, #EFFAF2 0%, #E7F6EC 50%, #D4EEDD 100%)',
          }}
        >
          {/* Subtle glowing radial light behind machine */}
          <div
            className="pointer-events-none absolute -right-12 -top-12 w-80 h-80 rounded-full bg-emerald-300/20 blur-2xl"
            aria-hidden="true"
          />

          <div className="space-y-5 z-10 flex-1">
            <div>
              <p className="text-[11px] font-bold tracking-[0.08em] text-[#15803D] uppercase">
                IMARI Composting System
              </p>
              <h1 className="text-2xl sm:text-[28px] font-extrabold text-[#0F172A] leading-[1.16] mt-1.5">
                From Waste to <br />
                Valuable Compost
              </h1>
              <p className="text-[13px] text-slate-600 mt-1.5">Sorted. Decomposed. Reborn.</p>
            </div>

            {/* 3 inline metrics directly on the mint banner with vertical dividers */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-y-2.5 pt-1">
              <div className="flex items-center gap-2 pr-3.5 sm:border-r sm:border-emerald-200/80 whitespace-nowrap">
                <span className="w-7 h-7 rounded-lg bg-[#CEEBD7]/85 border border-emerald-200/70 text-[#0E7A3A] flex items-center justify-center shrink-0">
                  <Leaf className="w-3.5 h-3.5" />
                </span>
                <div>
                  <div className="text-[12.5px] font-extrabold text-slate-900 tabular-nums leading-tight">
                    842 kg
                  </div>
                  <div className="text-[10px] text-slate-500">Compost Produced</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-0 sm:px-3.5 sm:border-r sm:border-emerald-200/80 whitespace-nowrap">
                <span className="w-7 h-7 rounded-lg bg-[#CEEBD7]/85 border border-emerald-200/70 text-[#0E7A3A] flex items-center justify-center shrink-0">
                  <Recycle className="w-3.5 h-3.5" />
                </span>
                <div>
                  <div className="text-[12.5px] font-extrabold text-slate-900 tabular-nums leading-tight">
                    3.2 tons
                  </div>
                  <div className="text-[10px] text-slate-500">Waste Processed</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-0 sm:pl-3.5 whitespace-nowrap">
                <span className="w-7 h-7 rounded-lg bg-[#CEEBD7]/85 border border-emerald-200/70 text-[#0E7A3A] flex items-center justify-center shrink-0">
                  <Lightbulb className="w-3.5 h-3.5" />
                </span>
                <div>
                  <div className="text-[12.5px] font-extrabold text-slate-900 tabular-nums leading-tight">
                    96%
                  </div>
                  <div className="text-[10px] text-slate-500">System Efficiency</div>
                </div>
              </div>
            </div>
          </div>

          {/* Machine Illustration blended into mint banner */}
          <div className="relative w-full sm:w-52 md:w-[240px] h-40 sm:h-44 shrink-0 flex items-center justify-center z-10 rounded-2xl overflow-hidden">
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full opacity-55 z-10"
              viewBox="0 0 260 200"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M25 145 C45 45, 165 15, 240 60"
                stroke="#4ADE80"
                strokeWidth="1.2"
                strokeOpacity="0.65"
              />
              <circle cx="195" cy="24" r="3" fill="#22C55E" fillOpacity="0.55" />
            </svg>
            <img
              src={ASSETS.composterMachine}
              alt="IMARI smart composting chamber machine"
              className="w-full h-full object-cover object-center mix-blend-multiply brightness-105"
              referrerPolicy="no-referrer"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side,transparent_54%,rgba(218,241,226,0.95)_100%)]"
            />
          </div>
        </section>

        {/* Compost Production Chart Card */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0 mt-0.5">
                <Leaf className="w-4 h-4" />
              </span>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Compost Production</h2>
                <p className="text-xs text-slate-500">Total compost generated</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200/70">
              {(['7 days', '30 days', '3 months'] as RangeKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRange(key)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    range === key
                      ? 'bg-[#0E7A3A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
              {activeSeries.totalLabel}
            </div>
            <div className="text-xs font-semibold text-emerald-700 mt-0.5">
              &uarr; {activeSeries.deltaLabel}
            </div>
          </div>

          <SmoothAreaLineChart
            labels={activeSeries.labels}
            series={[
              {
                name: 'Compost Produced',
                color: '#0E7A3A',
                values: activeSeries.values,
              },
            ]}
            height={200}
            yMin={0}
            yMax={400}
            yTicks={[0, 100, 200, 300, 400]}
            unit=" kg"
          />
        </section>

        {/* Bottom 2 Cards: Current Batch & Alerts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Current Batch */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-slate-700" />
                  <h2 className="text-sm font-bold text-slate-900">Current Batch</h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('compost')}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
                >
                  <span>View all</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="mb-4">
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">IM-024</div>
                <div className="text-xs text-slate-500">Organic compost</div>
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-[#0E7A3A] rounded-full" style={{ width: '78%' }} />
                </div>
                <span className="text-xs font-bold text-slate-800 tabular-nums">78%</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <span className="block text-slate-400">Started</span>
                <span className="font-semibold text-slate-700 tabular-nums">04 Oct 2025</span>
              </div>
              <div>
                <span className="block text-slate-400">Est. completion</span>
                <span className="font-semibold text-slate-700 tabular-nums">12 Oct 2025</span>
              </div>
              <div className="text-right">
                <span className="block text-slate-400">Remaining</span>
                <span className="font-semibold text-slate-700 tabular-nums">8 days remaining</span>
              </div>
            </div>
          </section>

          {/* Alerts Card */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-700" />
                <h2 className="text-sm font-bold text-slate-900">Alerts</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('alerts')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3.5">
              {DASHBOARD_ALERTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate('alerts')}
                  className="w-full text-left flex items-start justify-between gap-3 p-2 -mx-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        item.dot === 'amber'
                          ? 'bg-amber-500'
                          : item.dot === 'green'
                          ? 'bg-emerald-500'
                          : 'bg-sky-500'
                      }`}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{item.title}</div>
                      <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10.5px] text-slate-400 shrink-0 tabular-nums">
                    {item.ago}
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Right Status & Activity Column */}
      <div className="lg:col-span-4 space-y-5">
        {/* System Status Card */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-700" />
              <h2 className="text-sm font-bold text-slate-900">System Status</h2>
            </div>
            <div className="flex items-center gap-2 mt-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-sm font-bold text-emerald-700">Operational</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              All systems are functioning normally.
            </p>
          </div>

          <div className="divide-y divide-slate-100 border-t border-slate-100 pt-1">
            <div className="py-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-slate-600">
                <Thermometer className="w-4 h-4 text-slate-400" />
                <span>Temperature</span>
              </span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">31.4 °C</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-slate-600">
                <Droplets className="w-4 h-4 text-slate-400" />
                <span>Moisture</span>
              </span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">64%</span>
            </div>
            <div className="py-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs text-slate-600">
                <Wind className="w-4 h-4 text-slate-400" />
                <span>Humidity</span>
              </span>
              <span className="text-sm font-bold text-slate-900 tabular-nums">72%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('reports')}
            className="w-full text-left rounded-xl bg-[#EAF7EF] hover:bg-[#DCF2E4] border border-emerald-200/60 px-3.5 py-3 flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#0E7A3A] text-white flex items-center justify-center shrink-0">
                <Leaf className="w-3.5 h-3.5" />
              </span>
              <div>
                <div className="text-xs font-bold text-[#0D4A27]">Environmental Impact</div>
                <div className="text-[11px] text-emerald-800 tabular-nums">
                  ~12.6 kg CO₂e avoided today
                </div>
              </div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-[#0E7A3A] shrink-0" />
          </button>
        </section>

        {/* Recent Activity Card */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('monitor')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 relative">
            {DASHBOARD_RECENT_ACTIVITY.filter((a) => a.group === 'Today').map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs relative">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 z-10" />
                <span className="text-slate-400 tabular-nums w-10 shrink-0">{item.time}</span>
                <span className="text-slate-700 font-medium">{item.text}</span>
              </div>
            ))}

            <div className="pt-2 pb-0.5 text-[11px] font-semibold text-slate-500">Yesterday</div>

            {DASHBOARD_RECENT_ACTIVITY.filter((a) => a.group === 'Yesterday').map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-xs">
                <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                <span className="text-slate-400 tabular-nums w-10 shrink-0">{item.time}</span>
                <span className="text-slate-600">{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
