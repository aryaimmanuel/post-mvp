// components/AppointmentRequest.js
import React, { useState } from "react";
import ConfirmationBox from "./ConfirmationBox";

const AppointmentRequest = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAccept = () => {
    // Implement accept functionality
    setShowConfirmation(true);
  };

  const handleReject = () => {
    // Implement reject functionality
    setShowConfirmation(true);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">
        Appointment Request Details
      </h2>
      <button
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mr-2 rounded"
        onClick={handleAccept}
      >
        Accept
      </button>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        onClick={handleReject}
      >
        Reject
      </button>

      {showConfirmation && <ConfirmationBox />}
    </div>
  );
};

export default AppointmentRequest;
