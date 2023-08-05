import {Box, Flex, Text} from "@chakra-ui/react";

const Header = () =>{
    return(
        <Flex w="100%" h="3rem" justifyContent="right" alignItems="center" pr="0.3rem" borderBottom="1px solid #c2c2c2">
            <Flex
                w="2.4rem"
                h="2.4rem"
                borderRadius="50%"
                border="1px solid #000 !important"
                bgColor="gray.100"
                justifyContent="center"
                alignItems="center"
            >
                <Text fontSize="2rem" fontWeight="bold">T</Text>
            </Flex>
        </Flex>
    )
}

export default Header;