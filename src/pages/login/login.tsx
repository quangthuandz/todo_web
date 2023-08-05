import {
    VStack,
    Text,
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    Heading,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { User} from "../../interfaces/response";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const userData: User[] = [
    {
        id: 1,
        username:'thuan',
        password:'123',
        name:'Quang Thuan'
    }
];

const Login = () => {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const handleLogin = () => {
        for (const user of userData) {
            if (user.username === username && user.password === password) {
                navigate("/todos");
                return;
            }
            else{
                window.alert("Wrong username or password");
            }
        }
    }
    return (
        <VStack w="100%" minH="100vh" backgroundColor='gray.300'>

            <Box marginTop='100px' padding='50px 0' width='30%' backgroundColor='white' textAlign='center'>
                <Heading as="h1" size="xl" marginBottom='50px'>
                    Welcome to todolist!
                </Heading>
                <FormControl margin="30px auto" width="80%">
                    <Input
                        placeholder='Username'
                        value={username}
                        onChange = {(e) => setUsername(e.target.value)}
                        borderColor="#000000"
                        size="md"
                    />
                </FormControl>
                <FormControl margin="0 auto" width="80%">
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Password'
                            value={password}
                            onChange = {(e) => setPassword(e.target.value)}
                            borderColor="#000000"
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button margin="0 auto" width="80%" marginTop='20px' backgroundColor='black' color='white' onClick={handleLogin} _hover={{ backgroundColor: 'gray.300', color: 'black' }}>Login</Button>
            </Box>
        </VStack>
    );
};

export default Login;
