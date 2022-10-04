import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { ModalContext } from "../../modal-context";

export const CreateButton: React.FC = () => {
  const { setOpen, setItem, setCreate } = useContext(ModalContext);
  const handleEdit: VoidFunction = () => {
    setCreate(true);
    setItem({
      id: 0,
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      address: "",
    });
    setOpen(true);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt="20px" mb="20px">
      <Button
        aria-label="edit"
        onClick={handleEdit}
        color="success"
        variant="contained"
        size="large"
      >
        Create new contact
      </Button>
    </Box>
  );
};
