import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Button, Typography } from '@mui/material';
import Head from 'next/head';

import AddIcon from '@mui/icons-material/Add';

export default function Coordenadores() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Coordenadores</title>
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
                Coordenadores
            </Typography>
          </div>
          <div>
            <Button onClick={() => router.push('/escolas/nova')}
              className={`background-blue button-rounded`} variant="contained">
              <AddIcon /> Nova coordenador
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
