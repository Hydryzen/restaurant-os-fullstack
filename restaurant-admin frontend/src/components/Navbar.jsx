import React from 'react';

export default function Navbar() {
  return (
    <nav>
      <a className="logo" href="#">🍕 Admin Dashboard</a>
      <div className="collapse" style={{ display: 'flex' }}>
        <ul className="menu left">
          <li><a href="#">Orders</a></li>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Settings</a></li>
        </ul>
        <ul className="menu right">
          <li className="menu-register"><a href="#">Logout</a></li>
        </ul>
      </div>
    </nav>
  );
}