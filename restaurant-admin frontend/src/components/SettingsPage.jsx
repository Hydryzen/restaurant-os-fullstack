import React, { useState } from 'react';

export default function SettingsPage() {
  const [restaurantName, setRestaurantName] = useState('RestaurantOS');
  const [currency, setCurrency] = useState('$');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    // Hide the success message after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2 style={{ color: 'var(--text-bright)', marginBottom: '20px' }}>General Settings</h2>
      
      {saved && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '10px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #10b981' }}>
          <i className="fa fa-check-circle"></i> Settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Restaurant Name */}
        <div className="form-group">
          <label>Restaurant Name</label>
          <input 
            type="text" 
            value={restaurantName} 
            onChange={(e) => setRestaurantName(e.target.value)} 
          />
        </div>

        {/* Currency */}
        <div className="form-group">
          <label>Currency Symbol</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="$">$ (USD)</option>
            <option value="€">€ (EUR)</option>
            <option value="£">£ (GBP)</option>
            <option value="MXN$">MXN$ (Peso)</option>
          </select>
        </div>

        {/* Notifications Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={(e) => setNotifications(e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent)' }}
          />
          <label style={{ margin: 0, cursor: 'pointer' }}>Enable sound notifications for new orders</label>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: 'fit-content' }}>
          Save Settings
        </button>
      </form>
    </div>
  );
}