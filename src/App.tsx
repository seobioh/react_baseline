import { Router } from './routes';
import { useEffect } from 'react';
import { useAccountStore } from './stores/accountStore';

function App() {
  const { checkTokenValidityandRefresh } = useAccountStore();

  useEffect(() => {
    checkTokenValidityandRefresh();
  }, []);

  return <Router />;
}

export default App;