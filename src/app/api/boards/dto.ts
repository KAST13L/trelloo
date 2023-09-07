import { z } from "zod";

export const createBoardDto = z.object({
  title: z.string().min(2).max(30),
});

export const updateBoardDto = createBoardDto.partial();
