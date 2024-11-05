import { Footer } from "../components/Footer";
import Header from '../components/Header';

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div >
        <Header />
        <main className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};
