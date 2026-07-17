import z from "zod";

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

const UpdateStateEvent = z.object({
  Event: z.literal("UpdateState"),
  Data: z.object({
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
  }),
});

type UpdateStateEvent = z.infer<typeof UpdateStateEvent>;

const BallHitEvent = z.object({
  Event: z.literal("BallHit"),
  Data: z.object({
    MatchGuid: z.string().optional(),
    Players: z.array(Player),
    Ball: z.object({
      PreHitSpeed: z.number(),
      PostHitSpeed: z.number(),
      Location: LocationVector,
    }),
  }),
});

type BallHitEvent = z.infer<typeof BallHitEvent>;

const ClockUpdatedSecondsEvent = z.object({
  Event: z.literal("ClockUpdatedSeconds"),
  Data: z.object({
    MatchGuid: z.string().optional(),
    TimeSeconds: z.number(),
    bOvertime: z.boolean(),
  }),
});

type ClockUpdatedSecondsEvent = z.infer<typeof ClockUpdatedSecondsEvent>;

const CountdownBeginEvent = z.object({
  Event: z.literal("CountdownBegin"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type CountdownBeginEvent = z.infer<typeof CountdownBeginEvent>;

const CrossbarHitEvent = z.object({
  Event: z.literal("CrossbarHit"),
  Data: z.object({
    MatchGuid: z.string().optional(),
    BallSpeed: z.number(),
    ImpactForce: z.number(),
    BallLastTouch: {
      Player: Player,
      Speed: z.number(),
    },
    BallLocation: LocationVector,
  }),
});

type CrossbarHitEvent = z.infer<typeof CrossbarHitEvent>;

const GoalReplayEndEvent = z.object({
  Event: z.literal("GoalReplayEnd"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type GoalReplayEndEvent = z.infer<typeof GoalReplayEndEvent>;

const GoalReplayStartEvent = z.object({
  Event: z.literal("GoalReplayStart"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type GoalReplayStartEvent = z.infer<typeof GoalReplayStartEvent>;

const GoalReplayWillEndEvent = z.object({
  Event: z.literal("GoalReplayWillEnd"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type GoalReplayWillEndEvent = z.infer<typeof GoalReplayWillEndEvent>;

const GoalScoredEvent = z.object({
  Event: z.literal("GoalScored"),
  Data: z.object({
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
  }),
});

type GoalScoredEvent = z.infer<typeof GoalScoredEvent>;

const MatchCreatedEvent = z.object({
  Event: z.literal("MatchCreated"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchCreatedEvent = z.infer<typeof MatchCreatedEvent>;

const MatchInitializedEvent = z.object({
  Event: z.literal("MatchInitialized"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchInitializedEvent = z.infer<typeof MatchInitializedEvent>;

const MatchDestroyedEvent = z.object({
  Event: z.literal("MatchDestroyed"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchDestroyedEvent = z.infer<typeof MatchDestroyedEvent>;

const MatchEndedEvent = z.object({
  Event: z.literal("MatchEnded"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchEndedEvent = z.infer<typeof MatchEndedEvent>;

const MatchPausedEvent = z.object({
  Event: z.literal("MatchPaused"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchPausedEvent = z.infer<typeof MatchPausedEvent>;

const MatchUnpausedEvent = z.object({
  Event: z.literal("MatchUnpaused"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type MatchUnpausedEvent = z.infer<typeof MatchUnpausedEvent>;

const PodiumStartEvent = z.object({
  Event: z.literal("PodiumStart"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type PodiumStartEvent = z.infer<typeof PodiumStartEvent>;

const ReplayCreatedEvent = z.object({
  Event: z.literal("ReplayCreated"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type ReplayCreatedEvent = z.infer<typeof ReplayCreatedEvent>;

const RoundStartedEvent = z.object({
  Event: z.literal("RoundStarted"),
  Data: z.object({
    MatchGuid: z.string().optional(),
  }),
});

type RoundStartedEvent = z.infer<typeof RoundStartedEvent>;

const StatfeedEvent = z.object({
  Event: z.literal("StatfeedEvent"),
  Data: z.object({
    MatchGuid: z.string().optional(),
    EventName: z.string(),
    Type: z.string(),
    MainTarget: Player,
    SecondaryTarget: Player.optional(),
  }),
});

type StatfeedEvent = z.infer<typeof StatfeedEvent>;

export const Message = z.discriminatedUnion("Event", [
  UpdateStateEvent,
  BallHitEvent,
  ClockUpdatedSecondsEvent,
  CountdownBeginEvent,
  CrossbarHitEvent,
  GoalReplayEndEvent,
  GoalReplayStartEvent,
  GoalReplayWillEndEvent,
  GoalScoredEvent,
  MatchCreatedEvent,
  MatchDestroyedEvent,
  MatchEndedEvent,
  MatchInitializedEvent,
  MatchPausedEvent,
  MatchUnpausedEvent,
  PodiumStartEvent,
  ReplayCreatedEvent,
  RoundStartedEvent,
  StatfeedEvent,
]);
