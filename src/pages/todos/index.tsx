// File: Todos.tsx

import React, { useEffect, useState } from "react";
import {
    VStack,
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Heading,
} from "@chakra-ui/react";
import Todo from "./todo";
import Header from "../../components/Header";
import { ITodo, STATUS } from "../../interfaces/response";
import { FiRotateCw } from "react-icons/fi";

const todoData: ITodo[] = [
    {
        id: 1,
        status: STATUS.NEW,
        title: "Implement Login",
        body: "Create login function",
        dueDate: new Date("2023-08-05"),
    },
    {
        id: 2,
        status: STATUS.NEW,
        title: "Implement Register",
        body: "Create login function",
        dueDate: new Date("2023-08-06"),
    },
    {
        id: 3,
        status: STATUS.NEW,
        title: "Implement List",
        body: "Create login function",
        dueDate: new Date("2023-08-07"),
    },
];

const Todos = () => {
    const [todos, setTodos] = useState<ITodo[]>(() => {
        const storageTodos = localStorage.getItem("todos");
        if (!storageTodos || !Array.isArray(JSON.parse(storageTodos))) {
            return todoData;
        }
        return JSON.parse(storageTodos);
    });

    const [todosCompleted, setTodosCompleted] = useState<ITodo[]>(() => {
        const storageTodosCompleted = localStorage.getItem("todosCompleted");
        if (!storageTodosCompleted || !Array.isArray(JSON.parse(storageTodosCompleted))) {
            return [];
        }
        return JSON.parse(storageTodosCompleted);
    });

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [nextId, setNextId] = useState<number>(todoData.length + 1);
    const [dueDateInput, setDueDateInput] = useState<string>("");

    useEffect(() => {
        const jsonTodos = JSON.stringify(todos);
        localStorage.setItem("todos", jsonTodos);

        if (todos.length > 3) {
            const maxId = Math.max(...todos.map((todo) => todo.id));
            setNextId(maxId + 1);
        } else {
            setNextId(todoData.length + 1);
        }
    }, [todos]);

    useEffect(() => {
        const jsonTodosCompleted = JSON.stringify(todosCompleted);
        localStorage.setItem("todosCompleted", jsonTodosCompleted);
    }, [todosCompleted]);

    const addNewTodo = () => {
        const newTodo = {
            id: nextId,
            status: STATUS.NEW,
            title: title,
            body: body,
            dueDate: new Date(dueDateInput),
        };
        setTodos([...todos, newTodo]);
        setTitle("");
        setDueDateInput("");
        setBody("");
        setNextId(nextId + 1);
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
        setTodosCompleted(todosCompleted.filter((todo) => todo.id !== id));
    };

    const handleCheckTodo = (id: number) => {
        const todoToComplete = todos.find((todo) => todo.id === id);
        if (todoToComplete) {
            setTodos(todos.filter((todo) => todo.id !== id));
            setTodosCompleted([...todosCompleted, todoToComplete]);
        }
    };

    const handleUndoTodo = (id: number) => {
        const todoUndo = todosCompleted.find((todo) => todo.id === id);
        if (todoUndo) {
            setTodosCompleted(todosCompleted.filter((todo) => todo.id !== id));
            setTodos([...todos, todoUndo]);
        }
    };

    return (
        <VStack w="100%" minH="100vh">
            <Header />
            <Heading as="h1" size="xl">
                Todo List
            </Heading>
            <Box w="60%" p="4">
                {todos.map((value) => (
                    <Box p="30" borderBottom="2px solid black" key={value.id} my="5px" _hover={{ backgroundColor: 'gray.300'}}>
                        <Todo id={value.id} title={value.title} onDelete={handleDeleteTodo} />
                        <Button onClick={() => handleCheckTodo(value.id)}>✔</Button>
                    </Box>
                ))}
            </Box>
            <Heading as="h1" size="xl">
                Add new todo
            </Heading>
            <Box w="60%" p="4">
                <VStack>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input
                            placeholder="Enter title"
                            borderColor="#000000"
                            width="500px"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Body</FormLabel>
                        <Input
                            placeholder="Enter body"
                            borderColor="#000000"
                            minH="100px"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Due Date</FormLabel>
                        <Input
                            placeholder="Select Date and Time"
                            borderColor="#000000"
                            size="md"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={dueDateInput}
                            onChange={(e) => setDueDateInput(e.target.value)}
                        />
                    </FormControl>
                    <Button colorScheme="blue" onClick={addNewTodo}>
                        Add New Todo
                    </Button>
                </VStack>
            </Box>
            <Heading as="h1" size="xl">
                Todo Completed
            </Heading>
            <Box w="60%" p="4">
                {todosCompleted.map((value) => (
                    <Box p="30" borderBottom="2px solid black" key={value.id} my="5px" _hover={{ backgroundColor: 'gray.300'}}>
                        <Todo id={value.id} title={value.title} onDelete={handleDeleteTodo} />
                        <Button onClick={() => handleUndoTodo(value.id)}>
                            <FiRotateCw />
                        </Button>
                    </Box>
                ))}
            </Box>
        </VStack>
    );
};

export default Todos;
