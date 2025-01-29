import {  TrashIcon } from "@heroicons/react/24/solid";
import { Checkbox, Tooltip, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import Swal from "sweetalert2";

export default function Todo() {
  const { token } = useContext(AppContext);

  const [formData, setFormData] = useState({
    title: "",
  });

  const [todos, setTodos] = useState([]);
  console.log(todos.length);

  const [errors, setErrors] = useState({});

  async function createTodo(e) {
    e.preventDefault();
    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
      setErrors(data.errors);
    } else {
      getTodo();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Todo added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        title: "",
      });
    }
  }

  async function getTodo() {
    const res = await fetch("/api/todos?status=pending", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const dataTodo = await res.json();
    console.log(dataTodo);

    if (res.ok) {
      setTodos(dataTodo.todos);
    } else {
      console.log(dataTodo);
    }
  }

  useEffect(() => {
    getTodo();
  }, []);

  async function handleToggle(e, id) {
    const isChecked = e.target.checked;
    if (isChecked) {
      const res = await fetch(`/api/todos/updateStatus/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "completed",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        getTodo();
      } else {
        console.log(data);
      }
    } else {
      const res = await fetch(`/api/todos/updateStatus/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "pending",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        getTodo();
      } else {
        console.log(data);
      }
    }
    console.log(isChecked + " " + id);
  }

  async function handleDelete(id) {
    const result = await Swal.fire({
      title: "Are you sure you want to delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Todo deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        getTodo();
      } else {
        console.log(data);
      }
    } else {
      console.log("err");
    }
  }

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState({
    id: '',
    title: ''
  })

  const handleEditClick = (title, id) => {
    setIsEditing(true)
    setEditedTitle({
      id: id,
      title: title
    })
  }

  async function handleUpdate(e, id) {
    if(e.key === 'Enter') {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editedTitle.title,
        }),
      })

      const data = await res.json()

      if(res.ok) {
        getTodo()
        setIsEditing(false)
      } else {
        console.log(data)
      }
    }
  }

  return (
    <>
      <div className="mt-5">
        <h1 className="text-4xl font-bold">To Do</h1>
        <p className="text-lg text-dark">You need yo work on</p>
      </div>
      <div className="grid grid-cols-1 gap-1 mt-10">
        <div className="w-full flex justify-center mb-4">
          <div className="relative">
            <form onSubmit={createTodo}>
              <input
                className="w-100 bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Create new task.."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <button className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Create
              </button>
            </form>
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        {todos.length ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between mb-1"
            >
              <div className="bg-white px-5 py-0 w-full rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <Checkbox
                    checked={todo.status === "completed"}
                    onChange={(e) => handleToggle(e, todo.id)}
                  />
                  <Typography className="w-full">
                    {isEditing && todo.id === editedTitle.id && todo.status === 'pending' ? (
                      <input
                      type="text"
                      className="border border-slate-300 rounded-md p-1 w-full"
                      value={editedTitle.title} onChange={(e) =>
                        setEditedTitle({ ...editedTitle, title: e.target.value })
                      }
                      onKeyDown={(e) => handleUpdate(e, todo.id)}
                    />
                    ) : (
                      <span
                      className={
                        todo.status === "completed" ? "line-through" : ""
                      }
                      onClick={(e) => {e.preventDefault(); handleEditClick(todo.title, todo.id)}} >
                      {todo.title}
                    </span>
                    ) }
                  </Typography>
                  <div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleDelete(todo.id);
                      }}
                    >
                      <button>
                        <Tooltip content="Delete">
                          <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                        </Tooltip>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There are no todo</p>
        )}
      </div>
    </>
  );
}
