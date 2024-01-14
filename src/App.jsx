import { useEffect, useState } from "react";
import { TodoProvider } from "./contexts";
import { Form } from "./components";
import TodoItem from "./components/todoItems";
import {Input, Table, Select, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";


const { Option } = Select;
const handleSearch = (confirm) => {
  confirm();
};

const handleReset = (clearFilters) => {
  clearFilters();
};


function App() {

  const [todos, setTodos] = useState([]);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [searchValue, setSearchValue] = useState("");




  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const columns = [
    {
      title: "List",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <div>
          <TodoItem todo={record} />
        </div>
      ),
      width: 700,
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (
        <Tag color={completed ? "green" : "red"}>
          {completed ? "Completed" : "In Progress"}
        </Tag>
      ),
  
    },
    
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text) => <p>{text}</p>,
      filters: [
        { text: "January", value: 1 },
        { text: "February", value: 2 },
        { text: "March", value: 3 },
        { text: "April", value: 4 },
        { text: "May", value: 5 },
        { text: "June", value: 6 },
        { text: "July", value: 7 },
        { text: "August", value: 8 },
        { text: "September", value: 9 },
        { text: "October", value: 10 },
        { text: "November", value: 11 },
        { text: "December", value: 12 },
      ],
      onFilter: (value, record) => new Date(record.dueDate).getMonth() + 1 === value,
    },
    {
      title: (
        <>
             Priority 
          <Select
            style={{ width: 80, marginLeft: "3px" }}
            placeholder="Select priority"
            value={priorityFilter}
            onChange={(value) => setPriorityFilter(value)}
          >
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </>
      ),
      dataIndex: "priority",
      key: "priority",
      render: (text) => (
        <Tag color={text === "low" ? "blue" : text === "medium" ? "pink" : "orange"}>
          {text}
        </Tag>
      ),
      sorter: (a, b) => {
        if (priorityFilter) {
          return a.priority === b.priority
            ? 0
            : a.priority === priorityFilter
            ? -1
            : 1;
        } else {
          const priorityOrder = ["low", "medium", "high"];
          return (
            priorityOrder.indexOf(a.priority) -
            priorityOrder.indexOf(b.priority)
          );
        }
      },
      sortOrder: priorityFilter ? "ascend" : undefined,
    },
  ];

  const searchTodos = (keywords) => {
    const lowerKeywords = keywords.toLowerCase();
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(lowerKeywords) ||
      todo.priority.toLowerCase().includes(lowerKeywords) ||
      todo.dueDate.toLowerCase().includes(lowerKeywords) ||
      (todo.completed ? "completed" : "in progress").includes(lowerKeywords)
    );

    return filteredTodos;
  };

  const handleSearch = () => {
    const filteredTodos = searchTodos(searchValue);
    console.log(filteredTodos);
  };

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="py-8 max-h-screen">
        <div className="w-full mx-auto shadow-md rounded-lg px-4 py-3 text-teal-800/90">
          <h1 className="text-4xl font-bold text-center mb-8 mt-2 ">
            To-Do List {":)"}
          </h1>

          <div className="flex gap-8">
            {/* Form div with 40% width */}
            <div className="flex-shrink-0 w-40%">
              <div className="min-h-[460px] mb-4 border-2 rounded-xl p-4 border-teal-600/90">
                {/* Todo form goes here */}
                <Form />
              </div>
            </div>

            {/* List div with 60% width */}
            <div className="flex-1">
              <div className="flex flex-wrap gap-y-3 overflow-y-auto max-h-[460px] mb-4 border-2 rounded-xl p-4 border-teal-600/90">
                <div className="flex-grow">
                <Input
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    prefix={<SearchOutlined />}
                    style={{ marginBottom: 16 }}
                  />
                  
                  <Table
                    dataSource={searchTodos(searchValue)}
                    columns={columns}
                    rowKey="id"
                    pagination={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;



