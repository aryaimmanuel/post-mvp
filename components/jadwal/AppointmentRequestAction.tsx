import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_APPOINTMENT } from '@/lib/ApiLinks';

interface AppointmentActionProps {
  appointmentId: string;
  status: string;
}

const AppointmentAction: React.FC<AppointmentActionProps> = ({
  appointmentId,
  status,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [appointmentAccepted, setAppointmentAccepted] = useState(false);

  const handleAppointment = async (accepted: boolean) => {
    try {
      setIsSubmitting(true);

      const response = await axios.patch(
        `${API_APPOINTMENT}/${appointmentId}`,
        { status: accepted ? 'Accepted' : 'Rejected' },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      setAppointmentAccepted(accepted);
      setStatusUpdated(true);
      console.log(`Appointment ${accepted ? 'Accepted' : 'Rejected'}`);
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === 'Pending') setIsSubmitting(false);
    if (status === 'Accepted') setAppointmentAccepted(true);
    if (status === 'Rejected') setStatusUpdated(true);
  }, [status]);

  return (
    <>
      {!statusUpdated && (
        <div className="w-full flex items-center justify-between gap-2">
          <button
            disabled={isSubmitting}
            onClick={() => handleAppointment(false)}
            className={`w-1/2 p-2 rounded-md text-sm ${
              isSubmitting
                ? 'bg-red-700 text-white bg-opacity-40'
                : 'bg-red-700 text-white'
            }`}
          >
            Batal
          </button>

          <button
            disabled={isSubmitting}
            onClick={() => handleAppointment(true)}
            className={`w-1/2 p-2 rounded-md text-sm ${
              isSubmitting
                ? 'bg-green-600 text-white bg-opacity-40'
                : 'bg-green-600 text-white'
            }`}
          >
            Terima
          </button>
        </div>
      )}

      {statusUpdated && (
        <span
          className={`font-semibold text-center ${
            appointmentAccepted ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {appointmentAccepted
            ? 'Appointment pasien diterima'
            : 'Appointment pasien ditolak'}
        </span>
      )}
    </>
  );
};

export default AppointmentAction;
