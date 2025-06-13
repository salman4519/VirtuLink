import Sidebar from '../../components/host/layout/Sidebar';
import MainContent from '../../components/host/layout/ProfileContent';

const App = () => {
  return (
    <div className="flex min-h-screen bg-[#0A0A0F] text-white">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;