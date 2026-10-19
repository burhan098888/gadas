import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager.jsx';
import SiteLayout from './layouts/SiteLayout.jsx';
import Home from './pages/Home.jsx';
import Tests from './pages/Tests.jsx';
import TestIntro from './pages/TestIntro.jsx';
import TestRunner from './pages/TestRunner.jsx';
import Result from './pages/Result.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="tes" element={<Tests />} />
          <Route path="tes/:testId" element={<TestIntro />} />
          <Route path="hasil/:attemptId" element={<Result />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="tes/:testId/kerjakan" element={<TestRunner />} />
      </Routes>
    </BrowserRouter>
  );
}