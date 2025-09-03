import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ArticlesPage = () => {
  return (
    <main className="text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">Articles</h1>
        <p className="text-gray-400">
          This is where the list of article summaries will be displayed. Coming soon!
        </p>
      </div>
      <Footer />
    </main>
  );
};

export default ArticlesPage;