import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Tab,
  Tabs,
  Button
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useSnackbar } from 'notistack';

import SchoolForm from '../../components/forms/school-form';
import schoolService from '../../services/school-service';
import segmentService from '../../services/segment-service';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Nova() {
  const router = useRouter();

  const [segmentos, setSegmentos] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

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
      await schoolService.store(data);
      router.push('/escolas');
      handleAlertMessage('Escola cadastrada com sucesso.', 'success');
    } catch ({response}) {
      handleAlertMessage(response.data.message, 'error')
    }
  }

  const getSegmentos = async () => {
    try {
      const { data } = await segmentService.getAll();
      const segmentos = data.map((segmento) => segmento.name);
      setSegmentos(segmentos);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar os segmentos.', 'error');
    }
  }

  useEffect(() => {
    getSegmentos();
  }, []);

  return (
    <>
      <Head>
        <title>Nova escola</title>
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
                Nova escola
            </Typography>
        </div>
      </div>
        <Box className="sm-w-100" style={{borderBottom: '1px solid #bbb'}}>
          <Tabs sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#1A4287' },
              '& .MuiTab-root': { color: '#1D1D1D', },
              '& .Mui-selected': { color: '#1A4287' },
            }} value={tabIndex} onChange={handleTabChange}>
            <Tab label="Cadastro de escola" />
          </Tabs>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          {tabIndex === 0 && (
            <Box>
                <div>
                  <SchoolForm handleSubmit={handleStore} segmentos={segmentos} />
                </div>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
