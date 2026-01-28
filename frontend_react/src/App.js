import React, { useMemo, useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * Main application component that renders the social media dashboard with
 * a modern sidebar navigation and main content area. Includes simple client-side
 * tab routing between Dashboard, Profile, and Admin sections.
 */
function App() {
  const [active, setActive] = useState('dashboard');
  const [isAdmin, setIsAdmin] = useState(true); // For demo: show admin area. In real app, derive from auth/user role.
  const [theme] = useState('light');

  useEffect(() => {
    document.body.style.background = 'var(--bg-app)';
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const pageTitle = useMemo(() => {
    if (active === 'dashboard') return 'Dashboard';
    if (active === 'profile') return 'Profile';
    if (active === 'admin') return 'Admin';
    return 'Dashboard';
  }, [active]);

  return (
    <div className="app-shell">
      <Sidebar active={active} setActive={setActive} isAdmin={isAdmin} />
      <main className="main">
        <TopBar title={pageTitle} />
        <div className="content">
          {active === 'dashboard' && <DashboardView />}
          {active === 'profile' && <ProfileView />}
          {active === 'admin' && isAdmin && <AdminView />}
          {active === 'admin' && !isAdmin && (
            <div className="card">
              <div className="admin-callout">You do not have access to the Admin area.</div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Sidebar component rendering brand and navigation items.
 */
function Sidebar({ active, setActive, isAdmin }) {
  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <div className="brand" aria-label="Application brand">
        <div className="logo" aria-hidden>
          S
        </div>
        <div className="title">
          <span className="name">SocialBoard</span>
          <span className="sub">Analytics & Management</span>
        </div>
      </div>

      <div className="nav-group" role="navigation" aria-label="Main">
        <div className="nav-label">Main</div>
        <button
          className={`nav-item ${active === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActive('dashboard')}
          aria-current={active === 'dashboard' ? 'page' : undefined}
        >
          <span className="dot" />
          Dashboard
        </button>
        <button
          className={`nav-item ${active === 'profile' ? 'active' : ''}`}
          onClick={() => setActive('profile')}
          aria-current={active === 'profile' ? 'page' : undefined}
        >
          <span className="dot" />
          Profile
        </button>
      </div>

      <div className="nav-group" role="navigation" aria-label="Admin">
        <div className="nav-label">Admin</div>
        <button
          className={`nav-item ${active === 'admin' ? 'active' : ''}`}
          onClick={() => setActive('admin')}
          disabled={!isAdmin}
          aria-current={active === 'admin' ? 'page' : undefined}
          aria-disabled={!isAdmin}
          title={!isAdmin ? 'Admin access required' : 'Admin'}
        >
          <span className="dot" />
          Admin
        </button>
      </div>
    </aside>
  );
}

/**
 * PUBLIC_INTERFACE
 * TopBar component with page title and quick actions.
 */
function TopBar({ title }) {
  return (
    <div className="topbar">
      <div className="page-title">{title}</div>
      <div className="actions">
        <button className="btn">Export</button>
        <button className="btn primary">Add Post</button>
      </div>
    </div>
  );
}

/**
 * DashboardView - analytics overview
 */
function DashboardView() {
  return (
    <>
      <section className="grid" aria-label="Key metrics">
        <div className="card" style={{ gridColumn: 'span 4' }}>
          <div className="card-title">Total Followers</div>
          <div className="metric">
            <span className="value">124,580</span>
            <span className="delta up">+3.2%</span>
          </div>
          <div className="badge" aria-label="success">
            ⚡ Trending up
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 4' }}>
          <div className="card-title">Engagement Rate</div>
          <div className="metric">
            <span className="value">5.4%</span>
            <span className="delta up">+0.8%</span>
          </div>
          <small className="profile-meta">Last 7 days</small>
        </div>
        <div className="card" style={{ gridColumn: 'span 4' }}>
          <div className="card-title">Avg. Response Time</div>
          <div className="metric">
            <span className="value">1h 12m</span>
            <span className="delta down">-12m</span>
          </div>
          <small className="profile-meta">Support SLA</small>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 16 }} aria-label="Recent activity and performance">
        <div className="card" style={{ gridColumn: 'span 8' }}>
          <div className="card-title">Recent Posts</div>
          <table className="table" role="table" aria-label="Recent posts table">
            <thead>
              <tr>
                <th>Post</th>
                <th>Channel</th>
                <th>Date</th>
                <th>Impressions</th>
                <th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Launch teaser for new feature</td>
                <td>Twitter</td>
                <td>Today</td>
                <td>24,321</td>
                <td>6.2%</td>
              </tr>
              <tr>
                <td>How-to: SocialBoard analytics</td>
                <td>LinkedIn</td>
                <td>Yesterday</td>
                <td>12,487</td>
                <td>4.8%</td>
              </tr>
              <tr>
                <td>Behind the scenes with our team</td>
                <td>Instagram</td>
                <td>2 days ago</td>
                <td>34,901</td>
                <td>7.1%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card" style={{ gridColumn: 'span 4' }}>
          <div className="card-title">Performance Summary</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-primary)' }}>
            <li>Top channel: Instagram</li>
            <li>Best time to post: 11:00 AM</li>
            <li>Top post: Feature teaser (7.1% engagement)</li>
          </ul>
          <div style={{ marginTop: 12 }}>
            <button className="btn secondary">Optimize Schedule</button>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * ProfileView - user profile and settings
 */
function ProfileView() {
  return (
    <>
      <section className="grid" aria-label="Profile header">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <div className="profile-header">
            <div className="avatar">JD</div>
            <div>
              <div className="card-title" style={{ marginBottom: 2 }}>Jane Doe</div>
              <div className="profile-meta">Senior Social Manager • Joined Jan 2024</div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 16 }} aria-label="Profile details">
        <div className="card" style={{ gridColumn: 'span 6' }}>
          <div className="card-title">About</div>
          <p style={{ marginTop: 8, color: 'var(--text-primary)' }}>
            Passionate about building engaged communities. I love turning analytics into actionable insights and creating content that resonates.
          </p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <span className="badge">Primary: #3B82F6</span>
            <span className="badge">Secondary: #10B981</span>
          </div>
        </div>
        <div className="card" style={{ gridColumn: 'span 6' }}>
          <div className="card-title">Account</div>
          <table className="table" aria-label="Account details">
            <tbody>
              <tr>
                <th>Email</th>
                <td>jane.doe@example.com</td>
              </tr>
              <tr>
                <th>Role</th>
                <td>Admin</td>
              </tr>
              <tr>
                <th>Timezone</th>
                <td>UTC-05:00</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: 12 }}>
            <button className="btn">Update Profile</button>{' '}
            <button className="btn primary">Change Password</button>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * AdminView - management panel (visible to admins)
 */
function AdminView() {
  return (
    <>
      <section className="grid" aria-label="Admin panels">
        <div className="card" style={{ gridColumn: 'span 6' }}>
          <div className="card-title">User Management</div>
          <table className="table" aria-label="Users table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jane Doe</td>
                <td>Admin</td>
                <td><span className="badge">Active</span></td>
                <td><button className="btn">Edit</button></td>
              </tr>
              <tr>
                <td>John Smith</td>
                <td>Editor</td>
                <td><span className="badge">Active</span></td>
                <td><button className="btn">Edit</button></td>
              </tr>
              <tr>
                <td>Amy Adams</td>
                <td>Viewer</td>
                <td><span className="badge">Invited</span></td>
                <td><button className="btn">Resend</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card" style={{ gridColumn: 'span 6' }}>
          <div className="card-title">System Health</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-primary)' }}>
            <li>API status: Operational</li>
            <li>Queue latency: Normal</li>
            <li>Error rate: Low</li>
          </ul>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button className="btn">Refresh</button>
            <button className="btn primary">Create Role</button>
          </div>
        </div>
      </section>

      <section className="grid" style={{ marginTop: 16 }} aria-label="Security">
        <div className="card" style={{ gridColumn: 'span 12' }}>
          <div className="card-title">Security</div>
          <div className="admin-callout">Two-factor authentication is enabled for 82% of users.</div>
          <div style={{ marginTop: 12 }}>
            <button className="btn secondary">Require 2FA</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
