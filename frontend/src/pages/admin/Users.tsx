import Sidebar from '../../components/admin/layout/Sidebar';
import MainContent from '../../components/admin/layout/UserContent';

const App = () => {
  return (
    <div className="flex min-h-screen bg-[#0A0A0F] text-white">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default App;