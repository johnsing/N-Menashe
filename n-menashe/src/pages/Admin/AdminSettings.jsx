import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import {
  FiGrid, FiGlobe, FiBell, FiLock, FiCheck,
  FiSave, FiRefreshCw, FiDatabase, FiImage
} from 'react-icons/fi'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: ${fadeIn} 0.4s ease-out;
`

const PageHead = styled.div`
  h2 { color: #fff; font-size: 22px; font-weight: 800; }
  .sub { color: #666; font-size: 13px; margin-top: 3px; }
`

// ── Tabs ─────────────────────────────────────────────────────────
const Tabs = styled.div`
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
`

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${p => p.$active ? 'rgba(255, 215, 0, 0.1)' : '#141414'};
  border: 1px solid ${p => p.$active ? 'rgba(255, 215, 0, 0.4)' : '#242424'};
  border-radius: 12px;
  color: ${p => p.$active ? '#ffd700' : '#777'};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  svg { font-size: 15px; }

  &:hover { color: #ffd700; border-color: rgba(255, 215, 0, 0.3); }
`

const Panel = styled.div`
  background: linear-gradient(135deg, #131313 0%, #101010 100%);
  border: 1px solid #1e1e1e;
  border-radius: 18px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 640px) {
    padding: 18px;
  }
`

const SectionTitle = styled.h3`
  color: #fff;
  font-size: 16px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: -6px;

  &::before {
    content: '';
    width: 3px;
    height: 16px;
    background: #ffd700;
    border-radius: 2px;
  }
`

const Field = styled.div`
  label {
    display: block;
    color: #666;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
  }

  input[type="text"], input[type="password"], input[type="number"], select, textarea {
    width: 100%;
    padding: 12px 14px;
    background: #0f0f0f;
    border: 1px solid #262626;
    border-radius: 12px;
    color: #fff;
    font-size: 14px;
    transition: all 0.25s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: rgba(255, 215, 0, 0.5);
      box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.07);
    }

    &::placeholder { color: #3a3a3a; }
  }

  textarea { min-height: 80px; resize: vertical; }

  .field-hint {
    color: #444;
    font-size: 11px;
    margin-top: 6px;
  }
`

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

// ── Toggle switch ────────────────────────────────────────────────
const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  background: #0f0f0f;
  border: 1px solid #1e1e1e;
  border-radius: 14px;

  .t-info {
    .t-title {
      color: #ddd;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 2px;
    }

    .t-desc {
      color: #555;
      font-size: 12px;
    }
  }
`

const Toggle = styled.button`
  position: relative;
  width: 46px;
  height: 26px;
  border-radius: 50px;
  background: ${p => p.$on ? 'linear-gradient(135deg, #ffd700, #f5a623)' : '#2a2a2a'};
  border: 1px solid ${p => p.$on ? 'transparent' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${p => p.$on ? '22px' : '2px'};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${p => p.$on ? '#0a0a0a' : '#555'};
    transition: all 0.3s ease;
  }
`

const ToggleItem = ({ title, desc, isOn, onToggle }) => (
  <ToggleRow>
    <div className="t-info">
      <div className="t-title">{title}</div>
      <div className="t-desc">{desc}</div>
    </div>
    <Toggle $on={isOn} onClick={onToggle} />
  </ToggleRow>
)

// ── Accent preview ───────────────────────────────────────────────
const AccentRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const AccentOption = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${p => p.$color};
  border: 3px solid ${p => p.$active ? '#fff' : 'transparent'};
  cursor: pointer;
  transition: all 0.25s ease;
  position: relative;

  &:hover { transform: scale(1.08); }

  ${p => p.$active && `
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2), 0 8px 20px rgba(0,0,0,0.4);
  `}

  &::after {
    content: '✓';
    position: absolute;
    inset: 0;
    display: ${p => p.$active ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font-weight: 900;
    font-size: 18px;
  }
`

const PreviewCard = styled.div`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #1e1e1e;

  .pv-header {
    padding: 16px 20px;
    background: #0a0a0a;
    border-bottom: 1px solid #1e1e1e;

    .pv-title {
      font-size: 17px;
      font-weight: 900;
      letter-spacing: 2px;
      text-transform: uppercase;
      background: linear-gradient(135deg, #ffd700, #f5a623);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .pv-body {
    padding: 20px;
    background: #101010;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;

    .pv-chip {
      padding: 8px 18px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      background: rgba(255, 215, 0, 0.12);
      border: 1px solid rgba(255, 215, 0, 0.3);
      color: #ffd700;
    }

    .pv-card {
      flex: 1;
      min-width: 140px;
      padding: 14px;
      border-radius: 12px;
      background: #161616;
      border: 1px solid #242424;

      .pv-label {
        color: #555;
        font-size: 10px;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 4px;
      }

      .pv-value {
        color: #fff;
        font-size: 20px;
        font-weight: 800;
      }
    }
  }
`

// ── Danger / data zone ───────────────────────────────────────────
const DangerZone = styled.div`
  border: 1px solid rgba(255, 107, 107, 0.25);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  .dz-title {
    color: #ff8080;
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 3px;
  }

  .dz-desc {
    color: #666;
    font-size: 12px;
  }
`

const DangerBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid rgba(255, 107, 107, 0.4);
  border-radius: 12px;
  color: #ff6b6b;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(255, 107, 107, 0.08);
  }
