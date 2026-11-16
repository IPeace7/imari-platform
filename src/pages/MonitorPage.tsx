import React, { useState } from 'react';
import {
  Activity,
  Gauge,
  Radio,
  Cpu,
  Recycle,
  Wifi,
  CheckCircle2,
  ArrowRight,
  Thermometer,
  Droplets,
  Wind,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { DonutChart, SmoothAreaLineChart } from '../components/Charts';
import { MONITOR_TRENDS } from '../data/imariData';
import { AppRoute } from '../types';

interface MonitorPageProps {
  onNavigate: (route: AppRoute) => void;
}

type MetricTab = keyof typeof MONITOR_TRENDS;
type TimeframeKey = 'Last 24h' | '7 days' | '30 days';

export const MonitorPage: React.FC<MonitorPageProps> = ({ onNavigate }) => {
  const [metricTab, setMetricTab] = useState<MetricTab>('Temperature');
  const [timeframe, setTimeframe] = useState<TimeframeKey>('Last 24h');

  const currentMetric = MONITOR_TRENDS[metricTab];
  const currentSeries = currentMetric[timeframe];

  const yBounds =
    metricTab === 'Temperature'
      ? { min: 40, max: 90, ticks: [40, 50, 60, 70, 80, 90] }
      : metricTab === 'Moisture'
      ? { min: 40, max: 80, ticks: [40, 50, 60, 70, 80] }
      : { min: 15, max: 25, ticks: [15, 17, 19, 21, 23, 25] };

  return (
    <div className="space-y-5">
      {/* Top Overview Banner + Healthy Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <section className="relative overflow-hidden lg:col-span-9 rounded-2xl bg-[linear-gradient(108deg,#EFFAF2_0%,#E7F6EC_52%,#D5EEDE_100%)] border border-[#D7ECDD] p-5 flex flex-col justify-between gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,transparent_68%)]"
          />
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold tracking-wider text-[#0E7A3A] uppercase">
                System Monitoring
              </p>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                Live System Overview
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Real-time status of your waste processing system.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-600">
              <span className="inline-flex items-center gap-1.5 bg-white/90 border border-emerald-100 px-2.5 py-1 rounded-lg tabular-nums">
                <Clock className="w-3 h-3 text-slate-400" />
                Tue, 10 Jun 2025 &middot; 10:42 AM
              </span>
              <span className="px-2 py-1 rounded-lg bg-emerald-100/80 text-emerald-800 font-semibold">
                Demo data
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {[
              { label: 'System', value: 'Online', sub: 'All active', icon: Activity },
              { label: 'Conveyor', value: 'Running', sub: '1.2 m/s', icon: Gauge },
              { label: 'Compost Chamber', value: 'Active', sub: 'CB-024', icon: Recycle },
              { label: 'Active Alerts', value: '0', sub: 'All clear', icon: AlertTriangle, muted: true },
              { label: 'Sensors', value: 'All connected', sub: '12/12 online', icon: Wifi },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-white/95 rounded-xl border border-emerald-100 px-3 py-2 flex items-center gap-2.5"
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      item.muted ? 'text-rose-500' : 'text-[#0E7A3A]'
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="text-[10px] text-slate-400 truncate">{item.label}</div>
                    <div className="text-xs font-bold text-slate-900 truncate">{item.value}</div>
                    <div className="text-[10px] text-slate-500 truncate">{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-3 rounded-2xl bg-[#E9F7EE] border border-[#CBE9D5] p-5 flex flex-col justify-center gap-2 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#0E7A3A] shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">All systems operating normally</h2>
              <p className="text-xs text-slate-600 mt-1">
                No critical issues detected at this time.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 5-Column Live Telemetry Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {[
          {
            label: 'Conveyor Speed',
            value: '1.2 m/s',
            badge: 'Normal',
            updated: 'Updated 10:42 AM',
            icon: Gauge,
          },
          {
            label: 'Entry Sensor',
            value: 'Object detected',
            badge: 'Normal',
            updated: 'Updated 10:42 AM',
            icon: Radio,
          },
          {
            label: 'Sorting Arms',
            value: '3 tracked',
            badge: 'All ready',
            updated: 'Updated 10:42 AM',
            icon: Cpu,
          },
          {
            label: 'Compost Chamber',
            value: 'CB-024',
            badge: 'Active',
            updated: 'Updated 10:42 AM',
            icon: Recycle,
          },
          {
            label: 'System Sensors',
            value: '12/12 connected',
            badge: 'Normal',
            updated: 'Updated 10:42 AM',
            icon: Wifi,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2"
            >
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-6 h-6 rounded-lg bg-emerald-50 text-[#0E7A3A] flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span>{card.label}</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums">{card.value}</div>
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#0E7A3A] font-semibold">
                  {card.badge}
                </span>
                <span className="text-slate-400 tabular-nums">{card.updated}</span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Split: Environmental Trends & Compost Chamber (Left) + Conveyor & System Health (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-5">
          {/* Environmental Trends */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0E7A3A]" />
                <h2 className="text-sm font-bold text-slate-900">Environmental Trends</h2>
              </div>

              <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200/70">
                {(['Last 24h', '7 days', '30 days'] as TimeframeKey[]).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      timeframe === tf
                        ? 'bg-[#0E7A3A] text-white'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-5 border-b border-slate-100 pb-2.5 mb-4 text-xs">
              {(['Temperature', 'Moisture', 'Oxygen'] as MetricTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMetricTab(tab)}
                  className={`pb-1 font-semibold border-b-2 transition-colors cursor-pointer ${
                    metricTab === tab
                      ? 'border-[#0E7A3A] text-[#0E7A3A]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab} ({MONITOR_TRENDS[tab].unit})
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-8">
                <SmoothAreaLineChart
                  labels={currentSeries.labels}
                  series={[
                    {
                      name: metricTab,
                      color: '#0E7A3A',
                      values: currentSeries.values,
                    },
                  ]}
                  height={210}
                  yMin={yBounds.min}
                  yMax={yBounds.max}
                  yTicks={yBounds.ticks}
                  unit={currentMetric.unit}
                  pinnedTooltip={{
                    index: currentSeries.highlightIndex,
                    time: currentSeries.highlightTime,
                    valueText: currentSeries.highlightValue,
                  }}
                />
              </div>

              <div className="md:col-span-4 space-y-2.5">
                <div className="text-xs font-bold text-slate-800 mb-1">Latest Readings</div>
                {[
                  { label: 'Temperature', val: '56.8°C', time: '10:42 AM', icon: Thermometer },
                  { label: 'Moisture', val: '62%', time: '10:42 AM', icon: Droplets },
                  { label: 'Oxygen', val: '19.5%', time: '10:41 AM', icon: Wind },
                  { label: 'Chamber Fill Level', val: '68%', time: '10:40 AM', icon: Recycle },
                ].map((r) => {
                  const Icon = r.icon;
                  return (
                    <div
                      key={r.label}
                      className="rounded-xl bg-slate-50/90 border border-slate-100 px-3 py-2 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-[#0E7A3A]" />
                        <div>
                          <div className="text-[11px] text-slate-500">{r.label}</div>
                          <div className="text-xs font-bold text-slate-900 tabular-nums">
                            {r.val}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-[#0E7A3A] text-[10px] font-semibold">
                          Normal
                        </span>
                        <div className="text-[10px] text-slate-400 tabular-nums mt-0.5">
                          {r.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compost Chamber Monitoring */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Recycle className="w-4 h-4 text-[#0E7A3A]" />
                <h2 className="text-sm font-bold text-slate-900">Compost Chamber Monitoring</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('compost')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
              >
                <span>View details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-5 flex items-center gap-4">
                <DonutChart
                  size={108}
                  strokeWidth={12}
                  centerPrimary="68%"
                  centerSecondary="FILLED"
                  segments={[
                    { label: 'Filled', value: 68, color: '#0E7A3A' },
                    { label: 'Open', value: 32, color: '#E2E8F0' },
                  ]}
                />
                <div className="space-y-1.5 text-xs">
                  <div className="text-[11px] text-slate-400">Current Batch</div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 tabular-nums">CB-024</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#0E7A3A] text-[10px] font-semibold">
                      &bull; Active
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 pt-1">Stage</div>
                  <div className="font-semibold text-slate-800">Thermophilic Phase</div>
                  <div className="flex items-center gap-4 pt-1 text-[11px]">
                    <div>
                      <span className="block text-slate-400">Time Elapsed</span>
                      <span className="font-bold text-slate-800 tabular-nums">2d 4h 12m</span>
                    </div>
                    <div>
                      <span className="block text-slate-400">Est. Completion</span>
                      <span className="font-bold text-slate-800 tabular-nums">5d 8h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 space-y-3">
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { label: 'Temperature', val: '56.8°C', sub: 'Range: 50–65°C' },
                    { label: 'Moisture', val: '62%', sub: 'Range: 50–70%' },
                    { label: 'Aeration / Oxygen', val: '78%', sub: 'Range: 70–85%' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-1"
                    >
                      <div className="text-[10.5px] text-slate-500">{s.label}</div>
                      <div className="text-base font-extrabold text-slate-900 tabular-nums">
                        {s.val}
                      </div>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-[#0E7A3A] text-[10px] font-semibold">
                        Normal
                      </span>
                      <div className="text-[10px] text-slate-400 tabular-nums">{s.sub}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-xs">
                  <div className="rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">Watering</span>
                      <span className="block text-[10px] text-slate-400">Last: 08:15 AM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-600 text-[10.5px] font-semibold">
                      Idle
                    </span>
                  </div>
                  <div className="rounded-xl bg-[#EFFAF3] border border-[#D7ECDD] px-3 py-2 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-700">Aeration</span>
                      <span className="block text-[10px] text-slate-400">Last: 10:30 AM</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-[#0E7A3A] text-[10.5px] font-semibold">
                      &bull; Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Conveyor & Sorting + System Health */}
        <div className="lg:col-span-4 space-y-5">
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-[#0E7A3A]" />
                <h2 className="text-sm font-bold text-slate-900">Conveyor &amp; Sorting</h2>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('conveyor')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
              >
                <span>View details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2.5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10.5px]">Conveyor</span>
                  <span className="font-bold text-slate-900 tabular-nums">1.2 m/s</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#0E7A3A] text-[11px] font-semibold">
                  &bull; Running
                </span>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2.5 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Entry Sensor</span>
                <span className="font-semibold text-emerald-700">&bull; Object detected</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-800">Sorting Arms</div>
              {[
                { arm: 'Arm 1', status: 'Ready', color: 'text-emerald-700' },
                { arm: 'Arm 2', status: 'Moving', color: 'text-amber-600' },
                { arm: 'Arm 3', status: 'Ready', color: 'text-emerald-700' },
              ].map((a) => (
                <div
                  key={a.arm}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 last:border-0"
                >
                  <span className="text-slate-700 font-medium">{a.arm}</span>
                  <span className={`font-semibold ${a.color}`}>&bull; {a.status}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-1">
              <div className="text-xs font-bold text-slate-800">Items Sorted (Last Hour)</div>
              <div className="space-y-1.5 text-xs">
                {[
                  { label: 'Organic', val: '42 kg', dot: 'bg-[#0E7A3A]' },
                  { label: 'Plastic', val: '18 kg', dot: 'bg-sky-600' },
                  { label: 'Metal', val: '9 kg', dot: 'bg-slate-400' },
                  { label: 'Other', val: '6 kg', dot: 'bg-amber-500' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                      {item.label}
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* System Health */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">System Health</h2>
            <div className="flex items-center gap-4">
              <DonutChart
                size={88}
                strokeWidth={10}
                centerPrimary="100%"
                segments={[{ label: 'Healthy', value: 100, color: '#0E7A3A' }]}
              />
              <div>
                <div className="text-sm font-bold text-slate-900">All systems operational</div>
                <div className="text-xs text-slate-500 mt-0.5">No critical issues detected.</div>
                <div className="text-[10.5px] text-slate-400 mt-2 tabular-nums">
                  Last updated: Tue, 10 Jun 2025 &middot; 10:42 AM
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom Row: Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0E7A3A]" />
              <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('reports')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            {[
              { time: '10:32 AM', text: 'Temperature back to normal (56.8°C)', badge: 'SUCCESS' },
              { time: '09:17 AM', text: 'Watering cycle completed (2.5 L used)', badge: 'Info' },
              { time: '08:30 AM', text: 'Sorting arm 2 completed cycle', badge: 'Event' },
              { time: '08:15 AM', text: 'Sensor calibration completed', badge: 'Info' },
            ].map((row) => (
              <div key={row.time + row.text} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 tabular-nums w-14 shrink-0">{row.time}</span>
                  <span className="text-slate-800 font-medium">{row.text}</span>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                    row.badge === 'SUCCESS'
                      ? 'bg-emerald-50 text-[#0E7A3A]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {row.badge}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Alerts &amp; Notifications</h2>
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
          <div className="divide-y divide-slate-100 text-xs">
            {[
              { text: 'High temperature in chamber (67.2°C)', time: '10:28 AM', level: 'high' },
              { text: 'Moisture level slightly low (48%)', time: '09:15 AM', level: 'warn' },
              { text: 'Sorting arm 3 calibration completed', time: '08:50 AM', level: 'info' },
              { text: 'New batch detected (CB-024)', time: '08:32 AM', level: 'info' },
            ].map((row) => (
              <div key={row.time + row.text} className="py-2.5 flex items-center justify-between gap-3">
                <span
                  className={`font-medium ${
                    row.level === 'high'
                      ? 'text-rose-600'
                      : row.level === 'warn'
                      ? 'text-amber-700'
                      : 'text-slate-700'
                  }`}
                >
                  {row.text}
                </span>
                <span className="text-slate-400 tabular-nums shrink-0">{row.time}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
