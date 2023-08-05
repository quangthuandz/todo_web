import { Flex, Text,Input,FormControl,FormLabel,VStack,Button} from "@chakra-ui/react";
import {useState} from "react";
import {ITodo} from "../../../interfaces/response";
interface CreateTodoProps {
    handleAddTodo: (newTodo: ITodo) => void;
}
const CreateTodo = () => {

    return (
        <Flex justifyContent="space-between" alignItems="center" marginLeft="0">

        </Flex>
    );
};


export default CreateTodo;
