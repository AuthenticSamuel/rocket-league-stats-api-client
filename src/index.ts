import { RocketLeagueStatsClient } from "@/client";

const client = new RocketLeagueStatsClient({
  host: "127.0.0.1",
  port: 49123,
});

client.on("connected", () => {
  console.log("Connected !");
});

client.on("disconnected", () => {
  console.log("Disconnected !");
});

client.on("error", (error) => {
  console.warn("Error", error);
});

client.on("BallHit", (payload) => {
  console.log(payload);
});
