// File: Todo.tsx

import React, { useEffect, useState } from "react";
import {
    VStack,
    Text,
    Button,
    Input, Box, Heading,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { useParams, useNavigate } from "react-router-dom";

interface ITodo {
    id: number;
    status: string;
    title: string;
    body: string;
    dueDate: Date;
}

const Todo = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const [dueDateInput, setDueDateInput] = useState<string>("");
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/todos');
    };

    const todos: ITodo[] = JSON.parse(localStorage.getItem("todos") ?? "[]", (key, value) => {
        if (key === "dueDate") {
            return new Date(value);
        }
        return value;
    });

    const todosCompleted: ITodo[] = JSON.parse(localStorage.getItem("todosCompleted") ?? "[]", (key, value) => {
        if (key === "dueDate") {
            return new Date(value);
        }
        return value;
    });

    const todoId: number = id ? parseInt(id) : 0;
    const todo: ITodo | undefined = todos.find((todo) => todo.id === todoId) || todosCompleted.find((todo) => todo.id === todoId);

    const [title, setTitle] = useState(todo?.title || '');
    const [body, setBody] = useState(todo?.body || '');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        if (todo && todo.dueDate instanceof Date) {
            const formattedDueDate = todo.dueDate.toISOString().split("T")[0];
            setDueDateInput(formattedDueDate);
        }
    };

    const handleSaveClick = () => {
        const updatedTodos = todos.map((t) =>
            t.id === todoId ? { ...t, title, body,dueDate: new Date(dueDateInput) } : t
        );
        localStorage.setItem('todos', JSON.stringify(updatedTodos));

        setIsEditing(false);
    };

    return (
        <VStack w="100%" minH="100vh">
            <Header />
            <Heading as="h1" size="xl">
                Todo Details
            </Heading>
            {todoId !== 0 ? (
                isEditing ? (
                    <>
                    <Box w="60%" p="4">
                        <Input
                            borderColor="#000000"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            mb="4"
                        />
                        <Input
                            borderColor="#000000"
                            minH="100px"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            mb="4"
                        />
                        <Input
                            borderColor="#000000"
                            placeholder="Select Date and Time"
                            size="md"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={dueDateInput}
                            onChange={(e) => setDueDateInput(e.target.value)}
                        />
                    </Box>
                        <Button onClick={handleSaveClick}>Save</Button>
                    </>
                ) : (
                    <>
                        {todo ? (
                            <>
                                <p>ID: {todo.id}</p>
                                <p>Status: {todo.status}</p>
                                <p>Title: {todo.title}</p>
                                <p>Body: {todo.body}</p>
                                <p>Due Date: {todo.dueDate instanceof Date ? todo.dueDate.toLocaleDateString() : "N/A"}</p>
                            </>
                        ) : (
                            <p>Todo not found</p>
                        )}
                        <Button onClick={handleEditClick}>Edit</Button>
                    </>
                )
            ) : (
                <p>Todo not found</p>
            )}
            <Button onClick={handleBack}>Back</Button>
        </VStack>
    );
};

export default Todo;
