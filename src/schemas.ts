import z from "zod";

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
  MatchGuid: z.string(),
});

const UpdateState = z.object({
  MatchGuid: z.string(),
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
        Loadout: z.tuple([
          z.string(),
          z.string(),
          z.string(),
          z.string(),
          z.string(),
          z.string(),
        ]),
        bHasCar: z.boolean().optional(),
        Speed: z.number().optional(),
        Boost: z.number().optional(),
        bBoosting: z.boolean().optional(),
        bOnGround: z.boolean().optional(),
        bOnWall: z.boolean().optional(),
        bPowersliding: z.boolean().optional(),
        bDemolished: z.boolean().optional(),
        Attacker: Player.optional(),
        bSupersonic: z.boolean().optional(),
        PickupClass: z.string(),
      }),
    ]),
  ),
  Game: z.object({
    Teams: z.array(Team),
    PlaylistId: z.number(),
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
  MatchGuid: z.string(),
  Players: z.array(Player),
  Ball: z.object({
    PreHitSpeed: z.number(),
    PostHitSpeed: z.number(),
    Location: LocationVector,
  }),
});

const BoostPickup = z.object({
  MatchGuid: z.string(),
  Player: Player,
  Location: LocationVector,
  BoostAmount: z.number(),
  BoostType: z.enum(["BoostType_Pad", "BoostType_Pill"]),
  bReplay: z.boolean(),
});

const ClockUpdatedSeconds = z.object({
  MatchGuid: z.string(),
  TimeSeconds: z.number(),
  bOvertime: z.boolean(),
});

const CrossbarHit = z.object({
  MatchGuid: z.string(),
  BallSpeed: z.number(),
  ImpactForce: z.number(),
  BallLastTouch: z.object({
    Player: Player,
    Speed: z.number(),
  }),
  BallLocation: LocationVector,
});

const GoalScored = z.object({
  MatchGuid: z.string(),
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

const MatchEnded = z.object({
  MatchGuid: z.string(),
  WinnerTeamNum: z.number(),
});

const PlayerJoined = z.object({
  MatchGuid: z.string(),
  PlayerName: z.string(),
  PrimaryId: z.string(),
});

const PlayerLeft = z.object({
  MatchGuid: z.string(),
  PlayerName: z.string(),
  PrimaryId: z.string(),
});

const ReplayCreated = z.object({
  MatchGuid: z.string(),
  FileName: z.string(),
  Date: z.string(),
});

const StatfeedEvent = z.object({
  MatchGuid: z.string(),
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
    Event: z.literal(GameEvent.enum.BoostPickup),
    Data: JsonString.pipe(BoostPickup),
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
    Data: JsonString.pipe(MatchEnded),
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
    Event: z.literal(GameEvent.enum.PlayerJoined),
    Data: JsonString.pipe(PlayerJoined),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PlayerLeft),
    Data: JsonString.pipe(PlayerLeft),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.PodiumStart),
    Data: JsonString.pipe(MatchEvent),
  }),
  z.object({
    Event: z.literal(GameEvent.enum.ReplayCreated),
    Data: JsonString.pipe(ReplayCreated),
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
  [GameEvent.enum.BoostPickup]: [payload: z.infer<typeof BoostPickup>];
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
  [GameEvent.enum.MatchEnded]: [payload: z.infer<typeof MatchEnded>];
  [GameEvent.enum.MatchPaused]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.MatchUnpaused]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.PlayerJoined]: [payload: z.infer<typeof PlayerJoined>];
  [GameEvent.enum.PlayerLeft]: [payload: z.infer<typeof PlayerLeft>];
  [GameEvent.enum.PodiumStart]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.ReplayCreated]: [payload: z.infer<typeof ReplayCreated>];
  [GameEvent.enum.RoundStarted]: [payload: z.infer<typeof MatchEvent>];
  [GameEvent.enum.StatfeedEvent]: [payload: z.infer<typeof StatfeedEvent>];
};
