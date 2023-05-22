import axios from "axios";

export default async function getKeyList() {
  const { data } = await axios.get("/api/hash-keys");

  return data;
}
