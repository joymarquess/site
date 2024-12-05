import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export default function NewsForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, 'news'), {
        title,
        content,
        createdAt: serverTimestamp(),
        authorId: user.uid,
        authorEmail: user.email
      });
      
      setTitle('');
      setContent('');
      toast.success('News posted successfully!');
    } catch (error) {
      toast.error('Failed to post news');
      console.error('Error adding news:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32"
          required
        />
      </div>
      
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Post News
      </button>
    </form>
  );
}