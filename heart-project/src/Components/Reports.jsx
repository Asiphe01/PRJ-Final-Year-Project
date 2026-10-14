import React, { useMemo, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';


function lastDays(n) {
  return Array.from({ length: n }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (n - 1 - i));
    return d.toISOString().slice(0, 10);
  });
}

function build(hr, glucose, sys, flags = {}) {
  const days = lastDays(hr.length);
  return days.map((date, i) => ({
    date,
    hr: hr[i],
    glucose: glucose[i],
    sys: sys[i],
    dia: Math.round(sys[i] * 0.64),
    ecg: flags[i] || 'Normal',
  }));
}

const PLAYERS = [
  { id: 1, name: 'Jazzy Smith', age: 22, records: build(
      [72, 75, 70, 78, 74, 105, 88], [5.2, 5.4, 5.1, 5.6, 5.3, 5.5, 5.4],
      [108, 110, 112, 110, 109, 118, 110], { 5: 'Tachycardia' }) },
  { id: 2, name: 'Peter Adams', age: 24, records: build(
      [68, 70, 66, 72, 69, 71, 70], [5.0, 5.1, 4.9, 5.2, 5.0, 5.1, 5.0],
      [118, 120, 119, 121, 120, 118, 119]) },
  { id: 3, name: 'Thandi Mokoena', age: 27, records: build(
      [84, 88, 92, 95, 97, 99, 96], [6.1, 6.4, 6.8, 7.0, 7.2, 7.1, 7.0],
      [124, 128, 131, 133, 135, 132, 134], { 6: 'Irregular rhythm' }) },
  { id: 4, name: 'Liam Naidoo', age: 31, records: build(
      [74, 76, 118, 124, 112, 96, 92], [5.5, 5.6, 5.8, 6.0, 5.9, 5.7, 5.6],
      [126, 128, 144, 148, 142, 136, 130], { 2: 'Tachycardia', 3: 'Tachycardia', 4: 'Tachycardia' }) },
  { id: 5, name: 'Sipho Dlamini', age: 45, records: build(
      [88, 92, 96, 101, 104, 108, 106], [7.4, 7.8, 8.1, 8.4, 8.2, 8.6, 8.3],
      [138, 142, 144, 146, 148, 150, 147],
      { 2: 'Irregular rhythm', 3: 'Irregular rhythm', 4: 'Irregular rhythm', 5: 'Tachycardia', 6: 'Tachycardia' }) },
  { id: 6, name: 'Amara Okafor', age: 19, records: build(
      [64, 66, 63, 65, 67, 64, 65], [4.8, 4.9, 4.7, 4.8, 5.0, 4.9, 4.8],
      [112, 114, 111, 113, 115, 112, 113]) },
];

const STATUS_LABEL = { stable: 'Stable', watch: 'Monitor', attention: 'Needs attention' };

function getStatus(r) {
  if (r.hr > 100 || r.hr < 50 || r.glucose > 7.8 || r.glucose < 3.9 || r.sys >= 140) return 'attention';
  if (r.hr > 90 || r.glucose > 6.9 || r.sys >= 130 || r.ecg !== 'Normal') return 'watch';
  return 'stable';
}

const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;
const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
const initials = (name) => name.split(' ').map((n) => n[0]).join('');

const METRICS = {
  hr:      { label: 'Heart rate', key: 'hr',      unit: 'bpm',    color: '#ff4d4d', domain: [40, 130] },
  glucose: { label: 'Glucose',    key: 'glucose', unit: 'mmol/L', color: '#4da6ff', domain: [3, 10] },
  ecg:     { label: 'ECG',        color: '#00d2ff' },
};

function ecgWaveform(bpm) {
  const beat = [0, 0.1, 0.2, 0.1, 0, -0.15, 1.6, -0.4, 0, 0.25, 0.45, 0.25, 0];
  const gap = Math.max(2, Math.round(1800 / bpm) - beat.length);
  const out = [];
  for (let b = 0; b < 4; b++) {
    beat.forEach((v) => out.push({ v }));
    for (let i = 0; i < gap; i++) out.push({ v: 0 });
  }
  return out;
}

