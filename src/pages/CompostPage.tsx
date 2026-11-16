import React, { useState } from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Activity,
  ChevronRight,
  ArrowRight,
  Play,
  Pause,
  RotateCw,
  AlertTriangle,
  CheckCircle2,
  Package,
  Layers,
  Clock,
} from 'lucide-react';
import { DonutChart, SmoothAreaLineChart } from '../components/Charts';
import { COMPOST_ALERTS, DECOMPOSITION_SERIES } from '../data/imariData';
import { AppRoute } from '../types';

interface CompostPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const CompostPage: React.FC<CompostPageProps> = ({ onNavigate }) => {
  const [processingActive, setProcessingActive] = useState(true);
  const [temperature, setTemperature] = useState(56.8);
  const [moisture, setMoisture] = useState(62);
  const [oxygen, setOxygen] = useState(78);
  const [actionNote, setActionNote] = useState<string | null>(null);

  const handleWatering = () => {
    setMoisture((m) => Math.min(70, m + 2));
    setActionNote('Simulated watering cycle triggered (+2% moisture).');
  };

  const handleAeration = () => {
    setOxygen((o) => Math.min(85, o + 2));
    setTemperature((t) => Number((t - 0.4).toFixed(1)));
    setActionNote('Chamber aeration activated (+2% oxygen, cooling -0.4°C).');
  };

