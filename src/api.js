import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/auth/signup", { user }).then(res => res.data.user),
      // TODO: remove unnecesary data from response.
    validateUser: user =>
      axios.post("/api/auth/validate_user", { user }).then(res => res.data),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPasswordRequest: username =>
      axios.post("/api/auth/reset_password_request", { username }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data }),
    fetchUserAgreements: () =>
      axios.get("/api/users/agreements").then(res => res.data),
    updateUserAgreements: ({ agreement_id, accepted, agreement_name }) =>
      axios.post("/api/users/agreements", { agreement_id, accepted, agreement_name }).then(res => res.data)
    
  },
  order: {
	historic: (field_code, test_code) =>
		axios.post("/api/orders/historic", {field_code,test_code}).then(res => res.data),
    search: queryString =>
      axios.get("/api/orders/search", queryString).then(res => res.data.order),
	fetchAll: () => 
		axios.get("/api/orders").then(res => res.data.orders)
  },
  agreements: {
  fetchAgreements: () => 
    axios.get("/api/agreements").then(res => res.data)
  }
};
