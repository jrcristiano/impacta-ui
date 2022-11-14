import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  StyledTableRow,
  Autocomplete,
  TextField
} from "@mui/material";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { Box } from "@mui/system";
import Search from "@mui/icons-material/Search";
import { styled } from '@mui/material/styles';;
import Paper from '@mui/material/Paper';
import { useSnackbar } from "notistack";
import schoolService from "../../services/school-service";
import userService from "../../services/user-service";
import date from "../../helpers/date";

export default function Index() {
  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);

  const [buscar, setBuscar] = useState('');

  const [escolas, setEscolas] = useState([]);
  const [escolaSelecionada, setEscolaSelecionada] = useState('');

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
    //
  };

  const getUsuarios = async () => {
    try {
      const { data } = await userService.getAll();
      setUsuarios(data);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar os usuários.', 'error');
    }
  }

  const getEscolas = async () => {
    try {
      const {data} = await schoolService.getNameEscolas();
      const escolas = data.map(escola => escola.id + ' - ' + escola.name);
      
      setEscolas(escolas);
    } catch (error) {
      handleAlertMessage('Não foi possível carregar as escolas.', 'error');
    }
  }

  const handlePerfilSelecionado = (event) => {
    setPerfilSelecionado(event.target.value);
  
    if (event.target.value) {
      return getEscolas({
        buscar,
        segmentos: perfilSelecionado,
        perfil: event.target.value,
      });
    }

    return getEscolas();
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
            <Button onClick={() => router.push('/escolas/nova')}
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
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={escolas}
                    renderInput={(params) => <TextField {...params} label="Escolas" />}
                  />
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
                    <MenuItem value={'TODOS'}>Todos</MenuItem>
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
                        onClick={() => router.push(`/escolas/${usuario.id}`)}
                        style={{marginRight: 10, backgroundColor: '#1A4287'}}>
                        <VisibilityIcon />
                      </Button>
                      <Button variant="contained" color="error" onClick={() => {}}>
                        <DeleteIcon />
                      </Button>
                      
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </>
  );
};
