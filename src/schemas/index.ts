import z from "zod/v4";

import { WeekDay } from "../generated/prisma/enums.js";

export const ErrorSchema = z.object({
    error: z.string(),
    code: z.string(),
});

export const WorkoutExerciseSchema = z.object({
  name: z.string().trim().min(1),
  order: z.number().min(0),
  sets: z.number().min(1),
  reps: z.number().min(1),
  restTimeInSeconds: z.number().min(1),
});

export const WorkoutDaySchema = z.object({
  name: z.string().trim().min(1),
  weekDay: z.enum(WeekDay),
  isRest: z.boolean().default(false),
  estimatedDurationInSeconds: z.number().min(1),
  coverImageUrl: z.string().url().optional(),
  exercises: z.array(WorkoutExerciseSchema),
});

export const WorkoutPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1),
  workoutDays: z.array(WorkoutDaySchema),
});

export const WorkoutSessionParamsSchema = z.object({
  workoutPlanId: z.string().uuid(),
  workoutDayId: z.string().uuid(),
});

export const WorkoutSessionResponseSchema = z.object({
  id: z.string().uuid(),
});
