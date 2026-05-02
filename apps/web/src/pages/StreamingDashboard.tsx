import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Zap, 
  Activity, 
  Layers, 
  Server,
  ArrowUpRight,
  TrendingDown,
  Clock,
  HardDrive,
  ShieldCheck,
  Globe,
  Database,
  CloudLightning,
  ChevronRight
} from 'lucide-react';

const throughputData = [
  { name: '10:00', ingress: 450, egress: 420 },
  { name: '10:05', ingress: 520, egress: 510 },
  { name: '10:10', ingress: 480, egress: 460 },
  { name: '10:15', ingress: 610, egress: 590 },
  { name: '10:20', ingress: 550, egress: 540 },
  { name: '10:25', ingress: 580, egress: 570 },
];

const KPI_CARDS = [
  { title: 'Throughput', value: '1.2M', trend: '+12%', color: 'cyan', icon: CloudLightning },
  { title: 'Avg Latency', value: '4.2ms', trend: '-0.5ms', color: 'emerald', icon: Activity },
  { title: 'Active Topics', value: '124', trend: '+3 new', color: 'cyan', icon: Layers },
  { title: 'Broker Health', value: 'OPTIMAL', trend: 'L3 Cluster', color: 'cyan', icon: Server },
];

const StreamingDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Streaming Ingestion Hub</h1>
          <p className="text-slate-400">Real-time data flow orchestration and streaming intelligence.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Scale Cluster
          </button>
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            New Ingestion Point
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-cyan-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-cyan-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') || card.trend === 'OPTIMAL' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Throughput Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Cluster Throughput (Events/sec)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughputData}>
                <defs>
                  <linearGradient id="colorIngress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="ingress" stroke="#22d3ee" fill="url(#colorIngress)" name="Ingress" />
                <Area type="monotone" dataKey="egress" stroke="#10b981" fill="transparent" strokeDasharray="5 5" name="Egress" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topic Health */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Topic Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'user-clicks', value: 92, color: 'bg-cyan-500' },
              { name: 'billing-events', value: 78, color: 'bg-cyan-500' },
              { name: 'system-logs', value: 45, color: 'bg-cyan-500' },
              { name: 'auth-attempts', value: 12, color: 'bg-amber-500' },
            ].map((topic) => (
              <div key={topic.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{topic.name}</span>
                  <span className="text-slate-400">{topic.value} p/s</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${topic.color}`} style={{ width: `${topic.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Topics Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active Stream Topics</h3>
          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View Schema Registry</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Topic ID</th>
                <th className="px-6 py-4 font-semibold">Partitions</th>
                <th className="px-6 py-4 font-semibold">Replication</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Retention</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'telemetry.raw', partitions: 12, repl: 3, status: 'HEALTHY', ret: '24h' },
                { id: 'orders.verified', partitions: 8, repl: 3, status: 'HEALTHY', ret: '7d' },
                { id: 'analytics.sessions', partitions: 24, repl: 2, status: 'LAGGING', ret: '4h' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.id}</td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-300">{row.partitions}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{row.repl}x</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      'text-amber-400 border-amber-500/20 bg-amber-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{row.ret}</td>
                  <td className="px-6 py-4">
                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StreamingDashboard;
