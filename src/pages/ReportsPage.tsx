import React, { useMemo, useState } from 'react';
import {
  Calendar,
  Download,
  Leaf,
  Package,
  Target,
  TrendingUp,
  ChevronRight,
  ArrowRight,
  BarChart3,
  Recycle,
  Cpu,
  Wifi,
  Lightbulb,
} from 'lucide-react';
import { BarLineComboChart } from '../components/Charts';
import {
  REPORT_BATCHES,
  REPORT_CATEGORIES,
  REPORTS_TREND_DAILY,
  REPORTS_TREND_WEEKLY,
} from '../data/imariData';
import { AppRoute } from '../types';

interface ReportsPageProps {
  onNavigate: (route: AppRoute) => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onNavigate }) => {
  const [dateRange, setDateRange] = useState('Jun 1, 2025 - Jun 10, 2025');
  const [batchFilter, setBatchFilter] = useState('All Batches');
  const [componentFilter, setComponentFilter] = useState('All Components');
  const [granularity, setGranularity] = useState<'Daily' | 'Weekly'>('Daily');
  const [activeCategoryId, setActiveCategoryId] = useState('processing');
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const activeCategory =
    REPORT_CATEGORIES.find((c) => c.id === activeCategoryId) || REPORT_CATEGORIES[0];

  const filteredBatches = useMemo(() => {
    if (batchFilter === 'All Batches') return REPORT_BATCHES;
    return REPORT_BATCHES.filter((b) => b.id === batchFilter);
  }, [batchFilter]);

  const trendData = granularity === 'Daily' ? REPORTS_TREND_DAILY : REPORTS_TREND_WEEKLY;

  const handleExportCsv = () => {
    const headers = ['Batch ID', 'Start Date', 'End Date', 'Input (kg)', 'Output (kg)', 'Status'];
    const rows = filteredBatches.map((b) => [
      b.id,
      b.startDate,
      b.endDate,
      String(b.inputKg),
      b.outputKg !== null ? String(b.outputKg) : '-',
      b.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imari-report-${batchFilter.toLowerCase().replace(/\s+/g, '-')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMessage(`Exported ${filteredBatches.length} batch record(s) to CSV.`);
    setTimeout(() => setExportMessage(null), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <p className="text-[11px] font-bold tracking-wider text-[#0E7A3A] uppercase">Reports</p>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
          System Reports &amp; Analytics
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          View performance, track batches, and explore historical data from your waste system.
        </p>
      </div>

      {/* Filter & Export Bar */}
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              aria-label="Date range"
              className="bg-transparent font-medium focus:outline-none cursor-pointer"
            >
              <option value="Jun 1, 2025 - Jun 10, 2025">Jun 1, 2025 - Jun 10, 2025</option>
              <option value="May 1, 2025 - May 31, 2025">May 1, 2025 - May 31, 2025</option>
              <option value="Apr 1, 2025 - Jun 10, 2025">Apr 1, 2025 - Jun 10, 2025</option>
            </select>
          </div>

          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            aria-label="Filter by batch"
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Batches">All Batches</option>
            {REPORT_BATCHES.map((b) => (
              <option key={b.id} value={b.id}>
                {b.id}
              </option>
            ))}
          </select>

          <select
            value={componentFilter}
            onChange={(e) => setComponentFilter(e.target.value)}
            aria-label="Filter by component"
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="All Components">All Components</option>
            <option value="Conveyor">Conveyor</option>
            <option value="Compost Chamber">Compost Chamber</option>
            <option value="Sorting Arms">Sorting Arms</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          {exportMessage && (
            <span className="text-xs font-medium text-emerald-700">{exportMessage}</span>
          )}
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-600/30 text-[#0E7A3A] text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </section>

      {/* 4-Column KPI Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Waste Processed',
            value: '12,480 kg',
            delta: '+12.4%',
            icon: Package,
          },
          {
            label: 'Organic Recovered',
            value: '2,840 kg',
            delta: '+8.7%',
            icon: Leaf,
          },
          {
            label: 'Sorting Efficiency',
            value: '96%',
            delta: '+2.3%',
            icon: Target,
          },
          {
            label: 'Compost Produced',
            value: '1,120 kg',
            delta: '+15.6%',
            icon: TrendingUp,
          },
        ].map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start gap-3"
            >
              <span className="w-9 h-9 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xs text-slate-500">{kpi.label}</div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums mt-0.5">
                  {kpi.value}
                </div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-0.5 tabular-nums">
                  &#9650; {kpi.delta}{' '}
                  <span className="font-normal text-slate-400">vs. previous period</span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Waste Processing Trend & Recent Batches */}
        <div className="lg:col-span-8 space-y-5">
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-sm font-bold text-slate-900">Waste Processing Trend</h2>

              <div className="flex items-center gap-4 text-xs">
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                  Total Processed
                </span>
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-[#15803D]" />
                  Organic Recovered
                </span>
                <select
                  value={granularity}
                  onChange={(e) => setGranularity(e.target.value as 'Daily' | 'Weekly')}
                  aria-label="Chart granularity"
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                </select>
              </div>
            </div>

            <BarLineComboChart
              labels={trendData.labels}
              barValues={trendData.organicRecovered}
              lineValues={trendData.totalProcessed}
              yMax={granularity === 'Daily' ? 2000 : 4000}
            />
          </section>

          {/* Recent Batches Table */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900">Recent Batches</h2>
              <button
                type="button"
                onClick={() => setBatchFilter('All Batches')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
              >
                <span>View all batches</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                    <th className="py-2.5 pr-4">Batch ID</th>
                    <th className="py-2.5 px-3">Start Date</th>
                    <th className="py-2.5 px-3">End Date</th>
                    <th className="py-2.5 px-3 text-right">Input (kg)</th>
                    <th className="py-2.5 px-3 text-right">Output (kg)</th>
                    <th className="py-2.5 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredBatches.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 pr-4 font-bold text-slate-900 tabular-nums">
                        {batch.id}
                      </td>
                      <td className="py-3 px-3 text-slate-600 tabular-nums">{batch.startDate}</td>
                      <td className="py-3 px-3 text-slate-500 tabular-nums">{batch.endDate}</td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800 tabular-nums">
                        {batch.inputKg}
                      </td>
                      <td className="py-3 px-3 text-right font-semibold text-slate-800 tabular-nums">
                        {batch.outputKg !== null ? batch.outputKg : '-'}
                      </td>
                      <td className="py-3 pl-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                            batch.status === 'Processing'
                              ? 'bg-emerald-50 text-[#0E7A3A]'
                              : 'bg-emerald-100/80 text-emerald-800'
                          }`}
                        >
                          {batch.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right: Report Categories, System Performance, Quick Insights */}
        <div className="lg:col-span-4 space-y-5">
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">Report Categories</h2>
            <div className="space-y-2">
              {REPORT_CATEGORIES.map((cat) => {
                const isActive = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategoryId(cat.id)}
                    className={`w-full text-left rounded-xl border p-3 flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#EAF7EF] border-[#CBE9D5] shadow-[0_1px_2px_rgba(14,122,58,0.06)]'
                        : 'bg-white border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-[#0E7A3A] text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {cat.id === 'processing' && <BarChart3 className="w-4 h-4" />}
                        {cat.id === 'compost' && <Recycle className="w-4 h-4" />}
                        {cat.id === 'environment' && <Leaf className="w-4 h-4" />}
                        {cat.id === 'equipment' && <Cpu className="w-4 h-4" />}
                        {cat.id === 'sensors' && <Wifi className="w-4 h-4" />}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 truncate">{cat.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{cat.subtitle}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">
              {activeCategory.id === 'processing' ? 'System Performance' : activeCategory.title}
            </h2>
            <div className="divide-y divide-slate-100 text-xs">
              {activeCategory.metrics.map((m) => (
                <div key={m.label} className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600">{m.label}</span>
                  <div className="flex items-center gap-2 tabular-nums">
                    <span className="font-bold text-slate-900">{m.value}</span>
                    <span className="text-[11px] font-semibold text-emerald-700">
                      &#9650; {m.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-[#0E7A3A]" />
              <h2 className="text-sm font-bold text-slate-900">Quick Insights</h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('compost')}
              className="w-full text-left rounded-xl bg-[#EAF7EF] hover:bg-[#DCF2E4] border border-[#CBE9D5] p-3.5 flex items-center justify-between gap-2 transition-colors cursor-pointer"
            >
              <span className="text-xs text-slate-800 leading-snug">{activeCategory.insight}</span>
              <ChevronRight className="w-4 h-4 text-[#0E7A3A] shrink-0" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
