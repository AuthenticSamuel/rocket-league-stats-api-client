# Rocket League Stats API Client

![NPM Version](https://img.shields.io/npm/v/rocket-league-stats-api-client)

This project was created in order to make it easy for TS/JS devs to integrate their Rocket League clients into other projects.

Feel free to check out the [simple web app](https://code.spirkop.com/samuel/rocket-league-stats-api-app) I've created that demonstrates this tool in use.

### Installation

```sh
npm install rocket-league-stats-api-client
```

### Usage

```js
import { RocketLeagueStatsClient } from "rocket-league-stats-api-client";

const client = new RocketLeagueStatsClient({
  host: "localhost",
  port: 49124,
});

client.on("UpdateState", (payload) => {
  console.log(payload);
});

client.on("GoalScored", (payload) => {
  console.log(payload);
});
```

### Rocket League Stats API documentation

https://www.rocketleague.com/developer/stats-api

### Disclaimers

This project is not affiliated with Psyonix or Epic Games in any way, shape, or form.

This project was not developed using AI, and never will be.
