import { Router } from './routes';
import { useEffect } from 'react';
import { useAccountStore } from './stores/accountStore';
import { initTheme } from './assets/colors/theme';

function App() {
  const { checkTokenValidityandRefresh } = useAccountStore();

  useEffect(() => {
    initTheme();
    checkTokenValidityandRefresh();
  }, []);

  return <Router />;
}

export default App;