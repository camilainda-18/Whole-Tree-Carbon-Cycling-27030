
import { useState } from 'react'
import './App.css'

const sensorData = {
  leaves: {
    title: 'Leaf Gas Exchange',
    subtitle: 'Photosynthesis and respiration at the leaf level',
    description:
      'Leaves absorb carbon dioxide from the atmosphere during photosynthesis and release carbon dioxide through respiration. These measurements help scientists understand carbon uptake.',
    metrics: [
      { label: 'CO₂ Concentration', value: '412.5', unit: 'ppm' },
      { label: 'Net CO₂ Exchange', value: '-2.8', unit: 'µmol/m²/s' },
      { label: 'Leaf Temperature', value: '26.1', unit: '°C' },
      { label: 'Light (PAR)', value: '825', unit: 'µmol/m²/s' },
    ],
  },
  trunk: {
    title: 'Trunk Gas Exchange',
    subtitle: 'Carbon dioxide exchange at the stem level',
    description:
      'The trunk releases carbon dioxide through stem respiration. Monitoring trunk gas exchange helps researchers understand how carbon moves through the tree.',
    metrics: [
      { label: 'CO₂ Concentration', value: '438.6', unit: 'ppm' },
      { label: 'Stem CO₂ Flux', value: '1.4', unit: 'µmol/m²/s' },
      { label: 'Air Temperature', value: '25.1', unit: '°C' },
      { label: 'Relative Humidity', value: '72', unit: '%' },
    ],
  },
  soil: {
    title: 'Soil Gas Exchange',
    subtitle: 'Carbon dioxide exchange below the surface',
    description:
      'Soil respiration includes carbon dioxide released by roots and soil organisms. Monitoring these emissions helps researchers understand belowground carbon cycling.',
    metrics: [
      { label: 'CO₂ Concentration', value: '520.3', unit: 'ppm' },
      { label: 'Soil CO₂ Flux', value: '3.2', unit: 'µmol/m²/s' },
      { label: 'Soil Temperature', value: '24.2', unit: '°C' },
      { label: 'Soil Moisture', value: '32', unit: '%' },
    ],
  },
}

const chartValues = {
  leaves: [-2, -2.5, -3, -2.8, -2.4, -3.1, -2.7, -2.3, -1.2, 0.2, 1.1, 2.8, 3.5, 4.2, 3.8, 4.5, 3.9, 4.3, 3.7, 2.9, 1.2, -0.4, -1.8, -2.8],
  trunk: [1.1, 1.2, 1.0, 0.9, 1.1, 1.3, 1.2, 1.4, 1.6, 1.7, 1.8, 1.9, 1.8, 1.7, 1.6, 1.8, 1.9, 1.7, 1.5, 1.4, 1.3, 1.2, 1.3, 1.4],
  soil: [2.8, 2.7, 2.6, 2.8, 2.9, 3.0, 3.1, 3.2, 3.4, 3.5, 3.6, 3.7, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 3.1, 3.2, 3.2],
}

