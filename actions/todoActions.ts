"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/utils/prisma";

export async function getData() {
  const res = await prisma.todo.findMany();

  if (!res) {
    throw new Error("Failed to fetch data");
  }
  return res;
}
export async function createTodo(d: any) {
  if (!d.trim()) {
    return;
  }
  const res = await prisma.todo.create({
    data: {
      title: d,
    },
  });
  console.log(res);
  revalidatePath("/");
}
export async function getTodos() {
  return prisma.todo.findMany({
    select: {
      id: true,
      title: true,
    },
  });
}

export async function edit(formData: FormData) {
  const input = formData.get("newTitle") as string;
  const inputId = formData.get("inputId") as string;

  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      title: input,
    },
  });

  revalidatePath("/");
}

export async function deleteTodo(formData: FormData) {
  const inputId = formData.get("inputId") as string;

  await prisma.todo.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath("/");
}

export async function todoStatus(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const todo = await prisma.todo.findUnique({
    where: {
      id: inputId,
    },
  });

  if (!todo) {
    return;
  }

  const updatedStatus = !todo.isCompleted;
  await prisma.todo.update({
    where: {
      id: inputId,
    },
    data: {
      isCompleted: updatedStatus,
    },
  });

  revalidatePath("/");

  return updatedStatus;
}
