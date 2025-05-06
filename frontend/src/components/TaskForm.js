import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [effortToComplete, setEffortToComplete] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/tasks/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTitle(response.data.title);
          setDescription(response.data.description);
          setEffortToComplete(response.data.effort_to_complete);
          setDueDate(response.data.due_date);
        } catch (error) {
          console.error('Failed to fetch task:', error);
        }
      };

      fetchTask();
    }
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      effort_to_complete: effortToComplete,
      due_date: dueDate,
    };

    try {
      if (id) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/tasks/${id}`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, taskData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const containerStyle = {
    padding: '24px',
    backgroundColor: '#f3f4f6',
    minHeight: '100vh',
  };

  const formWrapperStyle = {
    maxWidth: '768px',
    margin: '0 auto',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '16px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb',
  };

  return (
    <div style={containerStyle}>
      <div style={formWrapperStyle}>
        <h2 style={headingStyle}>{id ? 'Edit Task' : 'Create Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Task Title'
            style={inputStyle}
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Task Description'
            style={{ ...inputStyle, height: '120px' }}
            required
          />
          <input
            type='number'
            value={effortToComplete}
            onChange={(e) => setEffortToComplete(e.target.value)}
            placeholder='Effort to Complete (in days)'
            style={inputStyle}
            required
          />
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={inputStyle}
            required
          />
          <button
            type='submit'
            style={buttonStyle}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor =
                buttonHoverStyle.backgroundColor)
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = buttonStyle.backgroundColor)
            }
          >
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