function ExchangeChart({ selected }) {
  const values = chartValues[selected]
  const width = 600
  const height = 190
  const padding = 20
  const min = Math.min(-4, ...values)
  const max = Math.max(5, ...values)

  const points = values.map((value, index) => {
    const x = padding + (index / (values.length - 1)) * (width - padding * 2)
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="chart-container">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Simulated 24-hour carbon dioxide exchange chart">
        {[35, 75, 115, 155].map((y) => (
          <line
            key={y}
            x1="20"
            y1={y}
            x2="580"
            y2={y}
            stroke="#e1e5dc"
            strokeWidth="1"
          />
        ))}
        <polyline
          points={points}
          fill="none"
          stroke="#35684a"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="chart-times">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState('leaves')
  const [page, setPage] = useState('Live Data')
  const data = sensorData[selected]

  const chooseSection = (section) => {
    setSelected(section)
    setPage('Live Data')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        
<div className="university-brand">
  <img
    src="/images/B2-Logo.png"
    alt="University of Arizona Biosphere 2"
    className="official-logo"
  />
</div>

<div className="biosphere-brand">
  <p>Whole-Tree<br />Carbon Cycling Monitor</p>
</div>


        <nav className="side-nav" aria-label="Main navigation">
          {[
            ['Live Data', '▥'],
            ['The Tree', '♧'],
            ['Environment', '☼'],
            ['About', 'ⓘ'],
          ].map(([label, symbol]) => (
            <button
              key={label}
              className={`nav-item ${page === label ? 'nav-active' : ''}`}
              onClick={() => {
                setPage(label)
                document.getElementById(
                  label === 'About' ? 'about-section' :
                  label === 'Environment' ? 'environment-section' :
                  'tree-section'
                )?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="nav-symbol">{symbol}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <span>TEAM 27030</span>
          <p>Capstone Project<br />University of Arizona<br />Biosphere 2</p>
        </div>
      </aside>

      <div className="main-area">
        <header className="hero-header">
          <div className="hero-content">
            <div className="hero-eyebrow">BIOSPHERE 2 · RESEARCH DASHBOARD</div>
            <h1>Whole-Tree<br />Carbon Cycling</h1>
            <p>EXPLORING CARBON EXCHANGE THROUGHOUT THE TREE</p>
          </div>
          <div className="header-status">
            <span className="status-dot" />
            Prototype · Simulated Data
          </div>
        </header>

        <main className="content">
          <div className="top-tabs">
            {[
              ['Tree Overview', 'leaves'],
              ['Leaf Exchange', 'leaves'],
              ['Trunk Exchange', 'trunk'],
              ['Soil Exchange', 'soil'],
            ].map(([label, section], index) => (
              <button
                key={label}
                className={
                  (index === 0 && page === 'The Tree') ||
                  (index > 0 && selected === section && page !== 'The Tree')
                    ? 'tab-active'
                    : ''
                }
                onClick={() => {
                  setSelected(section)
                  setPage(index === 0 ? 'The Tree' : 'Live Data')
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="content-grid">
            <div className="left-column">
              <section className="tree-card" id="tree-section">
                <div className="tree-intro">
                  <span className="eyebrow">WHOLE-TREE MONITORING</span>
                  <h2>Interactive Tree</h2>
                  <p>
                    Select a section of the tree to explore
                    its carbon exchange measurements.
                  </p>
                </div>

                <div className="tree-display">
                  <img
                    src="/images/tree.png"
                    alt="Botanical illustration of a tree with exposed roots and soil"
                    className="tree-art"
                  />

                  <button
                    className={`tree-marker marker-leaves ${selected === 'leaves' ? 'marker-active' : ''}`}
                    onClick={() => chooseSection('leaves')}
                    aria-label="View leaf gas exchange"
                  >
                    <span className="marker-circle" />
                    <span className="marker-label">
                      <strong>Leaves</strong>
                      <small>Gas Exchange</small>
                    </span>
                  </button>

                  <button
                    className={`tree-marker marker-trunk ${selected === 'trunk' ? 'marker-active' : ''}`}
                    onClick={() => chooseSection('trunk')}
                    aria-label="View trunk gas exchange"
                  >
                    <span className="marker-circle" />
                    <span className="marker-label">
                      <strong>Trunk</strong>
                      <small>Gas Exchange</small>
                    </span>
                  </button>

                  <button
                    className={`tree-marker marker-soil ${selected === 'soil' ? 'marker-active' : ''}`}
                    onClick={() => chooseSection('soil')}
                    aria-label="View soil gas exchange"
                  >
                    <span className="marker-circle" />
                    <span className="marker-label">
                      <strong>Soil</strong>
                      <small>Gas Exchange</small>
                    </span>
                  </button>
                </div>
              </section>

              <section className="environment-card" id="environment-section">
                <div className="eyebrow">ENVIRONMENTAL CONDITIONS</div>
                <div className="environment-grid">
                  <div className="env-item">
                    <span className="env-icon">☼</span>
                    <div>
                      <small>Light (PAR)</small>
                      <strong>812</strong>
                      <span>µmol/m²/s</span>
                    </div>
                  </div>
                  <div className="env-item">
                    <span className="env-icon">♧</span>
                    <div>
                      <small>Air Temperature</small>
                      <strong>25.8</strong>
                      <span>°C</span>
                    </div>
                  </div>
                  <div className="env-item">
                    <span className="env-icon">♢</span>
                    <div>
                      <small>Humidity</small>
                      <strong>68</strong>
                      <span>%</span>
                    </div>
                  </div>
                  <div className="env-item">
                    <span className="env-icon">❧</span>
                    <div>
                      <small>Soil Moisture</small>
                      <strong>32</strong>
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="right-column">
              <section className="exchange-heading">
                <span className="eyebrow">CARBON EXCHANGE MONITORING</span>
                <h2>{data.title}</h2>
                <p>{data.subtitle}</p>
              </section>

              <section className="measurements-card">
                <div className="card-heading">
                  <span className="eyebrow">CURRENT MEASUREMENTS</span>
                  <span className="simulation-indicator">
                    <span className="status-dot" />
                    Demo Data
                  </span>
                </div>

                <div className="metric-grid">
                  {data.metrics.map((metric) => (
                    <div className="metric" key={metric.label}>
                      <span>{metric.label}</span>
                      <div>
                        <strong>{metric.value}</strong>
                        <small>{metric.unit}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="chart-card">
                <div className="eyebrow">CO₂ EXCHANGE · 24-HOUR DEMONSTRATION</div>
                <ExchangeChart selected={selected} />
                <div className="chart-legend">
                  <span className="legend-dot" />
                  Simulated Exchange Trend
                </div>
              </section>

              <section className="about-card" id="about-section">
                <span className="eyebrow">UNDERSTANDING THE SCIENCE</span>
                <h3>About {data.title}</h3>
                <p>{data.description}</p>
                <div className="disclaimer">
                  All measurements and chart values are simulated for
                  demonstration. Live data integration is in development.
                </div>
              </section>
            </div>
          </div>

          <footer className="footer">
            <span>© 2026 · University of Arizona · Team 27030</span>
            <span>Biosphere 2 Whole-Tree Carbon Cycling Project</span>
          </footer>
        </main>
      </div>
    </div>
  )
}

export default App
