import z from "zod";
import { Player, Team } from "./common.js";

export const UpdateState = z.object({
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
