import axios from "axios";

export default async function postKey(key) {
  await axios.post("/api/hash-key", { key });
}
