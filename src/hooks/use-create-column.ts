import { api } from "@/core/api";
import { Columns } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateColumnDto as CreateColumnDtoOriginal } from "@/app/api/columns/dto";

type CreateColumnDto = Omit<CreateColumnDtoOriginal, "width">;
const createColumnFn = async (column: CreateColumnDto) => {
  return await api.post<Columns>("api/columns", column);
};

interface useCreateColumnMutationOptions {
  boardId: string;
}
export const useCreateColumnMutation = ({
  boardId,
}: useCreateColumnMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createColumnFn,
    onSuccess: () => {
      const data = queryClient.getQueryData(["board", boardId]);
      console.log("data!", data);
    },
  });
};
