import { Route, Routes } from 'react-router';
import Loading from './components/Loading';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Onboarding from './pages/Onboarding';
import Todos from './pages/Todos';

function App() {

  const isLoading = false

  return (
    <>
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    { isLoading && <Loading/> }
    </>
  )
}

export default App
