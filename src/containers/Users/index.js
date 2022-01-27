import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import Avatar from '../../assets/avatar.svg';
import Arrow from '../../assets/arrow.svg';
import Trash from '../../assets/trash.svg';

import {
  Container,
  H1,
  Image,
  ContainerItens,
  Button,
  User,
} from './styles';

//JSX
function Users() {
  const [users, setUsers] = useState([]);
  const history = useHistory()

  useEffect(() => {

    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users");

      setUsers(newUsers);
    }
    fetchUsers()
  }, [])

  //React Hook => useEffect(efeito colateral)
  //A minha aplicação inicia( a pagina carregou, useEffect é chamado!)
  //quando um estado que está no array de dependencia do useEffect é alterado

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)
    const newUsers = users.filter((user) => user.id !== userId);

    setUsers(newUsers)
  }

  function goBackPage() {
    history.push("/");
  }



  return (

    <Container>
      <Image alt="logo-imagem" src={Avatar} />
      <ContainerItens>
        <H1>Usuários</H1>

        <ul>
          {users.map((user) => (
            <User key={user.id}>
              <p>{user.name}</p> <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}><img alt="lata-de-lixo" src={Trash} /></button>
            </User>
          ))
          }
        </ul>

        <Button onClick={goBackPage}>
          <img alt="seta" src={Arrow} />Voltar
        </Button>

      </ContainerItens>
    </Container>
  );
}

export default Users;