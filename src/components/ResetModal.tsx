import React, { useState } from "react";

// Function to reset the localStorage
const resetStorage = () => {
  localStorage.removeItem("target");
  localStorage.removeItem("counter");
  localStorage.removeItem("cigaretteLogs");
  localStorage.removeItem("lastUpdated");
  console.log("Local storage has been reset.");
};

// Modal Component
const ResetModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [inputCode, setInputCode] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode === "1234") {
      resetStorage(); // Invoke reset function if the code is correct
      onClose(); // Close the modal
    } else {
      alert("Incorrect code. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Enter Reset Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter code"
            className="border p-2 mb-4 w-full"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
// Main Component
export default ResetModal;
