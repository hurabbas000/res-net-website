import { ThemeProvider } from '@/context/ThemeContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HomePage } from '@/pages/HomePage';
import { AcademyPage } from '@/pages/AcademyPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ResourcesPage } from '@/pages/ResourcesPage';
import { ContactPage } from '@/pages/ContactPage';
import { TeamPage } from '@/pages/TeamPage';
import { AdminPage } from '@/pages/AdminPage';

function PageRouter() {
  const { route } = useRouter();

  switch (route) {
    case 'home':
      return <HomePage />;
    case 'academy':
      return <AcademyPage />;
    case 'community':
      return <CommunityPage />;
    case 'resources':
      return <ResourcesPage />;
    case 'contact':
      return <ContactPage />;
    case 'team':
      return <TeamPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider>
          <div className="min-h-screen flex flex-col bg-white dark:bg-navy-900">
            <Navbar />
            <main className="flex-1">
              <PageRouter />
            </main>
            <Footer />
          </div>
        </RouterProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
