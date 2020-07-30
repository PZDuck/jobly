import axios from "axios";

console.log(process.env.URL);
const API_URL = process.env.URL || "http://localhost:3001";

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    const token = localStorage.getItem("_token");
    if (token) paramsOrData._token = token;
    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (
        await axios({
          method: verb,
          url: `${API_URL}/${endpoint}`,
          [verb === "get" ? "params" : "data"]: paramsOrData,
        })
      ).data;
    } catch (err) {
      console.error("api error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getCompanies(searchParams) {
    let res = await this.request(`companies/`, searchParams);
    return res.companies;
  }

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  static async getJobs(searchParams) {
    let res = await this.request(`jobs/`, searchParams);
    return res.jobs;
  }

  static async apply(username, id, state = "applied") {
    let res = await this.request(
      `jobs/${id}/apply`,
      { username, state },
      "post"
    );
    return res.user;
  }

  static async login(data) {
    let res = await this.request("login/", data, "post");
    return res.token;
  }

  static async register(data) {
    let res = await this.request("users", data, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}

export default JoblyApi;
