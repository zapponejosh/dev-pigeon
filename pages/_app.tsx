import '../styles/globals.css';
import AuthContext from '../lib/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthContext value={{}}>
      <Component {...pageProps} />
    </AuthContext>
  );
}

export default MyApp;
