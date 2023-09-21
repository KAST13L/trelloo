import { Input } from "@/components/input.component";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateBoard } from "@/hooks/use-create-board";
const createBoardSchema = z.object({
  title: z.string().min(2).max(30),
});
type CreateBoardValues = z.infer<typeof createBoardSchema>;
export default function CreateBoard() {
  const [isFormOpen, setIsFromOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateBoardValues>({
    resolver: zodResolver(createBoardSchema),
  });
  const { mutateAsync } = useCreateBoard();
  const openForm = () => {
    setIsFromOpen(true);
  };
  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync(values);
    setIsFromOpen(false);
  });
  return (
    <div
      onClick={openForm}
      className="block w-full p-6 bg-white border border-gray-200 cursor-pointer rounded-lg shadow hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      {isFormOpen ? (
        <form onSubmit={onSubmit}>
          <Input
            {...register("title")}
            error={errors.title?.message}
            placeholder={"Enter new board title"}
            disabled={isSubmitting}
          />
        </form>
      ) : (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new board
        </h5>
      )}
    </div>
  );
}
