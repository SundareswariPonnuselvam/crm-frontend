import { useState } from "react";

const StatusUpdateModal = ({ isOpen, onClose, onSubmit, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus || "connected");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(status, response);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Update Lead Status</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="connected">Connected</option>
              <option value="not connected">Not Connected</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Response
            </label>
            {status === "connected" ? (
              <select
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select response</option>
                <option value="discussed">Discussed</option>
                <option value="callback">Callback</option>
                <option value="interested">Interested</option>
              </select>
            ) : (
              <select
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="">Select response</option>
                <option value="busy">Busy</option>
                <option value="rnr">Ring No Response</option>
                <option value="switched off">Switched Off</option>
              </select>
            )}
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
