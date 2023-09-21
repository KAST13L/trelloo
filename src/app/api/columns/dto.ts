import { z } from "zod";
import { createBoardDto } from "@/app/api/boards/dto";

export const createColumnDto = z.object({
  title: z.string().min(2).max(30),
  boardId: z.string().uuid(),
  width: z.number().min(100).default(250),
});

export type CreateColumnDto = z.infer<typeof createColumnDto>;
export const updateColumnDto = createColumnDto
  .omit({ boardId: true })
  .partial();

export const updateColumnsOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  }),
);
