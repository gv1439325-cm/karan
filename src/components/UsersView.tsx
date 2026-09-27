import React, { useState } from 'react';
import { Users, Search, Shield, UserCheck, UserX, AlertTriangle, Key } from 'lucide-react';

interface EnterpriseUser {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Security Analyst' | 'User';
  status: 'Active' | 'Suspended' | 'Revoked';
  lastLogin: string;
  signaturesCount: number;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const MOCK_USERS: EnterpriseUser[] = [
  { id: 'usr-001', name: 'Dr. Alex Vance', email: 'alex.vance@quantumsecure.demo', role: 'Admin', status: 'Active', lastLogin: 'Just now', signaturesCount: 1420, riskLevel: 'Low' },
  { id: 'usr-002', name: 'Marcus Brody', email: 'marcus.b@quantumsecure.demo', role: 'Security Analyst', status: 'Active', lastLogin: '8 mins ago', signaturesCount: 890, riskLevel: 'Low' },
  { id: 'usr-003', name: 'Elena Rostova', email: 'elena.r@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '24 mins ago', signaturesCount: 340, riskLevel: 'Low' },
  { id: 'usr-004', name: 'James Thorne', email: 'james.t@quantumsecure.demo', role: 'Security Analyst', status: 'Active', lastLogin: '1 hour ago', signaturesCount: 612, riskLevel: 'Low' },
  { id: 'usr-005', name: 'David Kim', email: 'david.kim@quantumsecure.demo', role: 'User', status: 'Suspended', lastLogin: '10:39 AM', signaturesCount: 154, riskLevel: 'High' },
  { id: 'usr-006', name: 'Aria Starkova', email: 'aria.s@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '2 hours ago', signaturesCount: 421, riskLevel: 'Low' },
  { id: 'usr-007', name: 'Vikram Mehta', email: 'vikram.m@quantumsecure.demo', role: 'Admin', status: 'Active', lastLogin: '3 hours ago', signaturesCount: 1102, riskLevel: 'Low' },
  { id: 'usr-008', name: 'Sarah Connor', email: 'sarah.c@quantumsecure.demo', role: 'Security Analyst', status: 'Active', lastLogin: '4 hours ago', signaturesCount: 780, riskLevel: 'Low' },
  { id: 'usr-009', name: 'Chen Wei', email: 'chen.w@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '5 hours ago', signaturesCount: 290, riskLevel: 'Medium' },
  { id: 'usr-010', name: 'Fatima Al-Sayed', email: 'fatima.a@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: 'Yesterday', signaturesCount: 440, riskLevel: 'Low' },
  { id: 'usr-011', name: 'Lucas Meyer', email: 'lucas.m@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: 'Yesterday', signaturesCount: 198, riskLevel: 'Low' },
  { id: 'usr-012', name: 'Hana Tanaka', email: 'hana.t@quantumsecure.demo', role: 'Security Analyst', status: 'Active', lastLogin: 'Yesterday', signaturesCount: 512, riskLevel: 'Low' },
  { id: 'usr-013', name: 'Priya Sharma', email: 'priya.s@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '2 days ago', signaturesCount: 320, riskLevel: 'Low' },
  { id: 'usr-014', name: 'Carlos Mendez', email: 'carlos.m@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '2 days ago', signaturesCount: 110, riskLevel: 'Medium' },
  { id: 'usr-015', name: 'Nina Petrov', email: 'nina.p@quantumsecure.demo', role: 'User', status: 'Revoked', lastLogin: '3 days ago', signaturesCount: 84, riskLevel: 'High' },
  { id: 'usr-016', name: 'Omar Farooq', email: 'omar.f@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '3 days ago', signaturesCount: 410, riskLevel: 'Low' },
  { id: 'usr-017', name: 'Chloe Dubois', email: 'chloe.d@quantumsecure.demo', role: 'Security Analyst', status: 'Active', lastLogin: '4 days ago', signaturesCount: 630, riskLevel: 'Low' },
  { id: 'usr-018', name: 'Gabriel Silva', email: 'gabriel.s@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '4 days ago', signaturesCount: 220, riskLevel: 'Low' },
  { id: 'usr-019', name: 'Zoe Washington', email: 'zoe.w@quantumsecure.demo', role: 'User', status: 'Active', lastLogin: '5 days ago', signaturesCount: 175, riskLevel: 'Low' },
  { id: 'usr-020', name: 'Liam O\'Connor', email: 'liam.o@quantumsecure.demo', role: 'Admin', status: 'Active', lastLogin: '5 days ago', signaturesCount: 940, riskLevel: 'Low' },
];

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<EnterpriseUser[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
      )
    );
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.id.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="hud-panel rounded-2xl p-6 border-cyan-500/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-cyber text-xl font-black text-white tracking-wide flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            Enterprise User & Access Management
          </h2>
          <p className="text-sm text-slate-300 font-sans mt-1">
            Role-Based Access Control (RBAC) and QDS cryptographic signing identity credentials.
          </p>
        </div>

        <div className="flex rounded-lg bg-slate-900 p-1 border border-cyan-500/20 text-xs font-mono">
          {['All', 'Admin', 'Security Analyst', 'User'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1 rounded-md transition-all ${
                roleFilter === r
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="hud-panel rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, or user ID..."
            className="w-full max-w-sm bg-slate-900 border border-cyan-500/30 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400"
          />
          <span className="text-xs font-mono text-slate-400">
            Total {filteredUsers.length} Users Listed
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-cyan-500/20 bg-slate-950/70">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-slate-900/90 text-cyan-400 border-b border-cyan-500/20 uppercase text-[11px] font-cyber">
              <tr>
                <th className="py-3 px-4">User ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Signatures</th>
                <th className="py-3 px-4">Risk Profile</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-cyan-950/20 transition-colors">
                  <td className="py-3 px-4 text-slate-400">{u.id}</td>
                  <td className="py-3 px-4 font-bold text-white">{u.name}</td>
                  <td className="py-3 px-4 text-slate-400">{u.email}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.role === 'Admin'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                          : u.role === 'Security Analyst'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-cyan-300">{u.signaturesCount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.riskLevel === 'High'
                          ? 'bg-rose-500/20 text-rose-300'
                          : u.riskLevel === 'Medium'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}
                    >
                      {u.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        u.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => toggleUserStatus(u.id)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-cyan-300 transition-all font-mono"
                    >
                      {u.status === 'Active' ? 'Disable' : 'Enable'}
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
