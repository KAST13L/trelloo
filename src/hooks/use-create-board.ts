import { CreateBoardDto } from "@/app/api/boards/dto";
import { api } from "@/core/api";
import { Boards } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useBoardsQueryKey } from "@/hooks/use-boards";

const createBoardFn = async (board: CreateBoardDto) => {
  return await api.post<Boards>("api/boards", board);
};
export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoardFn,
    onSettled: () => {
      queryClient.invalidateQueries(useBoardsQueryKey);
    },
  });
};
