import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { leadsApi } from "../api/leadsApi";
import { toast } from "react-hot-toast";
import LeadForm from "../components/leads/LeadForm";
import LeadsTable from "../components/leads/LeadsTable";
import StatusUpdateModal from "../components/leads/StatusUpdateModal";

const TelecallerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [leads, setLeads] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await leadsApi.getLeads();
      setLeads(response.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateLead = async (leadData) => {
    try {
      await leadsApi.createLead(leadData);
      toast.success("Lead created successfully");
      setIsFormOpen(false);
      fetchLeads();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateAddress = async (id, address) => {
    try {
      await leadsApi.updateLead({ id, address });
      toast.success("Address updated successfully");
      fetchLeads();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await leadsApi.deleteLead(id);
      toast.success("Lead deleted successfully");
      fetchLeads();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdateStatus = async (status, response) => {
    try {
      await leadsApi.updateLeadStatus({
        id: selectedLead._id,
        status,
        response,
      });
      toast.success("Status updated successfully");
      setIsStatusModalOpen(false);
      fetchLeads();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">
            Telecaller Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">
              Welcome, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Customer Leads
            </h2>
            <button onClick={() => setIsFormOpen(true)} className="btn-primary">
              Add New Lead
            </button>
          </div>

          <LeadsTable
            leads={leads}
            onEditAddress={handleUpdateAddress}
            onDelete={handleDeleteLead}
            onUpdateStatus={(lead) => {
              setSelectedLead(lead);
              setIsStatusModalOpen(true);
            }}
          />
        </div>
      </main>

      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateLead}
      />

      <StatusUpdateModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        onSubmit={handleUpdateStatus}
        currentStatus={selectedLead?.status}
      />
    </div>
  );
};

export default TelecallerDashboard;
