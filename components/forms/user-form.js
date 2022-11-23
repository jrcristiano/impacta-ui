import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import schoolService from "../../services/school";
import ButtonSuccess from "../buttons/button-save";

export default function UserForm(props) {
  const [escolas, setEscolas] = useState([]);
  const [state, setState] = useState({
    name: '',
    lastname: '',
    email: '',
    school: '',
    role: '',
    password: ''
  });

  const handleState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  const getEscolas = async () => {
    try {
      const { data } = await schoolService.getNameEscolas();
      setEscolas(data);
    } catch (error) {
      
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(state);
  };

  useEffect(() => {
    getEscolas();

    const { usuario } = props;
    if (!usuario.id) {
      return;
    }

    setState({
      name: usuario.name || '',
      lastname: usuario.lastname || '',
      email: usuario.email || '',
      school: usuario.school.id || '',
      role: usuario.role || '',
      password: ''
    });

  }, [props.usuario]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Grid style={{ marginTop: 5 }}
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <TextField onChange={handleState}
              value={state.name}
              fullWidth
              label="Nome"
              id="name"
              name="name" />
          </Grid>
          <Grid item xs={4}>
            <TextField onChange={handleState}
              value={state.lastname}
              fullWidth
              label="Sobrenome"
              id="lastname"
              name="lastname"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField onChange={handleState}
              value={state.email}
              fullWidth
              label="Email"
              id="email"
              name="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField onChange={handleState}
              value={state.password}
              fullWidth
              label="Senha"
              id="senha"
              name="password"
              type="password"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Perfil</InputLabel>
              <Select fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.role}
                label="Perfil"
                name="role"
                onChange={handleState}
              >
                <MenuItem value="COORDENADOR">
                  Coordenador
                </MenuItem>
                <MenuItem value="PROFESSOR">
                  Professor
                </MenuItem>
                <MenuItem value="ALUNO">
                  Aluno
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Escola
              </InputLabel>
              <Select
                name="school"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.school}
                label="Escola"
                onChange={handleState}
              >
                {escolas.map((escola) => (<MenuItem key={escola.id} value={escola.id}>{escola.id} - {escola.name}</MenuItem>))}
              </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <ButtonSuccess title="Salvar" />
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}