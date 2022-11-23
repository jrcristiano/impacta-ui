import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import {
  Typography,
  Box,
  Tab,
  Tabs,
  Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useSnackbar } from 'notistack';

import UserForm from '../../components/forms/user-form';
import userService from '../../services/user';
import date from '../../helpers/date';

export default function Editar() {
  const router = useRouter();
  
  const [usuario, setUsuario] = useState({});

  const { enqueueSnackbar } = useSnackbar();

  const handleAlertMessage = (messages, variant) => {
    if (typeof messages == 'string') {
      return enqueueSnackbar(messages, {variant});
    }

    for (let message of messages) {
      enqueueSnackbar(message, {variant});
    }
  };

  const getUsuario = async () => {
    try {
      const { data } = await userService.show(router.query.id);
      setUsuario(data);
    } catch (error) {
      handleAlertMessage('Erro ao carregar usuário.', 'error');
    }
  }

  const handleUpdate = async (data) => {
    try {
      console.log(data);
      // await userService.store(data);
      // handleAlertMessage('Usuário cadastrado com sucesso!', 'success');
      // return router.push('/usuarios');
      console.log('Usuário atualizado!');
    } catch ({response}) {
      handleAlertMessage(response.data.message, 'error');
    }
  };

  useEffect(() => {
    if (!router.query.id) {
      return;
    }

    getUsuario();

  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>Editar usuário</title>
      </Head>
      <Box>
        <div className="justify-content-between flex-wrap">
          <div className="sm-w-100">
            <Typography
              className="titleMain"
              variant="h5"
              color="#323232"
              noWrap
              component="div">
                <Button onClick={() => router.back()}>
                  <ArrowBackIcon style={{ fontSize: 35, color: '#1a4287' }} />
                </Button>
                {usuario.name} { usuario.lastname }
            </Typography>
            <Typography style={{ marginLeft: 72, color: 'rgba(0, 0, 0, 0.6)' }}>
              Modificado em: {date(usuario.updated_at)}
            </Typography>
        </div>
      </div>
        <Box className="sm-w-100" style={{ borderBottom: '1px solid #bbb', marginTop: 15 }}>
          <Tabs sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#1A4287' },
              '& .MuiTab-root': { color: '#1D1D1D', },
              '& .Mui-selected': { color: '#1A4287' },
          }}
          value={0}>
            <Tab label="Edição de usuário" />
          </Tabs>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          <Box>
            <UserForm usuario={usuario} handleSubmit={handleUpdate} />
          </Box>
        </Box>
      </Box>
    </>
  );
}