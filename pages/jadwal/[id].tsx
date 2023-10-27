import { GetServerSideProps } from 'next';
import axios from 'axios';
import CalendarComponent from '../../components/jadwal/CalendarComponent';
import { useEffect, useState } from 'react';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

type Schedule = {
  date: string;
  month: string;
  year: string;
  time: string[];
};

type Doctor = {
  id: string;
  email: string;
  specialization: string;
  name: string;
  imageURL: string;
  location: string;
  hospital: string;
  schedule: string;
};

type JadwalProps = {
  doctor: Doctor;
};

const DoctorSchedule = ({ doctor }: JadwalProps) => {
  const [parsedSchedule, setParsedSchedule] = useState<Schedule[]>([]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(doctor.schedule);
      setParsedSchedule(parsed);
    } catch (err) {
      console.error("Failed to parse doctor's schedule", err);
    }
  }, [doctor]);

  return (
    <LayoutWrapper>
      <div>
        <h1 className="font-bold">{doctor.name}</h1>
        <p> Dr. {doctor.specialization}</p>
        <p>{doctor.hospital}</p>
        <CalendarComponent schedule={parsedSchedule} />
      </div>
    </LayoutWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;

  try {
    const response = await axios.get(
      `https://curagan-api.nikenhpsr.site/doctor/${id}`,
    );
    const doctor: Doctor = response.data;

    return {
      props: { doctor },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default DoctorSchedule;
