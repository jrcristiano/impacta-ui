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

export default function Novo() {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const handleAlertMessage = (messages, variant) => {
    if (typeof messages == 'string') {
      return enqueueSnackbar(messages, {variant});
    }

    for (let message of messages) {
      enqueueSnackbar(message, {variant});
    }
  };

  const handleStore = async (data) => {
    try {
      await userService.store(data);
      handleAlertMessage('Usuário cadastrado com sucesso!', 'success');
      return router.push('/usuarios');
    } catch ({response}) {
      handleAlertMessage(response.data.message, 'error');
    }
  };

  return (
    <>
      <Head>
        <title>Novo usuário</title>
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
                Novo usuário
            </Typography>
        </div>
      </div>
        <Box className="sm-w-100" style={{borderBottom: '1px solid #bbb'}}>
          <Tabs sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#1A4287' },
              '& .MuiTab-root': { color: '#1D1D1D', },
              '& .Mui-selected': { color: '#1A4287' },
          }}
          value={0}>
            <Tab label="Cadastro de usuário" />
          </Tabs>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          <Box>
            <UserForm handleSubmit={handleStore} />
          </Box>
        </Box>
      </Box>
    </>
  );
}