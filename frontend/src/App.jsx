import React, { useState } from 'react';

export default function App() {
  const [formData, setFormData] = useState({
    origin: 'Mumbai',
    destination: 'Delhi',
    distance_km: 1400.0,
    carrier: 'FedEx',
    shipping_mode: 'Air',
    order_priority: 'High',
    product_type: 'Electronics',
    shipment_weight_kg: 250.5,
    package_count: 10,
    warehouse_processing_hours: 4.5,
    weather_condition: 'Clear',
    day_of_week: 'Monday',
    scheduled_delivery_days: 3.0
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['distance_km', 'shipment_weight_kg', 'package_count', 'warehouse_processing_hours', 'scheduled_delivery_days'].includes(name) 
        ? parseFloat(value) || 0 
        : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Change this to your deployed FastAPI backend URL later (e.g., Render)
    const API_URL = "http://127.0.0.1:8000/predict";

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error("Failed to connect to LogiPredict Backend API.");
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message + " (Make sure your FastAPI server is running locally via uvicorn).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <header style={{ maxWidth: '1200px', margin: '0 auto 2rem auto', borderBottom: '1px solid #334155', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            LOGIPREDICT 🚀
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Predictive Logistics & Delivery Intelligence Platform</p>
        </div>
        <div style={{ background: '#1e293b', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #334155', fontSize: '0.875rem' }}>
          Status: <span style={{ color: '#4ade80', fontWeight: '600' }}>● Live System</span>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
        {/* Input Form */}
        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', border: '1px solid #334155' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Shipment Parameters</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Origin City</label>
              <input type="text" name="origin" value={formData.origin} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Destination City</label>
              <input type="text" name="destination" value={formData.destination} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Carrier</label>
              <input type="text" name="carrier" value={formData.carrier} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Shipping Mode</label>
              <input type="text" name="shipping_mode" value={formData.shipping_mode} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Distance (km)</label>
              <input type="number" name="distance_km" value={formData.distance_km} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Weight (kg)</label>
              <input type="number" name="shipment_weight_kg" value={formData.shipment_weight_kg} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Weather Condition</label>
              <input type="text" name="weather_condition" value={formData.weather_condition} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '0.5rem' }}>Warehouse Processing (Hours)</label>
              <input type="number" name="warehouse_processing_hours" value={formData.warehouse_processing_hours} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', background: '#0f172a', border: '1px solid #475569', borderRadius: '6px', color: '#fff' }} />
            </div>

            <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
              <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.875rem', background: 'linear-gradient(to right, #0284c7, #4f46e5)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem' }}>
                {loading ? "Analyzing Shipment Risk..." : "Predict Delay Risk 🔍"}
              </button>
            </div>
          </form>
        </div>

        {/* Prediction Results Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '12px', border: '1px solid #334155', height: '100%' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#e2e8f0' }}>Intelligence Output</h2>
            
            {error && (
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '6px', color: '#f87171', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            {result ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Risk Assessment</span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 'bold', marginTop: '0.5rem', color: result.risk_level === 'High Risk' ? '#ef4444' : result.risk_level === 'Medium Risk' ? '#f59e0b' : '#22c55e' }}>
                    {result.risk_level}
                  </div>
                </div>

                <div style={{ padding: '1.25rem', background: '#0f172a', borderRadius: '8px', border: '1px solid #334155' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Delay Probability:</span>
                    <span style={{ fontWeight: '600', color: '#f8fafc' }}>{result.delay_probability}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Predicted Status:</span>
                    <span style={{ fontWeight: '600', color: result.is_delayed === 1 ? '#ef4444' : '#22c55e' }}>
                      {result.is_delayed === 1 ? 'Likely Delayed' : 'On Time'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                <p>Submit shipment parameters to generate real-time ML risk predictions.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}