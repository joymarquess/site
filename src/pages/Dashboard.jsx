import { useAuth } from '../contexts/AuthContext';
import NewsForm from '../components/NewsForm';
import NewsList from '../components/NewsList';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome, {user.email}
      </h1>
      <NewsForm />
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Latest Positive News</h2>
        <NewsList />
      </div>
    </div>
  );
}