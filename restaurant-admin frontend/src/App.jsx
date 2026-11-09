import { useState, useEffect } from 'react';
import './App.css';
import OrderCard from './components/OrderCard';
import OrderModal from './components/OrderModal';
import Login from './Login';
import SettingsPage from './components/SettingsPage';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('kitchen');
  
  const [ordersData, setOrdersData] = useState([]);
  const [historyData, setHistoryData] = useState([]); 
  const [selectedOrder, setSelectedOrder] = useState(null); 

  const fetchOrders = () => {
    fetch('http://localhost:8080/api/orders')
      .then(res => res.json())
      .then(data => setOrdersData(data))
      .catch(err => console.error("Error fetching:", err));
  };

  const fetchHistory = () => {
    fetch('http://localhost:8080/api/orders/history')
      .then(res => res.json())
      .then(data => setHistoryData(data))
      .catch(err => console.error("Error fetching history:", err));
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders(); 
      if (currentPage === 'history') {
        fetchHistory(); 
      }
    }
  }, [isLoggedIn, currentPage]); 

  const handleUpdateOrder = (id, updatedOrder) => {
    fetch(`http://localhost:8080/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedOrder)
    })
    .then(res => res.json())
    .then(() => {
      setOrdersData(ordersData.map(o => o.id === id ? updatedOrder : o));
      
      if (currentPage === 'history') {
        fetchHistory();
      }
      if (selectedOrder) setSelectedOrder(null); 
    });
  };

  const handleDeleteOrder = (id) => {
    if(window.confirm("Are you sure you want to delete this order?")) {
      fetch(`http://localhost:8080/api/orders/${id}`, { method: 'DELETE' })
      .then(() => {
        setOrdersData(ordersData.filter(o => o.id !== id));
        setHistoryData(historyData.filter(o => o.id !== id)); 
        setSelectedOrder(null); 
      });
    }
  };

  const handleNewOrder = () => {
    const newOrder = { type: 'Takeout', items: '1x Mystery Pizza', price: 19.99, status: 'Pending' };
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(savedOrder => setOrdersData([...ordersData, savedOrder]));
  };

  const totalRevenue = ordersData.reduce((sum, order) => sum + order.price, 0);
  
  // --- SEARCH FILTER LOGIC START ---
  const filteredOrders = ordersData.filter(order => 
    order.id.toString().includes(searchQuery.toLowerCase()) || 
    order.items.toLowerCase().includes(searchQuery.toLowerCase()) || 
    order.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingOrders = filteredOrders.filter(o => o.status === 'Pending');
  const cookingOrders = filteredOrders.filter(o => o.status === 'Cooking');
  const completedOrders = filteredOrders.filter(o => o.status === 'Completed');
  // --- SEARCH FILTER LOGIC END ---

  if (!isLoggedIn) {
    return (
      <div id="app" className="theme-black">
        <Login onLogin={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div id="app" className="theme-black dashboard-layout">
      
      <aside className="sidebar">
        <div className="sidebar-logo">🍕 RestaurantOS</div>
        <nav className="sidebar-nav">
          <a 
            href="#" 
            className={currentPage === 'kitchen' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('kitchen'); }}
          >
            <i className="fa fa-fire"></i> Kitchen Display
          </a>
          
          <a 
            href="#" 
            className={currentPage === 'history' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('history'); }}
          >
            <i className="fa fa-history"></i> Order History
          </a>
          
          <a 
            href="#" 
            className={currentPage === 'settings' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); setCurrentPage('settings'); }}
          >
            <i className="fa fa-cog"></i> Settings
          </a>
        </nav>
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">M</div>
            <div>
              <p className="user-name">Mario Rossi</p>
              <p className="user-role">Manager</p>
            </div>
          </div>
          <button className="btn-logout" onClick={() => setIsLoggedIn(false)} title="Logout">
            <i className="fa fa-sign-out-alt"></i>
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-header">
          <h1>
            {currentPage === 'kitchen' ? 'Kitchen Display' : currentPage === 'history' ? 'Order History' : 'Settings'}
          </h1>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            
            {currentPage !== 'settings' && (
              <div style={{ position: 'relative' }}>
                <i className="fa fa-search" style={{ position: 'absolute', left: '10px', top: '12px', color: 'var(--text-muted)' }}></i>
                <input 
                  type="text" 
                  placeholder="Search orders..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ 
                    padding: '8px 10px 8px 30px', 
                    borderRadius: '4px', 
                    border: '1px solid var(--bg-elevated)', 
                    backgroundColor: 'var(--bg-page)', 
                    color: 'white',
                    width: '250px'
                  }}
                />
              </div>
            )}

            <span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
              Total Revenue: <strong style={{color: 'var(--accent)'}}>${totalRevenue.toFixed(2)}</strong>
            </span>
            <button className="btn btn-primary" onClick={handleNewOrder}>+ New Order</button>
          </div>
        </header>

        <div className="dashboard-content">
          
          {currentPage === 'kitchen' && (
            <div className="kanban-board">
              <div className="kanban-column column-pending">
                <div className="kanban-header"><h3>Pending</h3><span className="kanban-count">{pendingOrders.length}</span></div>
                <div className="kanban-cards">{pendingOrders.map(order => <OrderCard key={order.id} order={order} onEdit={setSelectedOrder} />)}</div>
              </div>
              <div className="kanban-column column-cooking">
                <div className="kanban-header"><h3>Cooking</h3><span className="kanban-count">{cookingOrders.length}</span></div>
                <div className="kanban-cards">{cookingOrders.map(order => <OrderCard key={order.id} order={order} onEdit={setSelectedOrder} />)}</div>
              </div>
              <div className="kanban-column column-completed">
                <div className="kanban-header"><h3>Completed</h3><span className="kanban-count">{completedOrders.length}</span></div>
                <div className="kanban-cards">{completedOrders.map(order => <OrderCard key={order.id} order={order} onEdit={setSelectedOrder} />)}</div>
              </div>
            </div>
          )}

          {currentPage === 'history' && (
            <div className="order-grid">
              {historyData.length === 0 ? (
                <p style={{ color: 'var(--text-muted)' }}>No completed orders yet.</p>
              ) : (
                historyData.map(order => <OrderCard key={order.id} order={order} onEdit={setSelectedOrder} />)
              )}
            </div>
          )}

          {currentPage === 'settings' && (
            <SettingsPage />
          )}

        </div>
      </div>

      {selectedOrder && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)}
          onUpdate={handleUpdateOrder}
          onDelete={handleDeleteOrder}
        />
      )}
    </div>
  );
}

export default App;