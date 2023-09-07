import { z } from "zod";

export const createCardDto = z.object({
  title: z.string().min(2).max(300),
  columnId: z.string().uuid(),
});
export const updateCardDto = createCardDto
  .omit({ columnId: true })
  .extend({ description: z.string().nullable() })
  .partial();

export const updateCardOrderDto = z.array(
  z.object({
    id: z.string().uuid(),
    order: z.number(),
  }),
);
