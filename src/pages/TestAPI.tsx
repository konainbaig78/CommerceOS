import { useEffect } from "react";
import { api } from "../lib/api";

export default function TestAPI() {
  useEffect(() => {
    api
      .get("/api/store")
      .then((response) => {
        console.log("CommerceOS API:", response.data);
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  }, []);

  return <div>Check the browser console.</div>;
}