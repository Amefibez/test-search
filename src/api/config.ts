import axios from "axios";

const apiBaseURL = `${import.meta.env.VITE_APP_API_URL}`;

axios.defaults.baseURL = apiBaseURL;
const acceptHeader = {
  Authorization:
    "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",
};
axios.defaults.headers.common["X-GitHub-Api-Version"] = "2022-11-28";

export default {
  acceptHeader,
};
