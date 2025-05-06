import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskList = ({ token, logout }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.tasks || []);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleExportCSV = () => {
    if (!tasks.length) return;

    const headers = Object.keys(tasks[0]);
    const rows = tasks.map((task) =>
      headers.map((h) => `"${task[h]}"`).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      style={{
        padding: '24px',
        backgroundColor: '#f3f4f6',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2>Your Tasks</h2>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#ef4444',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Link
            to='/tasks/new'
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              textDecoration: 'none',
              marginRight: '8px',
            }}
          >
            Create New Task
          </Link>
          <button
            onClick={handleExportCSV}
            style={{
              backgroundColor: '#10b981',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
            }}
          >
            Download CSV
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Description</th>
              <th style={thStyle}>Due Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td style={tdStyle}>{task.title}</td>
                <td style={tdStyle}>{task.description}</td>
                <td style={tdStyle}>{task.due_date}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={deleteBtnStyle}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/tasks/edit/${task.id}`}
                    style={{ marginLeft: '8px', color: '#3b82f6' }}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  borderBottom: '2px solid #ccc',
  padding: '12px',
  textAlign: 'left',
  backgroundColor: '#f9fafb',
};

const tdStyle = {
  borderBottom: '1px solid #e5e7eb',
  padding: '10px',
};

const deleteBtnStyle = {
  backgroundColor: '#ef4444',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default TaskList;
