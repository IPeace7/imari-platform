import React, { useState } from 'react';
import {
  Clock,
  ChevronRight,
  Gauge,
  Radio,
  Cpu,
  Target,
  Play,
  Pause,
  Square,
  RotateCcw,
  Leaf,
  Package,
  Wrench,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  MoreHorizontal,
} from 'lucide-react';
import { DonutChart } from '../components/Charts';
import { INITIAL_CONVEYOR_EVENTS, INITIAL_SORTING_ARMS } from '../data/imariData';
import { AppRoute, ConveyorEventItem, SortingArmItem, SystemRunState } from '../types';

interface ConveyorPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const ConveyorPage: React.FC<ConveyorPageProps> = ({ onNavigate }) => {
  const [runState, setRunState] = useState<SystemRunState>('Running');
  const [speed, setSpeed] = useState<string>('1.2 m/s');
  const [arms, setArms] = useState<SortingArmItem[]>(INITIAL_SORTING_ARMS);
  const [events, setEvents] = useState<ConveyorEventItem[]>(INITIAL_CONVEYOR_EVENTS);
  const [lastUpdated, setLastUpdated] = useState('Tue, 10 Jun 2025 · 10:42 AM');
  const [controlFeedback, setControlFeedback] = useState<string | null>(null);

  const pushEvent = (
    title: string,
    description: string,
    severity: ConveyorEventItem['severity']
  ) => {
    const nowLabel = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEvents((prev) => [
      {
        id: `ce-${Date.now()}`,
        title,
        description,
        time: nowLabel,
        severity,
      },
      ...prev.slice(0, 4),
    ]);
    setLastUpdated(`Updated ${nowLabel} (Simulated)`);
  };

  const handleControl = (action: 'start' | 'pause' | 'stop' | 'reset') => {
    if (action === 'start') {
      setRunState('Running');
      setSpeed('1.2 m/s');
      setArms((prev) => prev.map((a) => ({ ...a, status: 'Active' })));
      setControlFeedback('Conveyor line running at 1.2 m/s.');
      pushEvent('Conveyor started', 'Line speed resumed to 1.2 m/s', 'Success');
    } else if (action === 'pause') {
      setRunState('Paused');
      setSpeed('0.0 m/s');
      setArms((prev) => prev.map((a) => ({ ...a, status: 'Paused' })));
      setControlFeedback('Conveyor paused. Sorting arms on standby.');
      pushEvent('Conveyor paused', 'Operator paused automated sorting', 'Info');
    } else if (action === 'stop') {
      setRunState('Stopped');
      setSpeed('0.0 m/s');
      setArms((prev) => prev.map((a) => ({ ...a, status: 'Standby' })));
      setControlFeedback('Emergency/operator stop engaged.');
      pushEvent('Conveyor stopped', 'Line halted by operator control', 'Warning');
    } else {
      setRunState('Running');
      setSpeed('1.2 m/s');
      setArms(INITIAL_SORTING_ARMS);
      setEvents(INITIAL_CONVEYOR_EVENTS);
      setControlFeedback('Conveyor & sorting arms reset to baseline.');
    }
  };

  const toggleArmStatus = (armId: string) => {
    setArms((prev) =>
      prev.map((arm) =>
        arm.id === armId
          ? { ...arm, status: arm.status === 'Active' ? 'Paused' : 'Active' }
          : arm
      )
    );
  };

  const severityStyle = (sev: ConveyorEventItem['severity']) => {
    switch (sev) {
      case 'Normal':
        return 'bg-emerald-50 text-emerald-700';
      case 'Info':
        return 'bg-sky-50 text-sky-700';
      case 'Success':
        return 'bg-emerald-100 text-emerald-800';
      case 'Warning':
        return 'bg-amber-50 text-amber-700';
      case 'Critical':
        return 'bg-rose-50 text-rose-700';
    }
  };

