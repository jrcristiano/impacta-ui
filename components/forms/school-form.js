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
  const theme = useTheme();

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [description, setDescription] = useState('');
  const [segmentosSelecionados, setSegmentosSelecionados] = useState([]);
  const [statusSelecionado, setStatusSelecionado] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    props.handleSubmit({
      name,
      city,
      segments: segmentosSelecionados,
      status: statusSelecionado,
      phone,
      cnpj,
      description
    });
  }

  useEffect(() => {
    const { escola } = props;
    if (!escola) {
      return;
    }

    if (!escola.segments) {
      return;
    }
      
    setName(escola.name || '');
    setCity(escola.city || '');
    setPhone(escola.phone || '');
    setCnpj(escola.cnpj || '');
    setDescription(escola.description || '');
    setStatusSelecionado(escola.status || '');
    
    const segments = escola.segments.map((segment) => segment.name);
    setSegmentosSelecionados(segments || []);
    
  }, [props.escola])

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        <Grid style={{marginTop: 5}} container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            
            <TextField value={name} onChange={(event) => setName(event.target.value)} fullWidth label="Nome" id="name" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={city} onChange={(event) => setCity(event.target.value)} fullWidth label="Cidade" id="city" />
          </Grid>
          <Grid item xs={4}>
            <TextField value={phone} onChange={(event) => setPhone(event.target.value)} fullWidth label="Telefone" id="phone" />
          </Grid>
          <Grid item xs={4}>
            <TextField value={cnpj} onChange={(event) => setCnpj(event.target.value)} fullWidth label="CNPJ" id="cnpj" />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={statusSelecionado}
                label="Status"
                onChange={(event) => setStatusSelecionado(event.target.value)}
              >
              <MenuItem selected value="ATIVO">Ativo</MenuItem>
              <MenuItem value="INATIVO">Inativo</MenuItem>
            </Select>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-chip-label">Segmentos</InputLabel>
              <Select fullWidth
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={segmentosSelecionados}
                onChange={(event) => setSegmentosSelecionados(event.target.value)}
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
                {props.segmentos.map((segmento, key) => {
                  return (
                    <MenuItem
                      key={key}
                      value={segmento}
                      style={getStyles(segmento, segmentosSelecionados, theme)}
                    >
                      {segmento}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField onChange={(event) => setDescription(event.target.value)}
              value={description || ''}
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
