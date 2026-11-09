import React from 'react';

export default function OrderCard({ order, onEdit }) {
  return (
    <div className="gallery">
      <div className="order-card-content">
        
        <div className="order-card-header">
          <h3>Order #{order.id}</h3>
          <span className={`status-badge status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </div>
        
        <div className="order-icon-box">
          <i className={`fa ${order.type === 'Delivery' ? 'fa-motorcycle' : order.type === 'Takeout' ? 'fa-shopping-bag' : 'fa-utensils'}`}></i>
          <div>
            <p style={{ margin: '0 0 5px 0', color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{order.type}</p>
            <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold', color: 'var(--text-bright)' }}>{order.items}</p>
          </div>
        </div>

        <h4 style={{ margin: '0', color: 'var(--accent)', fontSize: '24px', fontWeight: '900' }}>
          ${order.price.toFixed(2)}
        </h4>
      </div>
      
      <div className="card-actions">
        <button 
          className="btn btn-secondary" 
          onClick={() => onEdit(order)}
          style={{ width: '100%' }}
        >
          <i className="fa fa-edit"></i> Manage Order
        </button>
      </div>
    </div>
  );
}