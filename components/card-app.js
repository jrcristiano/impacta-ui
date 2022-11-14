import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Launch from '@mui/icons-material/Launch';

export default function CardApp(props) {
  return (
    <Card className="cursor-pointer" style={{}} sx={{
      display: 'flex',
      boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
    }}>
      <CardMedia
        component="img"
        sx={{ width: 151, background: '#e9e9e9' }}
        image={props.image.src}
        alt="Live from space album cover"
      />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column', width: '100%'
      }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography color="#323232" component="div" variant="h6">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="#1b458d" component="div">
            Impacta
          </Typography>
        </CardContent>
        <Box style={{
          display: 'flex',
          justifyContent: 'center'
        }}
          sx={{ px: 1, pb: 1 }}>
          <Button style={{
            background: '#1b458d',
            width: '100%',
          }}
            variant="contained"
            disableElevation>
            <Launch /> <span style={{ marginLeft: 5 }}>
              Abrir
            </span>
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
