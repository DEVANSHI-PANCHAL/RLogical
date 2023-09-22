
import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link, useNavigate  } from 'react-router-dom';
import Axios from 'axios';

const Dashboard = ({ authToken }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (authToken) {
    
      localStorage.setItem('token', authToken);
    }
  }, [authToken]);

  const initialTotalLeaves = 20;
  const [totalLeaves, setTotalLeaves] = useState(initialTotalLeaves);
  const [appliedLeaves, setAppliedLeaves] = useState(0);
  const [availableLeaves, setAvailableLeaves] = useState(initialTotalLeaves);

  const fetchLeaveRequests = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // if (!token) {
      //   navigate('/login'); 
      //   return;
      // }
  
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await Axios.get('/api/leave/get-all-leaves', { headers });
  
      const leaveData = response.data;
      if (leaveData) {
        const total = leaveData.length;
        const applied = leaveData.filter((leave) => leave.status === 'approved').length;
        setTotalLeaves(total); 
        setAppliedLeaves(applied);
        setAvailableLeaves(initialTotalLeaves - applied); 
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Employee Leave Management System</h1>
          <p className="text-center mb-4">Total Leaves: {totalLeaves}</p>
          <p className="text-center mb-4">Applied Leaves: {appliedLeaves}</p>
          <p className="text-center mb-4">Available Leaves: {availableLeaves}</p>
          <div className="d-flex">
            <Link to="/apply-leave">
              <Button variant="primary" href="/apply-leave" className="me-3">
                Apply Leave
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Dashboard;

