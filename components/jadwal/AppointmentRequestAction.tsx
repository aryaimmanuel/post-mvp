// import { API_APPOINTMENT } from '@/lib/ApiLinks';
// import axios from 'axios';
// import { useEffect, useState } from 'react';

// export default function AppointmentRequestAction({
//   appointmentId,
//   status,
// }: {
//   appointmentId: string;
//   status: string;
// }) {
//   // Disable accept / reject buttons after submission
//   const [disableSubmit, setDisableSubmit] = useState(true);

//   // Display message after appointment status successfully updated
//   const [statusUpdated, setStatusUpdated] = useState(false);

//   // Handle displayed message when appointment is accepted / rejected
//   const [appointmentAccepted, setAppointmentAccepted] = useState(false);

//   // Appointment accept / reject handler
//   const handleAppointmentRequest = async (requestAccepted: boolean) => {
//     if (requestAccepted) {
//       try {
//         setDisableSubmit(true);

//         // Update appointment status to 'Accepted'
//         const response = await axios.patch(
//           `${API_APPOINTMENT}/${appointmentId}`,
//           {
//             status: 'Accepted',
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           },
//         );

//         // Update status & appointment state
//         setAppointmentAccepted(true);
//         setStatusUpdated(true);
//         console.log('Appointment Request Acccepted');
//       } catch (error) {
//         setDisableSubmit(false);
//         console.log(error);
//       }
//     } else {
//       try {
//         setDisableSubmit(true);

//         // Update appointment status to 'Rejected'
//         const response = await axios.patch(
//           `${API_APPOINTMENT}/${appointmentId}`,
//           {
//             status: 'Rejected',
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${localStorage.getItem('token')}`,
//             },
//           },
//         );

//         // Update status state
//         setStatusUpdated(true);
//         console.log('Appointment Request Rejected');
//       } catch (error) {
//         setDisableSubmit(false);
//         console.log(error);
//       }
//     }
//   };

//   useEffect(() => {
//     // Enable submit if status is 'Pending'
//     if (status == 'Pending') {
//       setDisableSubmit(false);
//     }

//     // Display message based on appointment status
//     if (status == 'Accepted') {
//       setAppointmentAccepted(true);
//       setStatusUpdated(true);
//     }
//     if (status == 'Rejected') {
//       setStatusUpdated(true);
//     }
//   }, [status]);

//   return (
//     <>
//       {!statusUpdated && (
//         <div className="w-full flex items-center justify-between gap-2">
//           {/* Batal Button */}
//           {disableSubmit ? (
//             <button
//               disabled
//               className="w-1/2 p-2 rounded-md text-sm bg-red-700 text-white bg-opacity-40"
//             >
//               Batal
//             </button>
//           ) : (
//             <button
//               onClick={() => handleAppointmentRequest(false)}
//               className="w-1/2 p-2 rounded-md text-sm bg-red-700 text-white"
//             >
//               Batal
//             </button>
//           )}

//           {/* Terima Button */}
//           {disableSubmit ? (
//             <button
//               disabled
//               className="w-1/2 p-2 rounded-md text-sm bg-green-600 text-white bg-opacity-40"
//             >
//               Terima
//             </button>
//           ) : (
//             <button
//               onClick={() => handleAppointmentRequest(true)}
//               className="w-1/2 p-2 rounded-md text-sm bg-green-600 text-white"
//             >
//               Terima
//             </button>
//           )}
//         </div>
//       )}

//       {/* Status Message */}
//       {!statusUpdated ? (
//         ''
//       ) : statusUpdated && appointmentAccepted ? (
//         <span className="font-semibold text-center text-green-700">
//           Appointment pasien diterima
//         </span>
//       ) : (
//         <span className="font-semibold text-center text-red-700">
//           Appointment pasien ditolak
//         </span>
//       )}
//     </>
//   );
// }

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
