import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import Head from 'next/head';
import { useSnackbar } from 'notistack';

import segmentService from '../../services/segment-service';
import schoolService from '../../services/school-service';
import SchoolForm from '../../components/forms/school-form';
import date from '../../helpers/date';
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Editar() {
  const router = useRouter();

  const [escola, setEscola] = useState({});
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

  const getEscola = async () => {
    try {
      const res = await schoolService.show(router.query.id);
      setEscola(res.data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar a escola.', 'error');
    }
  }

  const getSegmentos = async () => {
    try {
      const { data } = await segmentService.getAll();
     
      const segmentos = data.map((segmento) => segmento.name);
      if (!segmentos.length) {
        throw new Error;
      }

      setSegmentos(segmentos);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar os segmentos.', 'error');
    }
  }

  const handleDestroy = async () => {
    try {
      const question = 'Ao confirmar, todos os dados vinculados também serão removidos. Deseja continuar?';
      if (confirm(question)) {
        await schoolService.delete(escola.id);
        handleAlertMessage('Escola removida com sucesso.', 'success');
        
        return router.push('/escolas');
      }
    } catch (error) {
      handleAlertMessage('Não foi possível remover escola.', 'error');
    }
  }

  const handleUpdate = async (data) => {
    try {
      await schoolService.update(router.query.id, data);
      router.push('/escolas');
      handleAlertMessage('Escola editada com sucesso.', 'success');
    } catch (error) {
      handleAlertMessage('Erro ao editar escola.', 'error');
    }
  }

  useEffect(() => {
    if (!router.query.id) return;
    
    getEscola();
    getSegmentos();
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>{escola.name}</title>
      </Head>
      
      <div style={{ padding: 10 }} className="container">
        <div style={{ flexWrap: 'wrap' }} className="justify-content-between">
          <div>
            <Typography style={{ paddingBottom: 0 }}
              className="titleMain"
              variant="h5"
              color="#323232"
              textTransform="uppercase"
              noWrap
              component="div">
              <Button onClick={() => router.back()}>
                <ArrowBackIcon style={{ fontSize: 35, color: '#1a4287' }} />
              </Button> {escola.name}
            </Typography>

            <Typography style={{ marginLeft: 72, color: 'rgba(0, 0, 0, 0.6)' }}>
              Modificado em: {date(escola.updated_at)}
            </Typography>
          </div>

          <Box fullWidth style={{ padding: 15 }}>
            <Button onClick={() => handleDestroy()} className="button-rounded" variant="contained" color="error">
              <DeleteIcon />
              <span style={{ marginLeft: 5 }}>Remover escola</span>
            </Button>
          </Box>
        </div>
        <Box className="sm-w-100" style={{borderBottom: '1px solid #bbb', marginTop: '25px'}}>
          <Tabs sx={{
              '& .MuiTabs-indicator': { backgroundColor: '#1A4287' },
              '& .MuiTab-root': { color: '#1D1D1D', },
              '& .Mui-selected': { color: '#1A4287' },
              }}
            value={tabIndex} o
            nChange={handleTabChange}>
            <Tab label="Edição de escola" />
          </Tabs>
        </Box>
        <Box sx={{ paddingTop: 1 }}>
          {tabIndex === 0 && (
            <Box>
              <div>
                <SchoolForm escola={escola} handleSubmit={handleUpdate} segmentos={segmentos} />
              </div>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
}
