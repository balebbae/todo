"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";
import { addTodo } from "@/app/todo/actions";
import { CiSquarePlus } from "react-icons/ci";

function FormContent() {
  return (
    <>
      <Textarea
        minLength={4}
        name="todo"
        required
        placeholder="Add a new todo"
        className="h-6"
      />
      <Button type="submit" size="icon" variant="ghost" className="min-w-10">
        <CiSquarePlus className="size-8" />
        <span className="sr-only">Submit Todo</span>
      </Button>
    </>
  );
}

export function TodoForm() {
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Card>
      <CardContent className="p-3">
        <form
          ref={formRef}
          className="flex gap-4"
          action={async (data) => {
            await addTodo(data);
            formRef.current?.reset();
          }}
        >
          <FormContent />
        </form>
      </CardContent>
    </Card>
  );
}
