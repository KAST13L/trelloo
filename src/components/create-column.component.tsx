import { Input } from "@/components/input.component";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateColumnMutation } from "@/hooks/use-create-column";
const CreateColumnSchema = z.object({
  title: z.string().min(2).max(30),
});
type CreateColumnValues = z.infer<typeof CreateColumnSchema>;
interface Props {
  boardId: string;
}
export default function CreateColumn({ boardId }: Props) {
  const [isFormOpen, setIsFromOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateColumnValues>({
    resolver: zodResolver(CreateColumnSchema),
  });
  const { mutateAsync } = useCreateColumnMutation({ boardId });
  const openForm = () => {
    setIsFromOpen(true);
  };
  const onSubmit = handleSubmit(async (values) => {
    await mutateAsync({
      ...values,
      boardId,
    });
    setIsFromOpen(false);
  });
  return (
    <div
      onClick={openForm}
      className="block h-fit min-w-[20rem] w-[20rem] p-6 border cursor-pointer rounded-lg shadow bg-gray-900 border-gray-700 hover:bg-gray-700"
    >
      {isFormOpen ? (
        <form onSubmit={onSubmit}>
          <Input
            {...register("title")}
            error={errors.title?.message}
            placeholder={"Enter new column title"}
            disabled={isSubmitting}
          />
        </form>
      ) : (
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          + Create a new column
        </h5>
      )}
    </div>
  );
}
