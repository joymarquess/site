import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function NewsList() {
  const [news, setNews] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'news'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNews(newsData);
    });

    return () => unsubscribe();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, 'news', id));
      toast.success('News deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete news');
      console.error('Error deleting news:', error);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {news.map((item) => (
        <div key={item.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.content}</p>
              <p className="text-sm text-gray-500">
                Posted by: {item.authorEmail}
              </p>
            </div>
            {user && user.uid === item.authorId && (
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}