import z from "zod";

export const ChangePOV = z.union([
  z.object({
    Focus: z.union([z.literal("Ball"), z.string()]),
  }),
  z.object({
    Perspective: z.enum([
      "Fly",
      "SoftAttach",
      "HardAttach",
      "PlayerView",
      "AutoCam",
      "Camera_Director",
    ]),
  }),
]);

export const LoadReplay = z.xor([
  z.object({
    FileName: z.string(),
  }),
  z.object({
    Path: z.string(),
  }),
]);

export const SeekReplay = z.xor([
  z.object({
    Frame: z.number(),
  }),
  z.object({
    TimeSeconds: z.number(),
  }),
]);

export const SetGameSpeed = z.object({
  Speed: z.number(),
});

export const SetHUDVisibility = z.object({
  bVisible: z.boolean(),
});

export const SetMatchPaused = z.object({
  bPaused: z.boolean(),
});
