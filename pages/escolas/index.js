import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import Head from 'next/head';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Search from '@mui/icons-material/Search';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

import schoolService from '../../services/school';
import segmentService from '../../services/segment';

import { useSnackbar } from 'notistack';

export default function index() {
  const router = useRouter();

  const [buscar, setBuscar] = useState('');
  const [segmentosSelecionados, setSegmentosSelecionados] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState('TODOS');

  const [escolas, setEscolas] = useState([]);
  const [segmentos, setSegmentos] = useState([]);

  useEffect(() => {
    getSegmentos();
    getEscolas();
  }, []);

  const getEscolas = async (params) => {
    try {
      const res = await schoolService.getAll(params);
      setEscolas(res.data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar as escolas.', 'error');
    }
  }

  const getSegmentos = async () => {
    try {
      const { data } = await segmentService.getAll();
      setSegmentos(data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar os segmentos.', 'error');
    }
  }

  const { enqueueSnackbar } = useSnackbar();

  const handleAlertMessage = (messages, variant) => {
    if (typeof messages == 'string') {
      return enqueueSnackbar(messages, { variant });
    }

    for (let message of messages) {
      enqueueSnackbar(message, { variant });
    }
  };

  const handleBuscar = (event) => {
    setBuscar(event.target.value);

    if (event.target.value) {
      return getEscolas({
        buscar: event.target.value,
        segmentos: segmentosSelecionados,
        status: statusSelecionado,
      });
    }

    return getEscolas();
  };

  const handleSegmentosSelecionados = (event) => {
    const {
      target: { value },
    } = event;

    const segmentosSelecionados = typeof value === 'string' ? value.split(',') : value;
    setSegmentosSelecionados(segmentosSelecionados);
    
    if (value) {
      return getEscolas({
        buscar,
        segmentos: value,
        status: statusSelecionado,
      });
    }

    return getEscolas();
  };

  const handleStatusSelecionado = (event) => {
    setStatusSelecionado(event.target.value);
  
    if (event.target.value) {
      return getEscolas({
        buscar,
        segmentos: segmentosSelecionados,
        status: event.target.value,
      });
    }

    return getEscolas();
  };

  const joinSegments = (segments) => {
    if (!segments) {
      return;
    }

    segments = segments.map(segment => segment.name);
    return segments.join(', ');
  };

  const handleEscolaStatus = (status) => {
    return status.toUpperCase();
  };

  const handleDestroy = async (id) => {
    try {
      const question = 'Ao confirmar, todos os dados vinculados também serão removidos. Deseja continuar?';
      if (confirm(question)) {
        await schoolService.delete(id);

        const filterEscolas = escolas.filter(escola => escola.id !== id);
        setEscolas(filterEscolas);

        handleAlertMessage('Escola removida com sucesso!', 'success');
      }
    } catch (error) {
      handleAlertMessage('Não foi possível remover escola.', 'error');
    }
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1A4287',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Head>
        <title>Escolas</title>
      </Head>

      <div className="container">
        <div className="justify-content-between flex-wrap">
          <div className="sm-w-100">
            <Typography
              className="titleMain"
              variant="h5"
              color="#323232"
              noWrap
              component="div">
                Escolas
            </Typography>
          </div>
          <div>
            <Button onClick={() => router.push('/escolas/nova')}
              className={`background-blue button-rounded`} variant="contained">
              <AddIcon /> Nova escola
            </Button>
          </div>
        </div>

        <Box sx={{ paddingY: 3 }}>
          <Grid container>
            <Grid sx={{ paddingRight: 2 }}
                item
                xs={12}
                md={12}
                lg={6}>
              <TextField value={buscar}
                autoComplete="off"
                  onChange={handleBuscar}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment style={{cursor: 'pointer'}} position="end">
                        <Search style={{color: '#1A4287'}} />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                  id="outlined-basic"
                  label="Pesquisar"
                  variant="outlined" /> 
            </Grid>
          
            <Grid sx={{ paddingRight: 2 }}
              item
              xs={12}
              md={12}
              lg={3}>
              <Item elevation={0}>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-checkbox-label">Segmentos</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={segmentosSelecionados}
                    onChange={handleSegmentosSelecionados}
                    input={<OutlinedInput label="Segmentos" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {segmentos.map((segmento, key) => (
                      <MenuItem key={key} value={segmento.name}>
                        <Checkbox checked={segmentosSelecionados.indexOf(segmento.name) > -1} />
                        <ListItemText primary={segmento.name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>

            <Grid
                item
                xs={12}
                md={12}
                lg={3}>
              <Item elevation={0}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Status
                  </InputLabel>
                  <Select
                    onChange={handleStatusSelecionado}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={statusSelecionado}
                    label="Status"
                  >
                    <MenuItem value={'TODOS'}>Todos</MenuItem>
                    <MenuItem value={'ATIVO'}>Ativo</MenuItem>
                    <MenuItem value={'INATIVO'}>Inativo</MenuItem>
                  </Select>
                </FormControl>
              </Item>
            </Grid>
          </Grid>
        </Box>
        <Box style={{ borderTop: '2px solid #DCDCDD' }} sx={{ paddingTop: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                  <StyledTableCell align="center">Telefone</StyledTableCell>
                  <StyledTableCell align="center">Cidade</StyledTableCell>
                  <StyledTableCell align="center">Segmentos</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  <StyledTableCell align="center">Ações</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {escolas.map((escola, key) => (
                  <StyledTableRow key={key}>
                    <StyledTableCell align="center">{escola.id}</StyledTableCell>
                    <StyledTableCell align="center">{escola.name}</StyledTableCell>
                    <StyledTableCell align="center">{escola.phone}</StyledTableCell>
                    <StyledTableCell align="center">{escola.city}</StyledTableCell>
                    <StyledTableCell align="center">{joinSegments(escola.segments)}</StyledTableCell>
                    <StyledTableCell align="center">
                      <div className={escola.status == 'ATIVO' ? 'my-badge-active' : 'my-badge-inactive'}>
                        {handleEscolaStatus(escola.status)}
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained"
                        onClick={() => router.push(`/escolas/${escola.id}`)}
                        style={{marginRight: 10, backgroundColor: '#1A4287'}}>
                        <VisibilityIcon />
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDestroy(escola.id)}>
                        <DeleteIcon />
                      </Button>
                      
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {!escolas.length && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={6} align="center">Nehuma escola encontrada...</StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
}
