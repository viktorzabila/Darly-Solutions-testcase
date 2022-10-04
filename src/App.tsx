import React, { useCallback, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroller";
import { Box, CircularProgress, Container } from "@mui/material";

import { Modal } from "./components/Modal";
import { UsersData } from "./components/UsersData";
import { ModalContext } from "./modal-context";

import { dataByPage } from "./api/constants/const";
import { BASE_URL, client } from "./api/fetch";

import { User } from "./types/User";
import "./index.scss";

export const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [, setModalContextValue] = useState<User>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const addUser = useCallback((user: User) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  }, []);

  const loadMoreUsers = async () => {
    try {
      const response = await client.get<User>(`?_page=${page + 1}&_limit=${dataByPage}`);
      await setUsers((prevList) => {
        return [...prevList, ...response];
      });
      await setPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}?_page=${1}&_limit=${dataByPage}`);
        if (!response.ok) {
          throw new Error(`error with db ${response.statusText}`);
        } else {
          const total = Number(response.headers.get("X-Total-Count"));

          await setHasMore(total > page * dataByPage);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <Container maxWidth="md" sx={{ pb: "20px" }}>
      <ModalContext.Provider
        value={{
          create: isCreate,
          open: isModalOpen,
          setCreate: setIsCreate,
          setItem: setModalContextValue,
          setOpen: setIsModalOpen,
          addUser: addUser,
        }}
      >
        <InfiniteScroll
          pageStart={1}
          loadMore={loadMoreUsers}
          hasMore={hasMore}
          loader={
            <Box
              sx={{
                display: "flex",
                margin: "20px",
                alignItems: "center",
                justifyContent: "center",
              }}
              key={`${page * dataByPage}`}
            >
              <CircularProgress />
            </Box>
          }
        >
          <UsersData users={users} />
        </InfiniteScroll>
        {isModalOpen ? <Modal /> : null}
      </ModalContext.Provider>
    </Container>
  );
};
