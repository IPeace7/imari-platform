import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Info,
  Bell,
  Wifi,
  CheckCircle2,
  ArrowRight,
  Calendar,
  MoreHorizontal,
  Activity,
  Download,
  ChevronRight,
  Clock,
  X,
} from 'lucide-react';
import { DonutChart } from '../components/Charts';
import { INITIAL_RECENT_ACTIVITY_TABLE } from '../data/imariData';
import { AlertRecord, AppRoute } from '../types';

interface AlertsPageProps {
  alerts: AlertRecord[];
  onToggleAlertStatus: (id: string) => void;
  onNavigate: (route: AppRoute) => void;
}

type FilterTab = 'All' | 'Alerts' | 'Warnings' | 'Info' | 'Resolved';

export const AlertsPage: React.FC<AlertsPageProps> = ({
  alerts,
  onToggleAlertStatus,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [dateRange, setDateRange] = useState('Jun 10, 2025 - Jun 10, 2025');
  const [diagnosticsOpen, setDiagnosticsOpen] = useState(false);
  const [sensorCheckStatus, setSensorCheckStatus] = useState<string | null>(null);

  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;
  const warningsCount = alerts.filter((a) => a.severity === 'Warning' && a.status === 'Active').length;
  const resolvedCount = alerts.filter((a) => a.status === 'Resolved').length + 4; // matches baseline 5 resolved

  const filteredAlerts = useMemo(() => {
    switch (activeTab) {
      case 'Alerts':
        return alerts.filter((a) => a.status === 'Active');
      case 'Warnings':
        return alerts.filter((a) => a.severity === 'Warning');
      case 'Info':
        return alerts.filter((a) => a.severity === 'Info');
      case 'Resolved':
        return alerts.filter((a) => a.status === 'Resolved');
      default:
        return alerts;
    }
  }, [alerts, activeTab]);

  const handleDownloadAlertReport = () => {
    const headers = ['Time', 'Severity', 'Component', 'Title', 'Detail', 'Status'];
    const rows = alerts.map((a) => [a.time, a.severity, a.component, a.title, a.detail, a.status]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'imari-alerts-report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Top Mint Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-[linear-gradient(108deg,#EFFAF2_0%,#E7F6EC_52%,#D5EEDE_100%)] border border-[#D7ECDD] p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-[0_1px_3px_rgba(15,23,42,0.03)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,transparent_68%)]"
        />
        <div className="relative z-10">
          <p className="text-[11px] font-bold tracking-wider text-[#0E7A3A] uppercase">Alerts</p>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            System Alerts &amp; Notifications
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Monitor critical issues and system events across your waste processing system.
          </p>
        </div>

        <div className="relative z-10 bg-white/95 rounded-xl border border-[#CBE9D5] px-4 py-3 flex items-center gap-3 shrink-0 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
          <CheckCircle2 className="w-5 h-5 text-[#0E7A3A] shrink-0" />
          <div>
            <div className="text-xs font-bold text-slate-900">All systems operating normally</div>
            <div className="text-[11px] text-slate-500">
              No critical issues detected at this time.
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Main Area */}
        <div className="lg:col-span-8 space-y-5">
          {/* 4 Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {activeAlertsCount}
                </div>
                <div className="text-[11px] font-medium text-slate-600">Active Alerts</div>
                <div className="text-[10px] text-amber-600 mt-0.5 tabular-nums">
                  &uarr; 2 since last 24h
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">
                  {warningsCount}
                </div>
                <div className="text-[11px] font-medium text-slate-600">Warnings</div>
                <div className="text-[10px] text-amber-600 mt-0.5 tabular-nums">
                  &uarr; 1 since last 24h
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-[#0E7A3A] flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">12</div>
                <div className="text-[11px] font-medium text-slate-600">System Events</div>
                <div className="text-[10px] text-emerald-700 mt-0.5 tabular-nums">
                  &uarr; 4 since last 24h
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-4 flex items-start gap-3">
              <span className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Wifi className="w-4 h-4" />
              </span>
              <div>
                <div className="text-xl font-extrabold text-slate-900 tabular-nums">1</div>
                <div className="text-[11px] font-medium text-slate-600">Sensor Issue</div>
                <div className="text-[10px] text-slate-400 mt-0.5 tabular-nums">
                  0 since last 24h
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'Alerts', 'Warnings', 'Info', 'Resolved'] as FilterTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#0E7A3A] text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                aria-label="Filter alert date"
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="Jun 10, 2025 - Jun 10, 2025">Jun 10, 2025 - Jun 10, 2025</option>
                <option value="Jun 1, 2025 - Jun 10, 2025">Jun 1, 2025 - Jun 10, 2025</option>
              </select>
            </div>
          </div>

          {/* Active Alerts Table */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-bold text-slate-900">Active Alerts</h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('All')}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#0E7A3A] hover:underline cursor-pointer"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                    <th className="py-2 pr-3">Time</th>
                    <th className="py-2 px-3">Severity</th>
                    <th className="py-2 px-3">Component</th>
                    <th className="py-2 px-3">Message</th>
                    <th className="py-2 px-3 text-right">Status</th>
                    <th className="py-2 pl-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 pr-3 text-slate-500 tabular-nums whitespace-nowrap">
                        {alert.time}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-semibold ${
                            alert.severity === 'Warning'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-[#0E7A3A]'
                          }`}
                        >
                          {alert.severity === 'Warning' ? (
                            <AlertTriangle className="w-3 h-3" />
                          ) : (
                            <Info className="w-3 h-3" />
                          )}
                          {alert.severity}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {alert.component}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-900">{alert.title}</div>
                        <div className="text-[11px] text-slate-500">{alert.detail}</div>
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${
                            alert.status === 'Active'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-emerald-50 text-[#0E7A3A]'
                          }`}
                        >
                          {alert.status}
                        </span>
                      </td>
                      <td className="py-3 pl-2 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => onToggleAlertStatus(alert.id)}
                          title={alert.status === 'Active' ? 'Mark Resolved' : 'Reopen Alert'}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-[11px] font-medium text-slate-600 cursor-pointer"
                        >
                          <span>{alert.status === 'Active' ? 'Resolve' : 'Reopen'}</span>
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAlerts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-slate-500">
                        No alerts match the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Recent Activity Table */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0E7A3A]" />
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

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400">
                    <th className="py-2 pr-3">Time</th>
                    <th className="py-2 px-3">Event</th>
                    <th className="py-2 px-3">Component</th>
                    <th className="py-2 px-3">Details</th>
                    <th className="py-2 pl-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INITIAL_RECENT_ACTIVITY_TABLE.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 pr-3 text-slate-500 tabular-nums whitespace-nowrap">
                        {row.time}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{row.event}</td>
                      <td className="py-2.5 px-3 text-slate-600">{row.component}</td>
                      <td className="py-2.5 px-3 text-slate-600 tabular-nums">{row.details}</td>
                      <td className="py-2.5 pl-3 text-right">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold ${
                            row.status === 'Success'
                              ? 'bg-emerald-50 text-[#0E7A3A]'
                              : 'bg-sky-50 text-sky-700'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Side Column */}
        <div className="lg:col-span-4 space-y-5">
          {/* Alert by Component */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-4">Alert by Component</h2>
            <div className="flex items-center gap-5">
              <DonutChart
                size={104}
                strokeWidth={12}
                centerPrimary={String(alerts.length)}
                centerSecondary="Active"
                segments={[
                  { label: 'Conveyor', value: 2, color: '#0E7A3A' },
                  { label: 'Chamber', value: 1, color: '#D97706' },
                  { label: 'Sorting Arms', value: 1, color: '#F59E0B' },
                  { label: 'Sensors', value: 1, color: '#2563EB' },
                ]}
              />

              <div className="flex-1 space-y-2 text-xs">
                {[
                  { label: 'Conveyor', count: 2, dot: 'bg-[#0E7A3A]' },
                  { label: 'Chamber', count: 1, dot: 'bg-amber-600' },
                  { label: 'Sorting Arms', count: 1, dot: 'bg-amber-400' },
                  { label: 'Sensors', count: 1, dot: 'bg-sky-600' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                      {c.label}
                    </span>
                    <span className="font-bold text-slate-900 tabular-nums">{c.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Alerts by Severity */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-3">
            <h2 className="text-sm font-bold text-slate-900">Alerts by Severity</h2>
            <div className="space-y-3 text-xs">
              {[
                { label: 'High', count: 0, width: '0%', barColor: 'bg-rose-500', textColor: 'text-rose-600' },
                { label: 'Warning', count: 3, width: '60%', barColor: 'bg-amber-500', textColor: 'text-amber-600' },
                { label: 'Info', count: 1, width: '25%', barColor: 'bg-[#0E7A3A]', textColor: 'text-[#0E7A3A]' },
                { label: 'Resolved', count: resolvedCount, width: '85%', barColor: 'bg-slate-400', textColor: 'text-slate-600' },
              ].map((s) => (
                <div key={s.label} className="grid grid-cols-12 items-center gap-2">
                  <span className={`col-span-4 font-medium ${s.textColor}`}>{s.label}</span>
                  <div className="col-span-6 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className={`h-full rounded-full ${s.barColor}`} style={{ width: s.width }} />
                  </div>
                  <span className="col-span-2 text-right font-bold text-slate-900 tabular-nums">
                    {s.count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* System Health */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5">
            <h2 className="text-sm font-bold text-slate-900 mb-3">System Health</h2>
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-full bg-[#0E7A3A] text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </span>
              <div>
                <div className="text-[11px] text-slate-400">Overall Status</div>
                <div className="text-base font-extrabold text-slate-900">Healthy</div>
                <p className="text-xs text-slate-500 mt-0.5">
                  All systems operating within normal range.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="bg-white rounded-2xl border border-slate-200/80 p-5 space-y-2.5">
            <h2 className="text-sm font-bold text-slate-900 mb-2">Quick Actions</h2>

            <button
              type="button"
              onClick={() => setDiagnosticsOpen(true)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#0E7A3A]" />
                View System Diagnostics
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={() => {
                setSensorCheckStatus('All 12/12 sensors responded within 18ms (Demo).');
                setTimeout(() => setSensorCheckStatus(null), 3500);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Wifi className="w-3.5 h-3.5 text-[#0E7A3A]" />
                Check Sensor Status
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            <button
              type="button"
              onClick={handleDownloadAlertReport}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs font-semibold text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5 text-[#0E7A3A]" />
                Download Alert Report
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {sensorCheckStatus && (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px] font-medium text-emerald-800">
                {sensorCheckStatus}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* System Diagnostics Modal */}
      {diagnosticsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">System Diagnostics (Demo)</h3>
              <button
                type="button"
                onClick={() => setDiagnosticsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              {[
                { name: 'Conveyor Drive Motor', status: 'Nominal (1.2 m/s)' },
                { name: 'Optical Entry Sensor', status: 'Online (99.4% accuracy)' },
                { name: 'Sorting Arms 1–3', status: 'Calibrated & Ready' },
                { name: 'Compost Chamber CB-024 Probes', status: '56.8°C · 62% · 78% O₂' },
              ].map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5"
                >
                  <span className="font-semibold text-slate-800">{d.name}</span>
                  <span className="text-emerald-700 font-medium">{d.status}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setDiagnosticsOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#0E7A3A] text-white text-xs font-semibold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
