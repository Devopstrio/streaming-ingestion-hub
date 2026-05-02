import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import StreamingDashboard from './pages/StreamingDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400">The distributed streaming engine is currently orchestrating partition replicas and managing schema evolution. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<StreamingDashboard />} />
          <Route path="/topics" element={<Placeholder name="Topic Explorer & Partition Management" />} />
          <Route path="/ingestion" element={<Placeholder name="Source Connector Configuration" />} />
          <Route path="/processing" element={<Placeholder name="Real-time Transformation Rules" />} />
          <Route path="/routing" element={<Placeholder name="Sink Routing Logic" />} />
          <Route path="/quality" element={<Placeholder name="Data Quality & Anomaly Detection" />} />
          <Route path="/metrics" element={<Placeholder name="Cluster Observability" />} />
          <Route path="/storage" element={<Placeholder name="Stream Retention & Archival" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
