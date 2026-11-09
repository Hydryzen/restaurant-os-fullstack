import React, { useState } from 'react';

export default function OrderModal({ order, onClose, onUpdate, onDelete }) {
  // State for all editable fields
  const [status, setStatus] = useState(order.status);
  const [type, setType] = useState(order.type);
  const [items, setItems] = useState(order.items);
  const [price, setPrice] = useState(order.price); // <--- NEW: Price state

  const handleSave = () => {
    // Send all fields back to App.jsx
    onUpdate(order.id, { ...order, status, type, items, price: parseFloat(price) });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        <div className="modal-header">
          <h2>Edit Order #{order.id}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="form-group">
          <label>Order Type (Table, Takeout, Delivery)</label>
          <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Items</label>
          <input type="text" value={items} onChange={(e) => setItems(e.target.value)} />
        </div>

        {/* NEW: Price Input Field */}
        <div className="form-group">
          <label>Price ($)</label>
          <input 
            type="number" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Cooking">Cooking</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="modal-actions">
          <button className="btn btn-danger" onClick={() => onDelete(order.id)}>
            Delete Order
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}