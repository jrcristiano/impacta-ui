import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  TextField
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { Box } from "@mui/system";
import Search from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useSnackbar } from "notistack";
import schoolService from "../../services/school";
import userService from "../../services/user";
import date from "../../helpers/date";

export default function Index() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);

  const [buscar, setBuscar] = useState('');

  const [escolas, setEscolas] = useState([]);
  const [escolaSelecionada, setEscolaSelecionada] = useState('TODOS');

  const [perfilSelecionado, setPerfilSelecionado] = useState('TODOS');

  const { enqueueSnackbar } = useSnackbar();

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleAlertMessage = (messages, variant) => {
    if (typeof messages == 'string') {
      return enqueueSnackbar(messages, { variant });
    }

    for (let message of messages) {
      enqueueSnackbar(message, {variant});
    }
  };

  const handleBuscar = (event) => {
    setBuscar(event.target.value);
  
    if (event.target.value) {
      return getUsuarios({
        buscar: event.target.value,
        school: escolaSelecionada,
        role: perfilSelecionado,
      });
    }

    return getUsuarios();
  };

  const getUsuarios = async (params) => {
    try {
      const { data } = await userService.getAll(params);
      setUsuarios(data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar os usuários.', 'error');
    }
  }

  const getEscolas = async () => {
    try {
      const { data } = await schoolService.getNameEscolas();
      setEscolas(data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar as escolas.', 'error');
    }
  }

  const handleEscolaSelecionada = (event) => {
    setEscolaSelecionada(event.target.value);
  
    if (event.target.value) {
      return getUsuarios({
        buscar,
        school: event.target.value,
        role: perfilSelecionado,
      });
    }

    return getUsuarios();
  };

  const handlePerfilSelecionado = (event) => {
    setPerfilSelecionado(event.target.value);
  
    if (event.target.value) {
      return getUsuarios({
        buscar,
        school: escolaSelecionada,
        role: event.target.value,
      });
    }

    return getUsuarios();
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1A4287',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleDestroy = async (id) => {
    try {
      const question = 'Ao confirmar, todos os dados vinculados também serão removidos. Deseja continuar?';
      if (confirm(question)) {
        await userService.delete(id);

        const filterUsuarios = usuarios.filter(usuario => usuario.id !== id);
        setUsuarios(filterUsuarios);

        handleAlertMessage('Usuário removido com sucesso!', 'success');
      }
    } catch (error) {
      handleAlertMessage('Não foi possível remover usuário.', 'error');
    }
  }

  useEffect(() => {
    getEscolas();
    getUsuarios();
  }, [])

  return (
    <>
      <Head>
        <title>Usuários</title>
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
                Usuários
            </Typography>
          </div>
          <div>
            <Button onClick={() => router.push('/usuarios/novo')}
              className="background-blue button-rounded" variant="contained">
              <AddIcon /> Novo usuário
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
                  <InputLabel id="demo-simple-select-label">Escolas</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={escolaSelecionada}
                    label="Escolas"
                    onChange={handleEscolaSelecionada}
                  >
                    <MenuItem value={'TODOS'}>Todos</MenuItem>
                    {escolas.map((escola) => (
                      <MenuItem key={escola.id} value={escola.id}>{escola.id} - {escola.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Item>
            </Grid>

            <Grid style={{paddingRight: 10}}
                item
                xs={12}
                md={12}
                lg={3}>
              <Item elevation={0}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Perfil
                  </InputLabel>
                  <Select
                    onChange={handlePerfilSelecionado}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={perfilSelecionado}
                    label="Status"
                  >
                    <MenuItem value="TODOS">Todos</MenuItem>
                    <MenuItem value={'ADMIN'}>Administrador</MenuItem>
                    <MenuItem value={'ALUNO'}>Aluno</MenuItem>
                    <MenuItem value={'PROFESSOR'}>Professor</MenuItem>
                    <MenuItem value={'COORDENADOR'}>Coordenador</MenuItem>
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
                  <StyledTableCell align="center">Sobrenome</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Escola</StyledTableCell>
                  <StyledTableCell align="center">Perfil</StyledTableCell>
                  <StyledTableCell align="center">Criado em</StyledTableCell>
                  <StyledTableCell align="center">Ações</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map((usuario, key) => (
                  <StyledTableRow key={usuario.id}>
                    <StyledTableCell align="center">{usuario.id}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.name}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.lastname}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.email}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.school.name}</StyledTableCell>
                    <StyledTableCell align="center">{usuario.role}</StyledTableCell>
                    <StyledTableCell align="center">{date(usuario.created_at)}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Button variant="contained"
                        onClick={() => router.push(`/usuarios/${usuario.id}`)}
                        style={{marginRight: 10, backgroundColor: '#1A4287'}}>
                        <VisibilityIcon />
                      </Button>
                      <Button variant="contained" color="error" onClick={() => handleDestroy(usuario.id)}>
                        <DeleteIcon />
                      </Button>
                      
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {!usuarios.length && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={8} align="center">Nenhum usuário encontrado...</StyledTableCell>
                  </StyledTableRow>
                )}                
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
};
