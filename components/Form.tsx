"use client";
import { createTodo } from "@/actions/todoActions";

const Form = () => {
  const saveTodo = async (formData: FormData) => {
    const input = formData.get("todo") as string;
    console.log(input);
    const res = await createTodo(input);
    console.log(res);
  };

  return (
    <form action={saveTodo}>
      <div className="container">
        <div className="add-task flex items-center">
          <input type="text" name="todo" placeholder="Add Task" />
          <button className="plus" id="plus" type="submit">
            +
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
