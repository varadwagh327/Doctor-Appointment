import { useContext, useEffect, useState } from "react";
import { Context } from "../index";
import axios from "axios";
import { Navigate } from "react-router-dom";
import docImg from "../All_Images/doc.png";
import {GoCheckCircleFill} from "react-icons/go";
import {AiFillClockCircle} from "react-icons/ai";
import { toast } from "react-toastify";

function Dashboard() {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log("SOME ERROR OCCURED WHILE FETCHING APPOINTMENTS", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const {data} = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        {status},
        {withCredentials: true}
      );
      setAppointments((prevAppointments) => 
        prevAppointments.map((appointment) => 
          appointment._id === appointmentId ? {...appointment, status}
          : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src={docImg} alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>{user && `${user.firstName} ${user.lastName}`}{""}</h5>
              </div>
              <p>
                VCare, we prioritize patient convenience and quality care. Our
                online appointment system allows you to easily schedule
                consultations with our expert doctors across various
                specialties!
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>1500</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>20</h3>
          </div>
          </div>
          <div className="banner">
            <h5>Appointments</h5>
            <table>
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Visited</th>
                </tr>
              </thead>
              <tbody>
                {appointments && appointments.length > 0 ? (
                  appointments.map((appointment) => {
                    return (
                      <tr key={appointment._id}>
                        <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                        <td>{appointment.appointment_date.substring(0, 16)}</td>
                        <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                        <td>{appointment.department}</td>
                        <td>
                          <select
                            className={
                              appointment.status === "Pending"
                                ? "value-pending"
                                : appointment.status === "Rejected"
                                ? "value-rejected"
                                : "value-accepted"
                            }
                            value={appointment.status}
                            onChange={(e) =>handleUpdateStatus(appointment._id, e.target.value)}
                          >
                            <option value="Pending" className="value-pending">
                              Pending
                            </option>
                            <option value="Accepted" className="value-accepted">
                              Accepted
                            </option>
                            <option value="Rejected" className="value-rejected">
                              Rejected
                            </option>
                          </select>
                        </td>
                        <td>
                          {appointment.hasVisited === true ? (
                            <GoCheckCircleFill className="green"/> 
                          ) : (
                            <AiFillClockCircle className="red"/>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h1>NO APPOINTMENTS!</h1>
                )}
              </tbody>
            </table>
          </div>
       
      </section>
    </>
  );
}

export default Dashboard;
