import z from "zod";
import {
  BallHit,
  BoostPickup,
  ClockUpdatedSeconds,
  CountdownBegin,
  CrossbarHit,
  GoalReplayEnd,
  GoalReplayStart,
  GoalReplayWillEnd,
  GoalScored,
  MatchCreated,
  MatchDestroyed,
  MatchEnded,
  MatchInitialized,
  MatchPaused,
  MatchUnpaused,
  PlayerJoined,
  PlayerLeft,
  PodiumStart,
  ReplayCreated,
  RoundStarted,
  StatfeedEvent,
} from "./events.js";
import { UpdateState } from "./tick.js";

export const GameEvent = z.enum([
  "UpdateState",
  "BallHit",
  "BoostPickup",
  "ClockUpdatedSeconds",
  "CountdownBegin",
  "CrossbarHit",
  "GoalReplayEnd",
  "GoalReplayStart",
  "GoalReplayWillEnd",
  "GoalScored",
  "MatchCreated",
  "MatchInitialized",
  "MatchDestroyed",
  "MatchEnded",
  "MatchPaused",
  "MatchUnpaused",
  "PlayerJoined",
  "PlayerLeft",
  "PodiumStart",
  "ReplayCreated",
  "RoundStarted",
  "StatfeedEvent",
]);

const JsonString = z.string().transform((text, ctx): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    ctx.addIssue({
      code: "custom",
      message: "Payload is not valid JSON",
    });

    return z.NEVER;
  }
});

export const Message = z.discriminatedUnion("Event", [
  z.object({
    Event: z.literal(GameEvent.enum.UpdateState),
    Data: JsonString.pipe(UpdateState),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.BallHit),
    Data: JsonString.pipe(BallHit),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.BoostPickup),
    Data: JsonString.pipe(BoostPickup),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.ClockUpdatedSeconds),
    Data: JsonString.pipe(ClockUpdatedSeconds),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.CountdownBegin),
    Data: JsonString.pipe(CountdownBegin),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.CrossbarHit),
    Data: JsonString.pipe(CrossbarHit),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayEnd),
    Data: JsonString.pipe(GoalReplayEnd),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayStart),
    Data: JsonString.pipe(GoalReplayStart),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayWillEnd),
    Data: JsonString.pipe(GoalReplayWillEnd),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalScored),
    Data: JsonString.pipe(GoalScored),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchCreated),
    Data: JsonString.pipe(MatchCreated),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchInitialized),
    Data: JsonString.pipe(MatchInitialized),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchDestroyed),
    Data: JsonString.pipe(MatchDestroyed),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchEnded),
    Data: JsonString.pipe(MatchEnded),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchPaused),
    Data: JsonString.pipe(MatchPaused),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchUnpaused),
    Data: JsonString.pipe(MatchUnpaused),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PlayerJoined),
    Data: JsonString.pipe(PlayerJoined),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PlayerLeft),
    Data: JsonString.pipe(PlayerLeft),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PodiumStart),
    Data: JsonString.pipe(PodiumStart),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.ReplayCreated),
    Data: JsonString.pipe(ReplayCreated),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.RoundStarted),
    Data: JsonString.pipe(RoundStarted),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.StatfeedEvent),
    Data: JsonString.pipe(StatfeedEvent),
  }),
]);

export type ClientGameEvents = {
  [GameEvent.enum.UpdateState]: [payload: z.infer<typeof UpdateState>];
  [GameEvent.enum.BallHit]: [payload: z.infer<typeof BallHit>];
  [GameEvent.enum.BoostPickup]: [payload: z.infer<typeof BoostPickup>];
  [GameEvent.enum.ClockUpdatedSeconds]: [
    payload: z.infer<typeof ClockUpdatedSeconds>,
  ];
  [GameEvent.enum.CountdownBegin]: [payload: z.infer<typeof CountdownBegin>];
  [GameEvent.enum.CrossbarHit]: [payload: z.infer<typeof CrossbarHit>];
  [GameEvent.enum.GoalReplayEnd]: [payload: z.infer<typeof GoalReplayEnd>];
  [GameEvent.enum.GoalReplayStart]: [payload: z.infer<typeof GoalReplayStart>];
  [GameEvent.enum.GoalReplayWillEnd]: [
    payload: z.infer<typeof GoalReplayWillEnd>,
  ];
  [GameEvent.enum.GoalScored]: [payload: z.infer<typeof GoalScored>];
  [GameEvent.enum.MatchCreated]: [payload: z.infer<typeof MatchCreated>];
  [GameEvent.enum.MatchInitialized]: [
    payload: z.infer<typeof MatchInitialized>,
  ];
  [GameEvent.enum.MatchDestroyed]: [payload: z.infer<typeof MatchDestroyed>];
  [GameEvent.enum.MatchEnded]: [payload: z.infer<typeof MatchEnded>];
  [GameEvent.enum.MatchPaused]: [payload: z.infer<typeof MatchPaused>];
  [GameEvent.enum.MatchUnpaused]: [payload: z.infer<typeof MatchUnpaused>];
  [GameEvent.enum.PlayerJoined]: [payload: z.infer<typeof PlayerJoined>];
  [GameEvent.enum.PlayerLeft]: [payload: z.infer<typeof PlayerLeft>];
  [GameEvent.enum.PodiumStart]: [payload: z.infer<typeof PodiumStart>];
  [GameEvent.enum.ReplayCreated]: [payload: z.infer<typeof ReplayCreated>];
  [GameEvent.enum.RoundStarted]: [payload: z.infer<typeof RoundStarted>];
  [GameEvent.enum.StatfeedEvent]: [payload: z.infer<typeof StatfeedEvent>];
};
