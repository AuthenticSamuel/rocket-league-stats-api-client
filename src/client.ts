import { GameEvent, Message, type ClientGameEvents } from "@/schemas";
import { JSONParser } from "@streamparser/json";
import EventEmitter from "node:events";
import net from "node:net";
import z from "zod";

type ClientConnectionEvents = {
  connected: [];
  disconnected: [];
  error: [error: Error];
};

type ClientEvents = ClientConnectionEvents & ClientGameEvents;

const ClientParameters = z.object({
  host: z.string(),
  port: z.number(),
});

type ClientParameters = z.infer<typeof ClientParameters>;

export class RocketLeagueStatsClient extends EventEmitter {
  private readonly socket: net.Socket;
  private readonly parser: JSONParser;

  constructor(parameters: ClientParameters) {
    super();

    const { host, port } = ClientParameters.parse(parameters);

    this.parser = new JSONParser({
      paths: ["$"],
      separator: "",
    });

    this.parser.onValue = ({ value, stack }) => {
      if (stack.length !== 0) return;
      this.handleMessage(value);
    };

    this.parser.onError = (error) => {
      this.emit("error", error);
      this.socket.destroy();
    };

    this.socket = net.createConnection({ host, port });

    this.socket.on("connect", () => {
      this.emit("connected");
    });

    this.socket.on("close", () => {
      this.parser.end();
      this.emit("disconnected");
    });

    this.socket.on("error", (error) => {
      this.emit("error", error);
    });

    this.socket.on("data", (chunk: Buffer) => {
      this.parser.write(chunk);
    });
  }

  public disconnect(): void {
    this.socket.destroy();
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
      this.emitTyped("error", error);
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
