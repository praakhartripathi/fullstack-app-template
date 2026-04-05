import Navbar from './Navbar';

/**
 * Main layout wrapper — provides consistent Navbar + content structure.
 */
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Full-Stack Template. Built with React, Spring Boot &amp; PostgreSQL.
            </p>
            <div className="flex items-center gap-6">
              <a href="/swagger-ui.html" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                API Docs
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
