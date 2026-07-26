import z from "zod";

export const GameEvent = z.enum([
  "UpdateState",
  "BallHit",
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
  "PodiumStart",
  "ReplayCreated",
  "RoundStarted",
  "StatfeedEvent",
]);

const Player = z.object({
  Name: z.string(),
  Shortcut: z.number(),
  TeamNum: z.number(),
});

const Team = z.object({
  Name: z.string(),
  TeamNum: z.number(),
  Score: z.number(),
  ColorPrimary: z.string(),
  ColorSecondary: z.string(),
});

const LocationVector = z.object({
  X: z.number(),
  Y: z.number(),
  Z: z.number(),
});

const MatchEvent = z.object({
  MatchGuid: z.string().optional(),
});

const UpdateState = z.object({
  MatchGuid: z.string().optional(),
  Players: z.array(
    z.union([
      Player,
      z.object({
        PrimaryId: z.string(),
        Score: z.number(),
        Goals: z.number(),
        Shots: z.number(),
        Assists: z.number(),
        Saves: z.number(),
        Touches: z.number(),
        CarTouches: z.number(),
        Demos: z.number(),
        bHasCar: z.boolean().optional(),
        Speed: z.number().optional(),
        Boost: z.number().optional(),
        bBoosting: z.boolean().optional(),
        bOnGround: z.boolean().optional(),
        bOnWall: z.boolean().optional(),
        bPowersliding: z.boolean().optional(),
        bDemolished: z.boolean().optional(),
        bSupersonic: z.boolean().optional(),
        Attacker: Player.optional(),
      }),
    ]),
  ),
  Game: z.object({
    Teams: z.array(Team),
    TimeSeconds: z.number(),
    bOvertime: z.boolean(),
    Ball: z.object({
      Speed: z.number(),
      TeamNum: z.number(),
    }),
    bReplay: z.boolean(),
    bHasWinner: z.boolean(),
    Winner: z.string(),
    Arena: z.string(),
    bHasTarget: z.boolean(),
    Target: Player.optional(),
    Frame: z.number().optional(),
    Elapsed: z.number().optional(),
  }),
});

const BallHit = z.object({
  MatchGuid: z.string().optional(),
  Players: z.array(Player),
  Ball: z.object({
    PreHitSpeed: z.number(),
    PostHitSpeed: z.number(),
    Location: LocationVector,
  }),
});

const ClockUpdatedSeconds = z.object({
  MatchGuid: z.string().optional(),
  TimeSeconds: z.number(),
  bOvertime: z.boolean(),
});

const CrossbarHit = z.object({
  MatchGuid: z.string().optional(),
  BallSpeed: z.number(),
  ImpactForce: z.number(),
  BallLastTouch: z.object({
    Player: Player,
    Speed: z.number(),
  }),
  BallLocation: LocationVector,
});

const GoalScored = z.object({
  MatchGuid: z.string().optional(),
  GoalSpeed: z.number(),
  GoalTime: z.number(),
  ImpactLocation: LocationVector,
  Scorer: Player,
  BallLastTouch: z.object({
    Player: Player,
    Speed: z.number(),
  }),
  Assister: Player.optional(),
});

const StatfeedEvent = z.object({
  MatchGuid: z.string().optional(),
  EventName: z.string(),
  Type: z.string(),
  MainTarget: Player,
  SecondaryTarget: Player.optional(),
});

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
    Event: z.literal(GameEvent.enum.ClockUpdatedSeconds),
    Data: JsonString.pipe(ClockUpdatedSeconds),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.CountdownBegin),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.CrossbarHit),
    Data: JsonString.pipe(CrossbarHit),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayEnd),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayStart),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalReplayWillEnd),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.GoalScored),
    Data: JsonString.pipe(GoalScored),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchCreated),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchInitialized),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchDestroyed),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchEnded),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchPaused),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.MatchUnpaused),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PodiumStart),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.ReplayCreated),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.RoundStarted),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.StatfeedEvent),
    Data: JsonString.pipe(StatfeedEvent),
  }),
]);

export type ClientGameEvents = {
  [GameEvent.enum.UpdateState]: [payload: z.infer<typeof UpdateState>];
  [GameEvent.enum.BallHit]: [payload: z.infer<typeof BallHit>];
  [GameEvent.enum.ClockUpdatedSeconds]: [
    payload: z.infer<typeof ClockUpdatedSeconds>,
  ];
  [GameEvent.enum.CountdownBegin]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.CrossbarHit]: [payload: z.infer<typeof CrossbarHit>];
  [GameEvent.enum.GoalReplayEnd]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.GoalReplayStart]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.GoalReplayWillEnd]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.GoalScored]: [payload: z.infer<typeof GoalScored>];
  [GameEvent.enum.MatchCreated]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchInitialized]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchDestroyed]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchEnded]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchPaused]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchUnpaused]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.PodiumStart]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.ReplayCreated]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.RoundStarted]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.StatfeedEvent]: [payload: z.infer<typeof StatfeedEvent>];
};
