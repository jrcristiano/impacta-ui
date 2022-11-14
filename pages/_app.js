import { SnackbarProvider } from 'notistack';
import DefaultLayout from '../layouts/default-layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SnackbarProvider maxSnack={20}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </SnackbarProvider>
  );
}

export default MyApp
