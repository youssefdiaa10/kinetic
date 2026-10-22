import { Route, Routes } from 'react-router';
import AuthPage from './pages/AuthPage';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Onboarding from './pages/Onboarding';
import Todos from './pages/Todos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<AuthPage mode="signup" />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/todos" element={<Todos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
