import z from "zod";
import { LocationVector, Player } from "./common.js";

export const BallHit = z.object({
  MatchGuid: z.string(),
  Players: z.array(Player),
  Ball: z.object({
    PreHitSpeed: z.number(),
    PostHitSpeed: z.number(),
    Location: LocationVector,
  }),
});

export const BoostPickup = z.object({
  MatchGuid: z.string(),
  Player: Player,
  Location: LocationVector,
  BoostAmount: z.number(),
  BoostType: z.enum(["BoostType_Pad", "BoostType_Pill"]),
  bReplay: z.boolean(),
});

export const ClockUpdatedSeconds = z.object({
  MatchGuid: z.string(),
  TimeSeconds: z.number(),
  bOvertime: z.boolean(),
});

export const CountdownBegin = z.object({
  MatchGuid: z.string(),
});

export const CrossbarHit = z.object({
  MatchGuid: z.string(),
  BallSpeed: z.number(),
  ImpactForce: z.number(),
  BallLastTouch: z.object({
    Player: Player,
    Speed: z.number(),
  }),
  BallLocation: LocationVector,
});

export const GoalReplayEnd = z.object({
  MatchGuid: z.string(),
});

export const GoalReplayStart = z.object({
  MatchGuid: z.string(),
});

export const GoalReplayWillEnd = z.object({
  MatchGuid: z.string(),
});

export const GoalScored = z.object({
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

export const MatchCreated = z.object({
  MatchGuid: z.string(),
});

export const MatchDestroyed = z.object({
  MatchGuid: z.string(),
});

export const MatchEnded = z.object({
  MatchGuid: z.string(),
  WinnerTeamNum: z.number(),
});

export const MatchInitialized = z.object({
  MatchGuid: z.string(),
});

export const MatchPaused = z.object({
  MatchGuid: z.string(),
});

export const MatchUnpaused = z.object({
  MatchGuid: z.string(),
});

export const PlayerJoined = z.object({
  MatchGuid: z.string(),
  PlayerName: z.string(),
  PrimaryId: z.string(),
});

export const PlayerLeft = z.object({
  MatchGuid: z.string(),
  PlayerName: z.string(),
  PrimaryId: z.string(),
});

export const PodiumStart = z.object({
  MatchGuid: z.string(),
});

export const ReplayCreated = z.object({
  MatchGuid: z.string(),
  FileName: z.string(),
  Date: z.string(),
});

export const RoundStarted = z.object({
  MatchGuid: z.string(),
});

export const StatfeedEvent = z.object({
  MatchGuid: z.string(),
  EventName: z.string(),
  Type: z.string(),
  MainTarget: Player,
  SecondaryTarget: Player.optional(),
});
