import { Flex, Text, Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton } from "@chakra-ui/react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface TodoProps {
    id: number;
    title: string;
    onDelete: (id: number) => void;
}

const Todo = (props: TodoProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const cancelRef = useRef<HTMLButtonElement>(null); // Create a ref for the cancel button
    const navigate = useNavigate();

    const handleDeleteClick = () => {
        setIsDeleting(true);
    };

    const handleConfirmDelete = () => {
        props.onDelete(props.id);
        setIsDeleting(false);
    };

    const handleCancelDelete = () => {
        setIsDeleting(false);
    };

    const handleEditClick = () => {
        navigate(`/todo/${props.id}`); // Chuyển hướng đến đường dẫn có định dạng "/todo/:id"
    };

    return (
        <Flex justifyContent="space-between" alignItems="center">
            <Text>{props.title}</Text>
            <Flex>
                <FiEdit onClick={handleEditClick} style={{ marginRight: "5px" }} />
                <FiTrash2 onClick={handleDeleteClick} />
            </Flex>

            {/* AlertDialog to confirm delete */}
            <AlertDialog
                isOpen={isDeleting}
                leastDestructiveRef={cancelRef} // Pass the ref to leastDestructiveRef
                onClose={handleCancelDelete}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Confirm Delete</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        Are you sure you want to delete this todo?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleCancelDelete}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Flex>
    );
};

export default Todo;
