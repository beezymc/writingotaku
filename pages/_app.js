import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BlogContextProvider } from '../components/BlogContext';


function MyApp({ Component, pageProps }) {
  return (
    <BlogContextProvider>
      <Component {...pageProps} />
    </BlogContextProvider>
  );
}

export default MyApp
