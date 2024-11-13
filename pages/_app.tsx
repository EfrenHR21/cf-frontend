
import type { AppProps } from 'next/app';
import { Provider } from '../context';
import { Container } from 'react-bootstrap';
import Heading from '@/components/shared/Heading';

import TopHeader from '@/components/shared/TopHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/shared/Footer';
import { ToastProvider } from 'react-toast-notifications';


export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider>
      <Heading /> 
        <Container>
          <ToastProvider> 
            <TopHeader />
          <Component {...pageProps} />
          <Footer />
          </ToastProvider>
        </Container>
		</Provider>
	);
}