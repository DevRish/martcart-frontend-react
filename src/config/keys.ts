export const NODE_ENV = process.env.REACT_APP_NODE_ENV || "DEV";
export const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
export const AWS_BUCKET_URL = process.env.REACT_APP_AWS_BUCKET_URL || "";
export const STATIC_URL = (NODE_ENV === "AWS") ? AWS_BUCKET_URL : (SERVER_URL + "/static");