`

// ── Sticky save bar ──────────────────────────────────────────────
const SaveBar = styled.div`
  position: sticky;
  bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 18px;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid #262626;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5);
  z-index: 50;

  .save-msg {
    color: #666;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;

    &.saved {
      color: #51cf66;
    }

    svg { font-size: 15px; }
  }
`

const SaveBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 26px;
  background: linear-gradient(135deg, #ffd700, #f5a623);
  border: none;
  border-radius: 12px;
  color: #0a0a0a;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.25s ease;

  svg { font-size: 15px; }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 215, 0, 0.3);
  }
`

const ResetBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 18px;
  background: transparent;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  color: #888;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  svg { font-size: 14px; }

  &:hover { color: #ffd700; border-color: rgba(255, 215, 0, 0.3); }
`

const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: ${fadeIn} 0.3s ease-out;
`

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const [settings, setSettings] = useState({
    siteName: 'N-Menashe',
    siteDescription: 'Preserving Heritage Through Art',
    contactEmail: 'admin@nmenashe.com',
    language: 'en',
    accent: '#ffd700',
    darkMode: true,
    heroVideo: true,
    videosPerRow: 4,
    defaultVideoStatus: 'draft',
    emailNewUser: true,
    emailNewPost: false,
    emailWeeklyReport: true,
    maintenanceMode: false,
    allowRegistration: true,
  })

  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const tabs = [
    { id: 'general', label: 'General', icon: FiGlobe },
    { id: 'appearance', label: 'Appearance', icon: FiGrid },
    { id: 'content', label: 'Content', icon: FiDatabase },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'security', label: 'Security', icon: FiLock },
  ]

  const accents = ['#ffd700', '#c9a84c', '#8b5cf6', '#3b82f6', '#10b981', '#f97316']

  const toggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] })
    setSaved(false)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <PageWrapper>
      <PageHead>
        <h2>Settings</h2>
        <div className="sub">Configure your platform — changes apply across the whole system</div>
      </PageHead>

      <Tabs>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            $active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon /> {tab.label}
          </Tab>
        ))}
      </Tabs>

      {/* GENERAL */}
      {activeTab === 'general' && (
        <TabContent>
          <Panel>
            <SectionTitle>Site Information</SectionTitle>
            <TwoCol>
              <Field>
                <label>Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => { setSettings({ ...settings, siteName: e.target.value }); setSaved(false) }}
                />
              </Field>
              <Field>
                <label>Contact Email</label>
                <input
                  type="text"
                  value={settings.contactEmail}
                  onChange={(e) => { setSettings({ ...settings, contactEmail: e.target.value }); setSaved(false) }}
                />
              </Field>
            </TwoCol>
            <Field>
              <label>Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => { setSettings({ ...settings, siteDescription: e.target.value }); setSaved(false) }}
              />
            </Field>
            <Field>
              <label>Default Language</label>
              <select
                value={settings.language}
                onChange={(e) => { setSettings({ ...settings, language: e.target.value }); setSaved(false) }}
              >
                <option value="en">English</option>
                <option value="he">Hebrew (עברית)</option>
                <option value="both">Bilingual</option>
              </select>
            </Field>
          </Panel>

          <Panel>
            <SectionTitle>System Controls</SectionTitle>
            <ToggleItem
              title="Maintenance Mode"
              desc="Temporarily disable the site for visitors"
              isOn={settings.maintenanceMode}
              onToggle={() => toggle('maintenanceMode')}
            />
            <ToggleItem
              title="Allow Registration"
              desc="Let new users create accounts"
              isOn={settings.allowRegistration}
              onToggle={() => toggle('allowRegistration')}
            />
          </Panel>
        </TabContent>
      )}

      {/* APPEARANCE */}
      {activeTab === 'appearance' && (
        <TabContent>
          <Panel>
            <SectionTitle>Accent Color</SectionTitle>
            <AccentRow>
              {accents.map(color => (
                <AccentOption
                  key={color}
                  $color={color}
                  $active={settings.accent === color}
                  onClick={() => { setSettings({ ...settings, accent: color }); setSaved(false) }}
                />
              ))}
            </AccentRow>
            <Field style={{ marginTop: 8 }}>
              <label>Custom Color</label>
              <input
                type="text"
                placeholder="#ffd700"
                value={settings.accent}
                onChange={(e) => { setSettings({ ...settings, accent: e.target.value }); setSaved(false) }}
              />
            </Field>
          </Panel>

          <Panel>
            <SectionTitle>Display Options</SectionTitle>
            <ToggleItem
              title="Dark Mode"
              desc="Always use the dark theme (recommended)"
              isOn={settings.darkMode}
              onToggle={() => toggle('darkMode')}
            />
            <ToggleItem
              title="Hero Background Video"
              desc="Show video backgrounds on Library and Audio pages"
              isOn={settings.heroVideo}
              onToggle={() => toggle('heroVideo')}
            />
          </Panel>

          <Panel>
            <SectionTitle>Live Preview</SectionTitle>
            <PreviewCard>
              <div className="pv-header">
                <div className="pv-title">{settings.siteName || 'N-Menashe'}</div>
              </div>
              <div className="pv-body">
                <span className="pv-chip">{settings.language === 'he' ? 'עברית' : settings.language === 'both' ? 'EN / עב' : 'English'}</span>
                <div className="pv-card">
                  <div className="pv-label">Theme</div>
                  <div className="pv-value">Dark</div>
                </div>
                <div className="pv-card">
                  <div className="pv-label">Accent</div>
                  <div className="pv-value" style={{ color: settings.accent }}>{settings.accent}</div>
                </div>
              </div>
            </PreviewCard>
          </Panel>
        </TabContent>
      )}

      {/* CONTENT */}
      {activeTab === 'content' && (
        <TabContent>
          <Panel>
            <SectionTitle>Video Settings</SectionTitle>
            <TwoCol>
              <Field>
                <label>Default Video Status</label>
                <select
                  value={settings.defaultVideoStatus}
                  onChange={(e) => { setSettings({ ...settings, defaultVideoStatus: e.target.value }); setSaved(false) }}
                >
                  <option value="draft">Draft (review before publishing)</option>
                  <option value="published">Published (immediately live)</option>
                </select>
              </Field>
              <Field>
                <label>Videos Per Row</label>
                <input
                  type="number"
                  min="2"
                  max="6"
                  value={settings.videosPerRow}
                  onChange={(e) => { setSettings({ ...settings, videosPerRow: e.target.value }); setSaved(false) }}
                />
                <div className="field-hint">2–6 videos per row in the gallery grid</div>
              </Field>
            </TwoCol>
          </Panel>

          <Panel>
            <SectionTitle>Library Settings</SectionTitle>
            <ToggleItem
              title="Hebrew Text First"
              desc="Show Hebrew verses before English in the reader"
              isOn={settings.darkMode}
              onToggle={() => toggle('darkMode')}
            />
            <Field>
              <label>Default Reader Font Size</label>
              <select>
                <option>Small</option>
                <option selected>Medium</option>
                <option>Large</option>
              </select>
            </Field>
          </Panel>

          <Panel>
            <SectionTitle>Storage</SectionTitle>
            <Field>
              <label>Media Uploads</label>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px', background: '#0f0f0f',
                border: '1px solid #1e1e1e', borderRadius: 12,
                color: '#888', fontSize: 13,
              }}>
                <FiImage style={{ color: '#ffd700', fontSize: 18 }} />
                Connected to Supabase Storage — 1.2 GB / 5 GB used
              </div>
            </Field>
          </Panel>
        </TabContent>
      )}

      {/* NOTIFICATIONS */}
      {activeTab === 'notifications' && (
        <TabContent>
          <Panel>
            <SectionTitle>Email Notifications</SectionTitle>
            <ToggleItem
              title="New User Registration"
              desc="Email me when someone creates an account"
              isOn={settings.emailNewUser}
              onToggle={() => toggle('emailNewUser')}
            />
            <ToggleItem
              title="New Post Published"
              desc="Email me when a new post goes live"
              isOn={settings.emailNewPost}
              onToggle={() => toggle('emailNewPost')}
            />
            <ToggleItem
              title="Weekly Report"
              desc="Receive a weekly summary of views and activity"
              isOn={settings.emailWeeklyReport}
              onToggle={() => toggle('emailWeeklyReport')}
            />
          </Panel>
        </TabContent>
      )}

      {/* SECURITY */}
      {activeTab === 'security' && (
        <TabContent>
          <Panel>
            <SectionTitle>Change Password</SectionTitle>
            <Field>
              <label>Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={security.currentPassword}
                onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
              />
            </Field>
            <TwoCol>
              <Field>
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.newPassword}
                  onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                />
              </Field>
              <Field>
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={security.confirmPassword}
                  onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                />
              </Field>
            </TwoCol>
          </Panel>

          <DangerZone>
            <div>
              <div className="dz-title">Reset All Settings</div>
              <div className="dz-desc">Restore all settings to their default values. This cannot be undone.</div>
            </div>
            <DangerBtn>
              <FiRefreshCw /> Reset Everything
            </DangerBtn>
          </DangerZone>
        </TabContent>
      )}

      <SaveBar>
        <div className={`save-msg ${saved ? 'saved' : ''}`}>
          {saved ? (
            <><FiCheck /> Settings saved successfully</>
          ) : (
            <>You have unsaved changes</>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <ResetBtn onClick={() => setSaved(false)}>
            <FiRefreshCw /> Discard
          </ResetBtn>
          <SaveBtn onClick={handleSave}>
            <FiSave /> Save Changes
          </SaveBtn>
        </div>
      </SaveBar>
    </PageWrapper>
  )
}

export default AdminSettings