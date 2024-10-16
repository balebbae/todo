import { TodoList } from "@/components/todo-list";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function TodosPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("inserted_at", { ascending: false });
  return (
    <section className="px-4 py-6 p-5 max-w-6xl mx-auto flex flex-col gap-5">
      {user !== null ? (
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight ">
          {user.email?.split("@")[0]}
        </h1>
      ) : (
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight ">
          Who Are You?
        </h1>
      )}
      <Separator className="w-full " />
      <TodoList todos={todos ?? []} />
    </section>
  );
}
