import EventEmitter from "events";
import z from "zod";
import { GameEvent, Message, type ClientGameEvents } from "./schemas/index.js";

type ClientConnectionEvents = {
  Connect: [event: Event];
  Disconnect: [event: CloseEvent];
  Error: [error: Error];
};

type ClientEvents = ClientConnectionEvents & ClientGameEvents;

const ClientParameters = z.xor([
  z.object({
    webSocketUrl: z.url(),
  }),
  z.object({
    host: z.string(),
    port: z.number(),
  }),
]);

type ClientParameters = z.infer<typeof ClientParameters>;

export class RocketLeagueStatsClient extends EventEmitter {
  private readonly socket: WebSocket;

  constructor(parameters: ClientParameters) {
    super();

    const parsedParameters = ClientParameters.parse(parameters);

    if ("webSocketUrl" in parsedParameters) {
      this.socket = new WebSocket(parsedParameters.webSocketUrl);
    } else {
      const url = `ws://${parsedParameters.host}:${parsedParameters.port}`;
      this.socket = new WebSocket(url);
    }

    this.socket.addEventListener("open", (event) => {
      this.emit("Connect", event);
    });

    this.socket.addEventListener("close", (event) => {
      this.emit("Disconnect", event);
    });

    this.socket.addEventListener("error", (event) => {
      this.emit("Error", event);
    });

    this.socket.addEventListener("message", (message) => {
      try {
        const rawMessage = JSON.parse(message.data);
        this.handleMessage(rawMessage);
      } catch (error) {
        console.error(error);
      }
    });
  }

  public disconnect(): void {
    this.socket.close();
  }

  public override on<K extends keyof ClientEvents>(
    event: K,
    listener: (...args: ClientEvents[K]) => void,
  ): this {
    return super.on(event, listener);
  }

  private emitTyped<K extends keyof ClientEvents>(
    event: K,
    ...args: ClientEvents[K]
  ): boolean {
    return super.emit(event, ...args);
  }

  private handleMessage(rawMessage: unknown): void {
    const result = Message.safeParse(rawMessage);

    if (!result.success) {
      const error = new Error(
        `Received invalid message: ${result.error.message}`,
      );
      this.emitTyped("Error", error);
      return;
    }

    const message = result.data;

    switch (message.Event) {
      case GameEvent.enum.UpdateState:
        this.emitTyped(GameEvent.enum.UpdateState, message.Data);
        return;
      case GameEvent.enum.BallHit:
        this.emitTyped(GameEvent.enum.BallHit, message.Data);
        return;
      case GameEvent.enum.BoostPickup:
        this.emitTyped(GameEvent.enum.BoostPickup, message.Data);
        return;
      case GameEvent.enum.ClockUpdatedSeconds:
        this.emitTyped(GameEvent.enum.ClockUpdatedSeconds, message.Data);
        return;
      case GameEvent.enum.CountdownBegin:
        this.emitTyped(GameEvent.enum.CountdownBegin, message.Data);
        return;
      case GameEvent.enum.CrossbarHit:
        this.emitTyped(GameEvent.enum.CrossbarHit, message.Data);
        return;
      case GameEvent.enum.GoalReplayEnd:
        this.emitTyped(GameEvent.enum.GoalReplayEnd, message.Data);
        return;
      case GameEvent.enum.GoalReplayStart:
        this.emitTyped(GameEvent.enum.GoalReplayStart, message.Data);
        return;
      case GameEvent.enum.GoalReplayWillEnd:
        this.emitTyped(GameEvent.enum.GoalReplayWillEnd, message.Data);
        return;
      case GameEvent.enum.GoalScored:
        this.emitTyped(GameEvent.enum.GoalScored, message.Data);
        return;
      case GameEvent.enum.MatchCreated:
        this.emitTyped(GameEvent.enum.MatchCreated, message.Data);
        return;
      case GameEvent.enum.MatchInitialized:
        this.emitTyped(GameEvent.enum.MatchInitialized, message.Data);
        return;
      case GameEvent.enum.MatchDestroyed:
        this.emitTyped(GameEvent.enum.MatchDestroyed, message.Data);
        return;
      case GameEvent.enum.MatchEnded:
        this.emitTyped(GameEvent.enum.MatchEnded, message.Data);
        return;
      case GameEvent.enum.MatchPaused:
        this.emitTyped(GameEvent.enum.MatchPaused, message.Data);
        return;
      case GameEvent.enum.MatchUnpaused:
        this.emitTyped(GameEvent.enum.MatchUnpaused, message.Data);
        return;
      case GameEvent.enum.PlayerJoined:
        this.emitTyped(GameEvent.enum.PlayerJoined, message.Data);
        return;
      case GameEvent.enum.PlayerLeft:
        this.emitTyped(GameEvent.enum.PlayerLeft, message.Data);
        return;
      case GameEvent.enum.PodiumStart:
        this.emitTyped(GameEvent.enum.PodiumStart, message.Data);
        return;
      case GameEvent.enum.ReplayCreated:
        this.emitTyped(GameEvent.enum.ReplayCreated, message.Data);
        return;
      case GameEvent.enum.RoundStarted:
        this.emitTyped(GameEvent.enum.RoundStarted, message.Data);
        return;
      case GameEvent.enum.StatfeedEvent:
        this.emitTyped(GameEvent.enum.StatfeedEvent, message.Data);
        return;
    }
  }
}
