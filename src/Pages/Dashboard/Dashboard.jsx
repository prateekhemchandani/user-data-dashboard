import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=1', {
          headers: {
            'x-api-key': 'reqres-free-v1'
          }
        });
        const formatted = response.data.data.map((u, index) => ({
          id: u.id,
          name: `${u.first_name} ${u.last_name}`,
          email: u.email,
          role: ['Admin', 'Editor', 'Viewer', 'Designer'][index % 4],
        }));
        setUsers(formatted);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email} ${user.role}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const uniqueRoles = ['All', ...new Set(users.map(u => u.role))];

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <p>Welcome! You're now authenticated.</p>

      <div className="filters">
        <input
          type="text"
          placeholder="Search users..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="role-filter"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          {uniqueRoles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="user-grid">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div className="user-card" key={user.id}>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <span>{user.role}</span>
            </div>
          ))
        ) : (
          <p className="no-results">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
