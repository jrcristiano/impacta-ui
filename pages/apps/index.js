import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Head from 'next/head';
import Link from 'next/link';
import CardApp from './../../components/card-app';

import AvaCover from './../../public/apps/ava.png';
import AvaliacoesCover from './../../public/apps/avaliacoes.png';
import ItinerariosFormativosCover from './../../public/apps/itinerarios-formativos.png';
import BancoQuestoesCover from './../../public/apps/banco-de-questoes.png';
import CatLearningCover from './../../public/apps/cat-learning.png';
import EnvioCartoesCover from './../../public/apps/envio-de-cartoes.png';
import ErratasCover from './../../public/apps/erratas.png';
import EventosCover from './../../public/apps/eventos.png';
import LivroDigitalCover from './../../public/apps/livro-digital.png';
import MatrizBnccCover from './../../public/apps/matriz-bncc.png';
import MktCover from './../../public/apps/mkt-365.png';
import PortalEdrosCover from './../../public/apps/portal-edros.png';
import MinhasAvaliacoesCover from './../../public/apps/minhas-avaliacoes.png';
import PmaisRedacaoCover from './../../public/apps/redacao.png';

// css
import styles from '../../styles/Apps.module.css';

export default function Home() {
  const apps = [
    {
      name: 'AVA',
      image: AvaCover
    },
    {
      name: 'Avaliacoes',
      image: AvaliacoesCover
    },
    {
      name: 'Banco de questões',
      image: BancoQuestoesCover
    },
    {
      name: 'Cat learning',
      image: CatLearningCover
    },
    {
      name: 'Envio de cartões',
      image: EnvioCartoesCover
    },
    {
      name: 'Erratas',
      image: ErratasCover
    },
    {
      name: 'Eventos',
      image: EventosCover
    },
    {
      name: 'Itinerários formativos',
      image: ItinerariosFormativosCover
    },
    {
      name: 'Livro digital',
      image: LivroDigitalCover
    },
    {
      name: 'Matriz BNCC',
      image: MatrizBnccCover
    },
    {
      name: 'MKT 356',
      image: MktCover
    },
    {
      name: 'Portal edros',
      image: PortalEdrosCover
    },
    {
      name: 'Minhas avaliações',
      image: MinhasAvaliacoesCover,
    },
    {
      name: 'P+ redação',
      image: PmaisRedacaoCover,
    },
  ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Aplicativos</title>
      </Head>
      <div>
        <Typography style={{ paddingTop: 0 }}
          className="titleMain"
          variant="h5"
          color="#323232"
          noWrap
          component="div">
            Aplicativos
        </Typography>
        <Grid container spacing={4}>
          {apps.map((app, index) => (
              <Link href="https://google.com">
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={4}
                  key={index}>
                  <CardApp className={styles.cardApp} name={app.name} image={app.image} />
                </Grid>
              </Link>
            ))}
        </Grid>
      </div>
    </div>
  );
}
