import api from "../api";

export const fetchUserAgreements = () => api.user.fetchUserAgreements();
export const updateUserAgreements = ({ agreement_id, accepted, agreement_name }) => api.user.updateUserAgreements({ agreement_id, accepted, agreement_name});