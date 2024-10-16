"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { Todo } from "@/types/custom";
import { deleteTodo, updateTodo } from "@/app/todo/actions";

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <form>
      <TodoCard todo={todo} />
    </form>
  );
}

export function TodoCard({ todo }: { todo: Todo }) {
  return (
    <Card className={cn("w-full")}>
      <CardContent className="flex items-start gap-3 p-3">
        <span className="size-10 flex items-center justify-center">
          <Checkbox
            checked={Boolean(todo.is_completed)}
            onCheckedChange={async (val) => {
              if (val === null) return; // If you're supporting an indeterminate state, this can be used
              await updateTodo({ ...todo, is_completed: Boolean(val) });
            }}
          />
        </span>
        <p className={cn("flex-1 pt-2 min-w-0 break-words")}>{todo.task}</p>
        <Button
          formAction={async () => await deleteTodo(todo.id)}
          variant="ghost"
          size="icon"
        >
          <Trash2 className="h-5 w-5" />
          <span className="sr-only">Delete Todo</span>
        </Button>
      </CardContent>
    </Card>
  );
}