  const handleTurning = () => {
    setActionNote('Organic turning drum cycle initiated for Batch CB-024.');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner + Decomposition Progress Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="relative overflow-hidden lg:col-span-8 rounded-2xl bg-[linear-gradient(108deg,#EFFAF2_0%,#E7F6EC_52%,#D5EEDE_100%)] border border-[#D7ECDD] p-5 sm:p-6 flex flex-col justify-between gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 w-64 h-64 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,transparent_68%)]"
          />
          <div className="relative z-10">
            <p className="text-[11px] font-bold tracking-wider text-[#0E7A3A] uppercase">
              Composting System
            </p>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Composting System</h1>
            <p className="text-xs text-slate-600 mt-1">
              Monitor the decomposition process and manage composting conditions in real time.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center gap-2.5 text-xs">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold ${
                processingActive
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  processingActive ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
              />
              {processingActive ? 'Active' : 'Paused'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 border border-emerald-100 font-semibold text-slate-700 tabular-nums">
              Current Batch: CB-024
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-semibold text-[#0E7A3A]">
              Thermophilic Phase
            </span>
          </div>
        </section>

        <section
          onClick={() => onNavigate('monitor')}
          className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between cursor-pointer hover:border-emerald-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Decomposition Progress</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
          <div className="my-2">
            <div className="text-3xl font-extrabold text-slate-900 tabular-nums">68%</div>
            <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden mt-3">
              <div className="h-full bg-[#0E7A3A] rounded-full" style={{ width: '68%' }} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Est. completion: 2 days left</span>
          </div>
        </section>
      </div>

      {/* 4-Column Sensor KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Thermometer className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Temperature</div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                {temperature}°C
              </div>
              <div className="text-[11px] font-medium text-emerald-700 mt-0.5">
                &bull; Within range
              </div>
              <div className="text-[10.5px] text-slate-400 tabular-nums">Range: 50 – 65°C</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Moisture</div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                {moisture}%
              </div>
              <div className="text-[11px] font-medium text-emerald-700 mt-0.5">&bull; Optimal</div>
              <div className="text-[10.5px] text-slate-400 tabular-nums">Range: 50 – 70%</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Air / Oxygen</div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                {oxygen}%
              </div>
              <div className="text-[11px] font-medium text-emerald-700 mt-0.5">&bull; Good</div>
              <div className="text-[10.5px] text-slate-400 tabular-nums">Optimal: 70 – 85%</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs text-slate-500">Biological Activity</div>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">High</div>
              <div className="text-[11px] font-medium text-emerald-700 mt-0.5">&bull; Active</div>
              <div className="text-[10.5px] text-slate-400 tabular-nums">Progress: 84%</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300" />
        </div>
      </section>

      {/* Middle Row: Decomposition Progress Chart + Process Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-900">Decomposition Progress</h2>
            <button
              type="button"
              onClick={() => onNavigate('monitor')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Current Batch</span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#0E7A3A] font-bold tabular-nums">
                CB-024
              </span>
            </div>
            <div>
              <span className="text-slate-400 mr-1.5">Started:</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                Mon, 9 Jun 2025 &middot; 06:30 AM
              </span>
            </div>
            <div>
              <span className="text-slate-400 mr-1.5">Elapsed Time:</span>
              <span className="font-bold text-slate-900 tabular-nums">2d 2h 12m</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-4 text-[11px] font-medium text-slate-600 mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0E7A3A]" />
                  Temperature (°C)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  Moisture (%)
                </span>
              </div>
              <SmoothAreaLineChart
                labels={DECOMPOSITION_SERIES.labels}
                series={[
                  {
                    name: 'Temperature',
                    color: '#0E7A3A',
                    values: DECOMPOSITION_SERIES.temperature,
                  },
                  {
                    name: 'Moisture',
                    color: '#0EA5E9',
                    values: DECOMPOSITION_SERIES.moisture,
                    fillArea: false,
                  },
                ]}
                height={185}
                yMin={40}
                yMax={80}
                yTicks={[40, 50, 60, 70, 80]}
              />
            </div>

            <div className="md:col-span-4 space-y-3 rounded-xl bg-[#F1FAF4] border border-[#D7ECDD] p-4">
              <div>
                <div className="text-[11px] text-slate-400">Current Temp.</div>
                <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                  {temperature}°C
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-100/80">
                <div className="text-[11px] text-slate-400">Current Moisture</div>
                <div className="text-lg font-extrabold text-slate-900 tabular-nums">
                  {moisture}%
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-100/80">
                <div className="text-[11px] text-slate-400">Estimated Completion</div>
                <div className="text-xs font-bold text-[#0E7A3A] mt-0.5 tabular-nums">
                  Tue, 17 Jun 2025
                </div>
                <div className="text-[11px] text-slate-500">~2 days left</div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Controls */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 flex flex-col justify-between space-y-3">
          <div className="space-y-2.5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Process Controls</h2>

            <button
              type="button"
              onClick={() => {
                setProcessingActive(true);
                setActionNote('Compost chamber processing active.');
              }}
              className="w-full h-11 rounded-xl bg-[#0E7A3A] hover:bg-[#0B632E] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Processing</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setProcessingActive(false);
                setActionNote('Chamber processing paused.');
              }}
              className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </button>

            <button
              type="button"
              onClick={handleWatering}
              className="w-full h-10 px-3.5 rounded-xl bg-[#F4F8FF] hover:bg-sky-50 border border-sky-100 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Droplets className="w-3.5 h-3.5 text-sky-600" />
                <span>Start Watering</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={handleAeration}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <Wind className="w-3.5 h-3.5 text-[#0E7A3A]" />
                <span>Activate Aeration</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={handleTurning}
              className="w-full h-10 px-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-slate-700 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="inline-flex items-center gap-2">
                <RotateCw className="w-3.5 h-3.5 text-slate-600" />
                <span>Start Turning Cycle</span>
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {actionNote && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-[11px] font-medium text-emerald-800">
              {actionNote}
            </div>
          )}
        </section>
      </div>

      {/* Bottom 3-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Chamber Capacity */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Chamber Capacity</h2>
            <button
              type="button"
              onClick={() => onNavigate('monitor')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <DonutChart
              size={110}
              strokeWidth={13}
              centerPrimary="72%"
              centerSecondary="Filled"
              segments={[
                { label: 'Filled', value: 72, color: '#0E7A3A' },
                { label: 'Remaining', value: 28, color: '#E2E8F0' },
              ]}
            />

            <div className="flex-1 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Organic waste quantity</span>
                <span className="font-bold text-slate-900 tabular-nums">220 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Remaining capacity</span>
                <span className="font-bold text-slate-900 tabular-nums">180 kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Total capacity</span>
                <span className="font-bold text-slate-900 tabular-nums">500 kg</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200/70 px-3.5 py-2.5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-amber-900">Near full</div>
              <div className="text-[11px] text-amber-800">
                Chamber is 72% full. Consider next batch soon.
              </div>
            </div>
          </div>
        </section>

        {/* Alerts & Notifications */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900">Alerts &amp; Notifications</h2>
              <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10.5px] font-bold tabular-nums">
                3
              </span>
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

          <div className="space-y-2.5">
            {COMPOST_ALERTS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('alerts')}
                className="w-full text-left rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-100 p-3 flex items-center justify-between gap-2 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  {item.level === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        item.level === 'warning' ? 'text-rose-500' : 'text-amber-500'
                      }`}
                    />
                  )}
                  <div>
                    <div className="text-xs font-bold text-slate-800">{item.title}</div>
                    <div className="text-[11px] text-slate-500">{item.subtitle}</div>
                  </div>
                </div>
                <span className="text-[10.5px] text-slate-400 tabular-nums shrink-0">
                  {item.time}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Compost Output */}
        <section className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Compost Output</h2>
            <button
              type="button"
              onClick={() => onNavigate('reports')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
            >
              <span>View details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#EFFAF3] border border-[#D7ECDD] p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Package className="w-3.5 h-3.5 text-[#0E7A3A]" />
                <span>Total Compost Produced</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-2">412 kg</div>
            </div>

            <div className="rounded-xl bg-[#F8FAFC] border border-slate-200/80 p-3.5">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>Completed Batches</span>
              </div>
              <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-2">8</div>
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200/80 px-4 py-3 flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-500">Ready for Collection</div>
              <div className="text-lg font-extrabold text-slate-900 tabular-nums">120 kg</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-[#0E7A3A] text-[11px] font-semibold">
              Queued
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