function Reports({ profile }) {
  const userRole = (profile?.role || '').toLowerCase();
  const loggedInName = profile?.fullName || '';
  const isCoach = userRole === 'coach';

  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [metric, setMetric] = useState('hr');
  const [range, setRange] = useState(7);

  const players = useMemo(
    () => PLAYERS.map((p) => ({ ...p, status: getStatus(p.records[p.records.length - 1]) })),
    []
  );

  const myPlayerId = useMemo(() => {
    const match = PLAYERS.find((p) => p.name.toLowerCase() === loggedInName.toLowerCase());
    return match ? match.id : null;
  }, [loggedInName]);

  const [selectedId, setSelectedId] = useState(isCoach ? PLAYERS[0].id : myPlayerId);

  const counts = {
    all: players.length,
    stable: players.filter((p) => p.status === 'stable').length,
    watch: players.filter((p) => p.status === 'watch').length,
    attention: players.filter((p) => p.status === 'attention').length,
  };

  const visible = isCoach
    ? players.filter(
        (p) =>
          (filter === 'all' || p.status === filter) &&
          p.name.toLowerCase().includes(query.toLowerCase())
      )
    : players.filter((p) => p.id === myPlayerId);

  const selected = isCoach
    ? players.find((p) => p.id === selectedId) || players[0]
    : players.find((p) => p.id === myPlayerId);

  if (!isCoach && !selected) {
    return (
      <div className="rp-page">
        <div className="rp-card">
          <h2 className="pd-title">No records found</h2>
          <p className="rp-empty">
            We couldn't find health records matching your account name ({loggedInName || 'unknown'}).
          </p>
        </div>
      </div>
    );
  }

  const records = selected.records.slice(-range);
  const latest = records[records.length - 1];
  const hrs = records.map((r) => r.hr);
  const glus = records.map((r) => r.glucose);
  const sysArr = records.map((r) => r.sys);
  const diaArr = records.map((r) => r.dia);
  const flagged = records.filter((r) => r.ecg !== 'Normal').length;

  const summaryRows = [
    {
      label: 'Heart rate',
      latest: `${latest.hr} bpm`,
      avg: `${Math.round(avg(hrs))} bpm`,
      range: `${Math.min(...hrs)}–${Math.max(...hrs)}`,
    },
    {
      label: 'Blood pressure',
      latest: `${latest.sys}/${latest.dia}`,
      avg: `${Math.round(avg(sysArr))}/${Math.round(avg(diaArr))}`,
      range: `${Math.min(...sysArr)}–${Math.max(...sysArr)} sys`,
    },
    {
      label: 'Glucose',
      latest: `${latest.glucose.toFixed(1)} mmol/L`,
      avg: `${avg(glus).toFixed(1)} mmol/L`,
      range: `${Math.min(...glus).toFixed(1)}–${Math.max(...glus).toFixed(1)}`,
    },
    {
      label: 'ECG flagged',
      latest: latest.ecg,
      avg: `${flagged} of ${records.length} readings`,
      range: '—',
    },
  ];

  const m = METRICS[metric];
  const chartData = records.map((r) => ({ ...r, label: fmtDate(r.date) }));

  const filterTabs = [
    ['all', 'All'],
    ['stable', 'Stable'],
    ['watch', 'Monitor'],
    ['attention', 'Needs attention'],
  ];

  return (
    <div className="rp-page">
      <div className="rp-card">
        <div className="rp-header">
          <div>
            <span className="pd-subtitle">{isCoach ? 'Coach view' : 'Athlete view'}</span>
            <h2 className="pd-title">{isCoach ? 'Player Health Reports' : 'My Health Report'}</h2>
          </div>

          {isCoach && (
            <div className="rp-header-controls">
              <input
                className="rp-search"
                placeholder="Search player..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="rp-tabs">
                {filterTabs.map(([key, label]) => (
                  <button
                    key={key}
                    className={`rp-tab ${filter === key ? 'active' : ''}`}
                    onClick={() => setFilter(key)}
                  >
                    {label} <span className="rp-count">{counts[key]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {isCoach && (
          <div className="rp-player-strip">
            {visible.length === 0 && <p className="rp-empty">No players match.</p>}
            {visible.map((p) => (
              <button
                key={p.id}
                className={`rp-player-chip ${p.id === selected.id ? 'selected' : ''}`}
                onClick={() => setSelectedId(p.id)}
              >
                <div className="rp-avatar">
                  {initials(p.name)}
                  <span className={`rp-dot ${p.status}`} />
                </div>
                <span className="rp-chip-name">{p.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="rp-detail">
        <div className="rp-card rp-profile">
          <div className="rp-avatar lg">{initials(selected.name)}</div>
          <h3 className="rp-profile-name">{selected.name}</h3>
          <span className="rp-profile-sub">Age {selected.age}</span>
          <span className={`rp-pill ${selected.status}`}>{STATUS_LABEL[selected.status]}</span>
          <span className="rp-profile-sub">Last reading: {fmtDate(latest.date)}</span>
        </div>

        <div className="rp-card">
          <div className="rp-card-top">
            <h3 className="rp-section-title">Summary</h3>
            <select
              className="rp-select"
              value={range}
              onChange={(e) => setRange(Number(e.target.value))}
            >
              <option value={3}>Last 3 days</option>
              <option value={5}>Last 5 days</option>
              <option value={7}>Last 7 days</option>
            </select>
          </div>

          <table className="rp-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Latest</th>
                <th>Average</th>
                <th>Range</th>
              </tr>
            </thead>
            <tbody>
              {summaryRows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.latest}</td>
                  <td>{row.avg}</td>
                  <td>{row.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rp-card">
        <div className="rp-card-top">
          <h3 className="rp-section-title">{selected.name} – trends</h3>
          <div className="rp-tabs">
            {Object.entries(METRICS).map(([key, cfg]) => (
              <button
                key={key}
                className={`rp-tab ${metric === key ? 'active' : ''}`}
                onClick={() => setMetric(key)}
              >
                {cfg.label}
              </button>
            ))}
          </div>
        </div>

        {metric === 'ecg' && (
          <p className="rp-chart-note">
            Latest ECG · {fmtDate(latest.date)} · {latest.hr} bpm · {latest.ecg}
          </p>
        )}

        <div className="rp-chart-box">
          <ResponsiveContainer width="100%" height="100%">
            {metric === 'ecg' ? (
              <LineChart data={ecgWaveform(latest.hr)}>
                <YAxis hide domain={[-1, 2]} />
                <Line
                  type="linear"
                  dataKey="v"
                  stroke={m.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" stroke="#a395b8" fontSize={11} />
                <YAxis domain={m.domain} stroke="#a395b8" fontSize={11} />
                <Tooltip
                  contentStyle={{ background: '#0e0817', border: '1px solid #2d1942', borderRadius: 10 }}
                  labelStyle={{ color: '#a395b8' }}
                  formatter={(v) => [`${v} ${m.unit}`, m.label]}
                />
                <Line
                  type="monotone"
                  dataKey={m.key}
                  stroke={m.color}
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: m.color }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rp-card">
        <h3 className="rp-section-title">Recorded readings</h3>
        <div className="rp-table-scroll">
          <table className="rp-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Heart rate</th>
                <th>Blood pressure</th>
                <th>Glucose</th>
                <th>ECG</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[...records].reverse().map((r) => {
                const status = getStatus(r);
                return (
                  <tr key={r.date}>
                    <td>{fmtDate(r.date)}</td>
                    <td>{r.hr} bpm</td>
                    <td>{r.sys}/{r.dia}</td>
                    <td>{r.glucose.toFixed(1)} mmol/L</td>
                    <td>{r.ecg}</td>
                    <td><span className={`rp-pill ${status}`}>{STATUS_LABEL[status]}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;