export const API_BASE_URL = "http://192.168.137.78:4000";


export const getAllTickets = async () => {
  const response = await fetch(`${BASE_URL}/get-all-tickets`);
  return response.json();
};

export const getAssignedTickets = async (email) => {
  const response = await fetch(`${BASE_URL}/get-assigned-tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return response.json();
};

export const updateTicketStatus = async (ticketId, status) => {
  const response = await fetch(`${BASE_URL}/update-ticket-status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: ticketId, status }),
  });
  return response.json();
};
