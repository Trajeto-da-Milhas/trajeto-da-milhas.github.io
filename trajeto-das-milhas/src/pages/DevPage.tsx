import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPanel from '../components/dev/AdminPanel';
import VSLStudio from './VSLStudio';

const DevPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminPanel />} />
      <Route path="/vsl-studio" element={<VSLStudio />} />
    </Routes>
  );
};

export default DevPage;
