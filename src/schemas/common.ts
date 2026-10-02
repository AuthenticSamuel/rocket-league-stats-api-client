import z from "zod";

export const Player = z.object({
  Name: z.string(),
  Shortcut: z.number(),
  TeamNum: z.number(),
});

export const Team = z.object({
  Name: z.string(),
  TeamNum: z.number(),
  Score: z.number(),
  ColorPrimary: z.string(),
  ColorSecondary: z.string(),
});

export const LocationVector = z.object({
  X: z.number(),
  Y: z.number(),
  Z: z.number(),
});
