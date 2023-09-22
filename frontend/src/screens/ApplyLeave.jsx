
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import Axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

function ApplyLeave() {
  const navigate = useNavigate(); 

  const handleSubmit = async (values) => {
    try {
   
      const authToken = localStorage.getItem('userInfo');
      if (!authToken) {
        console.error('User is not authenticated');
      
        navigate('/login');
        return;
      }

     
      const headers = {
        Authorization: `Bearer ${authToken}`,
      };

      const response = await Axios.post('/api/leave/apply', values, { headers });

      if (response.status === 201) {
        console.log('Leave application submitted successfully');
        navigate('/success'); 
      } else {
        console.error('Error submitting leave application');
      
      }
    } catch (error) {
      console.error('Error submitting leave application: ', error);
 
    }
  };

  const validationSchema = Yup.object({
    leaveType: Yup.string().required('Leave Type is required'),
    startDate: Yup.date().required('Start Date is required'),
    endDate: Yup.date()
      .required('End Date is required')
      .min(Yup.ref('startDate'), 'End Date should be after Start Date'),
    reason: Yup.string().required('Reason is required'),
  });

  return (
    <div>
      <h1>Apply for Leave</h1>
      <Formik
        initialValues={{
          leaveType: '',
          startDate: '',
          endDate: '',
          reason: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <BootstrapForm.Group controlId="leaveType">
              <BootstrapForm.Label>Select Leave Type</BootstrapForm.Label>
              <Field as="select" name="leaveType" className="form-control">
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="emergency">Emergency Leave</option>
              </Field>
              <ErrorMessage name="leaveType" component="div" className="error-text" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="startDate">
              <BootstrapForm.Label>Start Date</BootstrapForm.Label>
              <Field type="date" name="startDate" className="form-control" />
              <ErrorMessage name="startDate" component="div" className="error-text" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="endDate">
              <BootstrapForm.Label>End Date</BootstrapForm.Label>
              <Field type="date" name="endDate" className="form-control" />
              <ErrorMessage name="endDate" component="div" className="error-text" />
            </BootstrapForm.Group>

            <BootstrapForm.Group controlId="reason">
              <BootstrapForm.Label>Reason</BootstrapForm.Label>
              <Field as="textarea" name="reason" rows={3} className="form-control" />
              <ErrorMessage name="reason" component="div" className="error-text" />
            </BootstrapForm.Group>

            <Button variant="primary" type="submit">
              Apply
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ApplyLeave;

