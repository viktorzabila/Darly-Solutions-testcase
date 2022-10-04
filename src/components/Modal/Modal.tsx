import React, { useContext, useState } from "react";

import { Button, Dialog, Box, DialogTitle, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ModalContext } from "../../modal-context";
import { client } from "../../api/fetch";

import { formResolver } from "./validations";
import { User } from "../../types/User";

export const DialogModal: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const { open, setOpen, setItem, addUser } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(formResolver),
  });

  const createPost = async () => {
    const res = await client.post<User>("/", {
      id: 0,
      firstName,
      lastName,
      gender,
      email,
      address,
    });
    await addUser(res);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setItem({
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      gender: "",
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} keepMounted>
      <DialogTitle textAlign="center" color="green">
        Add user
      </DialogTitle>
      <Box sx={{ padding: "1em 1em" }}>
        <input type="number" {...register("id")} style={{ display: "none" }} />
        <Grid container spacing={3} sx={{ paddingTop: "1rem" }}>
          <Grid item sm={6}>
            <TextField
              required
              {...register("firstName")}
              error={!!errors?.firstName}
              helperText={errors?.firstName?.message as string}
              fullWidth
              label="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              label="Last Name"
              required
              {...register("lastName")}
              error={!!errors?.lastName}
              helperText={errors?.lastName?.message as string}
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              required
              label="Email"
              {...register("email")}
              error={!!errors?.email}
              helperText={errors?.email?.message as string}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              label="Address"
              {...register("address")}
              error={!!errors?.address}
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item sm={8}>
            <TextField
              label="Gender"
              {...register("gender")}
              error={!!errors?.gender}
              helperText={errors?.gender?.message as string}
              fullWidth
              onChange={(e) => setGender(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "1rem" }} container spacing={3} justifyContent={"space-around"}>
          <Grid item sm={4}>
            <Button color="success" fullWidth onClick={handleClose} size="large" sx={{ border: 1 }}>
              Cancel
            </Button>
          </Grid>
          <Grid item sm={4}>
            <Button
              color="success"
              sx={{ border: 1 }}
              fullWidth
              disabled={!isDirty}
              onClick={handleSubmit(createPost)}
              size="large"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};
