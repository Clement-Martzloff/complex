import axios from "axios";

export default async function getValueList() {
  const { data } = await axios.get("/api/hash-values");

  return data;
}
