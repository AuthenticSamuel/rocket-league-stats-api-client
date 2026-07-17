import net from "node:net";

const client = net.createConnection({
  port: 49123,
});

client.on("connect", () => {
  console.log("Connected !");
});

client.on("data", (data) => {
  const parsed = JSON.parse(data.toString());
  console.log(parsed);
});

client.on("error", (error) => {
  console.error(error);
});

client.on("end", () => {
  console.log("Disconnected");
});
