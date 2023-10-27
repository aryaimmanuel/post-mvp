// components/ConfirmationBox.js
import React, { useState } from "react";
import Notification from "./Notification";

const ConfirmationBox = () => {
  const [rejectionReason, setRejectionReason] = useState("");

  const handleSubmit = () => {
    // Implement submission logic and handle rejectionReason
    // Show notification based on acceptance or rejection
  };

  return (
    <div>
      <h3>Confirmation Box</h3>
      <textarea
        placeholder="Enter rejection reason..."
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      <Notification />
    </div>
  );
};

export default ConfirmationBox;
