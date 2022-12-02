import { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  OutlinedInput,
  Box,
  Chip,
  Button,
} from '@mui/material';

import segmentService from '../../services/segment';
import { useSnackbar } from 'notistack';

/* icons */
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(segmento, segmentosSelecionados, theme) {
  return {
    fontWeight:
      segmentosSelecionados.indexOf(segmento) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function SchoolForm(props) {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const [segmentos, setSegmentos] = useState([]);
  const [state, setState] = useState({
    name: '',
    city: '',
    phone: '',
    cnpj: '',
    description: '',
    segmentosSelecionados: [],
    statusSelecionado: '',
  });

  const handleState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    props.handleSubmit({
      name: state.name,
      city: state.city,
      segments: state.segmentosSelecionados,
      status: state.statusSelecionado,
      phone: state.phone,
      cnpj: state.cnpj,
      description: state.description
    });
  }

  const getSegmentos = async () => {
    try {
      const { data } = await segmentService.getAll();
      const segmentos = data.map((segmento) => segmento.name);
      setSegmentos(segmentos);
    } catch (error) {
      enqueueSnackbar('Não foi possível carregar os segmentos.', { variant: 'error' });
    }
  }
  useEffect(() => {
    getSegmentos();

    const { escola } = props;
    if (!escola) {
      return;
    }

    if (!escola.id) {
      return;
    }

    if (!escola.segments) {
      return;
    }
    
    const segments = escola.segments.map((segment) => segment.name);
    setState({
      name: escola.name || '',
      city: escola.city || '',
      phone: escola.phone || '',
      cnpj: escola.cnpj || '',
      statusSelecionado: escola.status || '',
      segmentosSelecionados: segments || []
    });
    
  }, [props.escola]);

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Grid style={{ marginTop: 5 }}
          container
          rowSpacing={3}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField value={state.name}
              onChange={handleState}
              fullWidth
              label="Nome"
              id="name"
              name="name" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={state.city}
              onChange={handleState}
              fullWidth
              label="Cidade"
              id="city"
              name="city" />
          </Grid>
          <Grid item xs={4}>
            <TextField value={state.phone}
              onChange={handleState}
              fullWidth
              label="Telefone"
              id="phone"
              name="phone" />
          </Grid>
          <Grid item xs={4}>
            <TextField value={state.cnpj}
              onChange={handleState}
              fullWidth
              label="CNPJ"
              id="cnpj"
              name="cnpj" />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Status
              </InputLabel>
              <Select
                name="statusSelecionado"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state.statusSelecionado}
                label="Status"
                onChange={handleState}
              >
                <MenuItem selected
                  value="ATIVO">
                  Ativo
                </MenuItem>
                <MenuItem value="INATIVO">
                  Inativo
                </MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">
                Segmentos
              </InputLabel>
              <Select fullWidth
                name="segmentosSelecionados"
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={state.segmentosSelecionados}
                onChange={handleState}
                input={<OutlinedInput id="select-multiple-chip" label="Segmentos" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {segmentos.map((segmento, key) => {
                  return (
                    <MenuItem
                      key={key}
                      value={segmento}
                      style={getStyles(segmento, state.segmentosSelecionados, theme)}
                    >
                      {segmento}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField onChange={handleState}
              name="description"
              value={state.description}
              fullWidth
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
            />
          </Grid>

          <Grid item xs={6}>
            <Button type="submit"
              style={{ background: '#24963E' }}
              startIcon={<CheckIcon />}
              variant="contained">
              Salvar
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
}
