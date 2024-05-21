import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object

export const socket = io("http://localhost:3999", {
  extraHeaders: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0YTNjMmQ0MS0xZjRiLTQ5ODgtYTc3My1hMDQ4OWQzZjA0NDkiLCJzaWQiOiI3MTE0ZWEzMC0xMWM3LTQ2NDEtODA4ZS03NDg5ZWZlZjBlOTAiLCJpc19zYXBwX29wZXJhdG9yIjp0cnVlLCJpYXQiOjE3MTU5MTc5NTUsImV4cCI6MTcxNTkxOTc1NX0.hMRf_WhhJfH6zPA8Dpo7dAv_iCGF8Ek5wzorSWVpcXc",
  },
});
