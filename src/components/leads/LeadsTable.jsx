import { useState } from "react";
import { FiEdit, FiTrash2, FiCheckCircle, FiPhoneOff } from "react-icons/fi";

const LeadsTable = ({ leads, onEditAddress, onDelete, onUpdateStatus }) => {
  const [editingId, setEditingId] = useState(null);
  const [address, setAddress] = useState("");

  const handleEditClick = (lead) => {
    setEditingId(lead._id);
    setAddress(lead.address);
  };

  const handleSaveClick = (id) => {
    onEditAddress(id, address);
    setEditingId(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {lead.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {lead.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {editingId === lead._id ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  lead.address
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    lead.status === "connected"
                      ? "bg-green-100 text-green-800"
                      : lead.status === "not connected"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  {editingId === lead._id ? (
                    <button
                      onClick={() => handleSaveClick(lead._id)}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FiCheckCircle className="h-5 w-5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(lead)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(lead._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onUpdateStatus(lead)}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    {lead.status === "connected" ? (
                      <FiCheckCircle className="h-5 w-5" />
                    ) : (
                      <FiPhoneOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
