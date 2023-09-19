import { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  useGetAllLeaveRequestsQuery,
  useGetLeaveRequestByIdQuery,
} from '../slices/leavesSlice';

const Dashboard = () => {
  const { data: leaveData, isLoading, isError } = useGetAllLeaveRequestsQuery();
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [appliedLeaves, setAppliedLeaves] = useState(0);
  const [availableLeaves, setAvailableLeaves] = useState(0);

  useEffect(() => {
    if (!isLoading && !isError && leaveData) {
      const total = leaveData.length;
      const applied = leaveData.filter((leave) => leave.status === 'approved').length;
      setTotalLeaves(total);
      setAppliedLeaves(applied);
      setAvailableLeaves(total - applied);
    }
  }, [leaveData, isLoading, isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }

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
