import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreateLinkForm from '../components/CreateLinkForm';
import LinksTable from '../components/LinksTable';
import { LinkProvider, useLinks } from '../context/LinkContext';
import Loader from '../components/Loader';

const DashboardContent = () => {
  const { links, loading } = useLinks();

  return (
    <>
      <Header />
      <Container className="py-4">
        <CreateLinkForm />
        <div className="mt-4">
          {loading ? <Loader /> : <LinksTable />}
        </div>
      </Container>
      <Footer />
    </>
  );
};

const Dashboard = () => {
  return (
    <LinkProvider>
      <DashboardContent />
    </LinkProvider>
  );
};

export default Dashboard;