  const dotStyle = (sev: ConveyorEventItem['severity']) => {
    switch (sev) {
      case 'Normal':
      case 'Success':
        return 'bg-emerald-500';
      case 'Info':
        return 'bg-sky-500';
      case 'Warning':
        return 'bg-amber-500';
      case 'Critical':
        return 'bg-rose-500';
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Mint Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-[linear-gradient(108deg,#EFFAF2_0%,#E7F6EC_52%,#D5EEDE_100%)] border border-[#D7ECDD] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,transparent_68%)]"
        />
        <div className="relative z-10 space-y-1.5">
          <p className="text-[11px] font-bold tracking-wider text-[#0E7A3A] uppercase">
            Conveyor System
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-extrabold text-slate-900">Automated Waste Sorting</h1>
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                runState === 'Running'
                  ? 'bg-emerald-100 text-emerald-800'
                  : runState === 'Paused'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  runState === 'Running'
                    ? 'bg-emerald-600'
                    : runState === 'Paused'
                    ? 'bg-amber-600'
                    : 'bg-rose-600'
                }`}
              />
              {runState}
            </span>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl">
            Monitors the movement of waste across the conveyor line and manages the sorting process
            using intelligent sensors and arms.
          </p>
        </div>

        <div className="relative z-10 bg-white/95 rounded-xl border border-[#D7ECDD] px-4 py-2.5 flex items-center gap-3 shrink-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <Clock className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-[10.5px] text-slate-400">Last updated</div>
            <div className="text-xs font-semibold text-slate-800 tabular-nums">{lastUpdated}</div>
          </div>
        </div>
      </section>

      {/* 4-Column KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Gauge className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Conveyor</div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums mt-0.5">
                {speed}
              </div>
              <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {runState}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Radio className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Entry Sensor</div>
              <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                {runState === 'Stopped' ? 'Standby' : 'Online'}
              </div>
              <div className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {runState === 'Stopped' ? 'Idle' : 'Detecting waste'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Sorting Arms</div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums mt-0.5">
                {arms.length} arms
              </div>
              <div className="text-[10.5px] text-slate-500 space-y-0.5 mt-0.5">
                {arms.map((arm) => (
                  <div key={arm.id} className="flex items-center justify-between gap-4">
                    <span>{arm.name}</span>
                    <span
                      className={
                        arm.status === 'Active'
                          ? 'text-emerald-700 font-semibold'
                          : 'text-amber-600 font-semibold'
                      }
                    >
                      {arm.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Sorting Performance</div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums mt-0.5">96%</div>
              <div className="text-[11px] text-slate-500 tabular-nums mt-0.5">
                1,248 items processed
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      </section>

      {/* Middle Row: Sorting Arms & System Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sorting Arms */}
        <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#0E7A3A]" />
              <h2 className="text-sm font-bold text-slate-900">Sorting Arms</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('monitor')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {arms.map((arm) => {
              const cardBg =
                arm.accent === 'green'
                  ? 'bg-[#EFFAF3] border-[#D7ECDD]'
                  : arm.accent === 'blue'
                  ? 'bg-[#F2F7FF] border-sky-100'
                  : 'bg-[#F8FAFC] border-slate-200/80';

              const iconBadge =
                arm.accent === 'green'
                  ? 'bg-emerald-100 text-emerald-700'
                  : arm.accent === 'blue'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-slate-200 text-slate-700';

              const categoryColor =
                arm.accent === 'green'
                  ? 'text-emerald-700'
                  : arm.accent === 'blue'
                  ? 'text-sky-700'
                  : 'text-slate-700';

              return (
                <div key={arm.id} className={`rounded-xl border p-4 space-y-3 ${cardBg}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBadge}`}
                      >
                        {arm.category === 'Organic' && <Leaf className="w-4 h-4" />}
                        {arm.category === 'Plastic' && <Package className="w-4 h-4" />}
                        {arm.category === 'Metal' && <Wrench className="w-4 h-4" />}
                      </span>
                      <div>
                        <div className="text-[11px] font-semibold text-slate-500">{arm.name}</div>
                        <div className="text-sm font-bold text-slate-900">{arm.title}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleArmStatus(arm.id)}
                      title={`Toggle ${arm.name} state`}
                      className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-white/70 cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        arm.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                    />
                    {arm.status}
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="text-[11px] text-slate-400">Assigned category</div>
                    <div className={`font-bold ${categoryColor}`}>{arm.category}</div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60">
                    <div className="text-[11px] text-slate-400">Successful sorts</div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                        {arm.successfulSorts}
                      </span>
                      <span className={`text-[11px] font-semibold tabular-nums ${categoryColor}`}>
                        {arm.sharePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* System Controls */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="w-4 h-4 text-[#0E7A3A]" />
              <h2 className="text-sm font-bold text-slate-900">System Controls</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleControl('start')}
                className="h-12 rounded-xl bg-[#0E7A3A] hover:bg-[#0B632E] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Start</span>
              </button>
              <button
                type="button"
                onClick={() => handleControl('pause')}
                className="h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
              <button
                type="button"
                onClick={() => handleControl('stop')}
                className="h-12 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-100 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
              <button
                type="button"
                onClick={() => handleControl('reset')}
                className="h-12 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-slate-50 border border-slate-100 px-3 py-2 text-[11px] text-slate-500">
            {controlFeedback || 'Simulated control panel: actions update line state in real time.'}
          </div>
        </section>
      </div>

      {/* Bottom Row: Waste Processing & Outputs + Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Waste Processing & Outputs */}
        <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#0E7A3A]" />
            <h2 className="text-sm font-bold text-slate-900">Waste Processing &amp; Outputs</h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#EFFAF3] border border-[#D7ECDD] p-3.5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white text-[#0E7A3A] flex items-center justify-center border border-[#D7ECDD]">
                <Package className="w-4 h-4" />
              </span>
              <div>
                <div className="text-[11px] text-slate-500">Total Detected</div>
                <div className="text-base font-extrabold text-slate-900 tabular-nums">
                  1,248 <span className="text-xs font-medium text-slate-500">items</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-[#F4F8FF] border border-sky-100 p-3.5 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white text-sky-600 flex items-center justify-center border border-sky-100">
                <CheckCircle2 className="w-4 h-4" />
              </span>
              <div>
                <div className="text-[11px] text-slate-500">Total Sorted</div>
                <div className="text-base font-extrabold text-slate-900 tabular-nums">
                  1,201 <span className="text-xs font-medium text-slate-500">items</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-800 mb-3">Sorting Output by Category</h3>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <DonutChart
                size={132}
                strokeWidth={16}
                centerPrimary="1,201"
                centerSecondary="sorted items"
                segments={[
                  { label: 'Organic', value: 642, color: '#0E7A3A' },
                  { label: 'Plastic', value: 387, color: '#2563EB' },
                  { label: 'Metal', value: 219, color: '#94A3B8' },
                ]}
              />

              <div className="flex-1 w-full space-y-3">
                {[
                  { label: 'Organic', weight: '642 kg', pct: '53.2%', width: '53.2%', color: 'bg-[#0E7A3A]' },
                  { label: 'Plastic', weight: '387 kg', pct: '32.2%', width: '32.2%', color: 'bg-sky-600' },
                  { label: 'Metal', weight: '219 kg', pct: '14.6%', width: '14.6%', color: 'bg-slate-400' },
                ].map((row) => (
                  <div key={row.label} className="grid grid-cols-12 items-center gap-2 text-xs">
                    <div className="col-span-4 flex items-center gap-2 font-medium text-slate-700">
                      <span className={`w-2 h-2 rounded-full ${row.color}`} />
                      <span>{row.label}</span>
                    </div>
                    <div className="col-span-3 font-bold text-slate-900 tabular-nums text-right">
                      {row.weight}
                    </div>
                    <div className="col-span-2 text-slate-400 tabular-nums text-right">
                      {row.pct}
                    </div>
                    <div className="col-span-3 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: row.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Activity & Alerts */}
        <section className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#0E7A3A]" />
              <h2 className="text-sm font-bold text-slate-900">Recent Activity &amp; Alerts</h2>
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

          <div className="divide-y divide-slate-100">
            {events.map((ev) => (
              <div key={ev.id} className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotStyle(ev.severity)}`} />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{ev.title}</div>
                    <div className="text-[11px] text-slate-500">{ev.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-400 tabular-nums">{ev.time}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10.5px] font-semibold ${severityStyle(
                      ev.severity
                    )}`}
                  >
                    {ev.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
