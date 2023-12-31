import { useRouter } from 'next/router';
import useSWR from 'swr';
import { API_APPOINTMENT_HISTORY } from '../../../lib/ApiLinks';
import axios from 'axios';
import AppointmentCard from '../../../components/jadwal/AppointmentCard';
import { useEffect, useState } from 'react';
import { addDays, formatISO } from 'date-fns';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

interface AppointmentData {
  appointmentId: string;
  patientID: string;
  doctorID: string;
  datetime: string;
  status: string;
}

const fetchData = async (url: string, token: string) => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const AppointmentsForDate = () => {
  const router = useRouter();
  const { date } = router.query;

  const [doctorId, setDoctorId] = useState<string>('');

  useEffect(() => {
    const storedDoctorId = localStorage.getItem('doctorId');
    if (storedDoctorId) {
      setDoctorId(storedDoctorId);
    }
  }, []);

  let isoEndDate;
  if (date) {
    try {
      const adjustedEndDate = addDays(new Date(date as string), 1);
      isoEndDate = formatISO(adjustedEndDate, { representation: 'date' });
    } catch (error) {
      console.error('Invalid date:', date);
    }
  }

  const { data, error } = useSWR<AppointmentData[]>(
    date && doctorId
      ? `${API_APPOINTMENT_HISTORY}/${doctorId}?start=${date}&end=${isoEndDate}`
      : null,
    (url) => fetchData(url, localStorage.getItem('token') || ''),
  );

  return (
    <LayoutWrapper>
      {error ? (
        <div>Failed to fetch data</div>
      ) : !data ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4 p-3">
          {data.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            data.map((appointment) => (
              <AppointmentCard
                key={appointment.appointmentId}
                appointment={appointment}
              />
            ))
          )}

          <button
            onClick={() => router.back()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Go Back
          </button>
        </div>
      )}
    </LayoutWrapper>
  );
};

export default AppointmentsForDate;
