import api from "./axios";

const getLeads = async () => {
  const response = await api.get("/api/leads");
  return response.data;
};

const createLead = async (leadData) => {
  const response = await api.post("/api/leads", leadData);
  return response.data;
};

const updateLead = async ({ id, address }) => {
  const response = await api.put(`/api/leads/${id}`, { address });
  return response.data;
};

const updateLeadStatus = async ({ id, status, response: leadResponse }) => {
  const response = await api.put(`/api/leads/${id}/status`, {
    status,
    response: leadResponse,
  });
  return response.data;
};

const deleteLead = async (id) => {
  const response = await api.delete(`/api/leads/${id}`);
  return response.data;
};

const getLeadStats = async () => {
  const response = await api.get("/api/leads/stats");
  return response.data;
};

export const leadsApi = {
  getLeads,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
};
