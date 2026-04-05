import { Link } from 'react-router-dom';

const features = [
  {
    icon: '⚛️',
    title: 'React + Tailwind',
    description: 'Modern frontend with component-based architecture, utility-first CSS, and hot module replacement.',
  },
  {
    icon: '☕',
    title: 'Spring Boot',
    description: 'Production-grade backend with layered architecture, validation, and comprehensive error handling.',
  },
  {
    icon: '🐘',
    title: 'PostgreSQL Multi-Schema',
    description: 'Schema-per-service design enabling clean data isolation and smooth microservices migration.',
  },
  {
    icon: '🐳',
    title: 'Docker Ready',
    description: 'Fully containerized with Docker Compose — one command to run the entire stack.',
  },
  {
    icon: '📖',
    title: 'Swagger / OpenAPI',
    description: 'Interactive API documentation auto-generated from your controllers and DTOs.',
  },
  {
    icon: '🧩',
    title: 'Microservices Architecture',
    description: 'Two independent backend services (User & Booking) demonstrating real service separation.',
  },
];

/**
 * Landing page with hero section and feature grid.
 */
export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center pt-12 pb-4 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-full text-sm font-medium text-primary-700 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Production-Ready Template
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Build Faster with
          <br />
          <span className="gradient-text">Full-Stack Template</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A reusable, scalable project template with React, Spring Boot, PostgreSQL,
          and Docker. Start building features from day one.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/users" className="btn-primary text-base px-8 py-4">
            Explore Users API
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <a
            href="http://localhost:8080/swagger-ui.html"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-base px-8 py-4"
          >
            View API Docs
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <div className="text-center mb-12 animate-fade-in-up-delay-1">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Everything You Need
          </h2>
          <p className="mt-3 text-gray-600 text-lg">
            Batteries-included template for professional full-stack development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card animate-fade-in-up-delay-${Math.min(index + 1, 3)}`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Architecture Section */}
      <section className="card bg-gradient-to-br from-primary-950 to-purple-950 border-0 text-white animate-fade-in-up-delay-2">
        <div className="text-center py-8">
          <h2 className="text-3xl font-bold mb-4">Microservices Architecture</h2>
          <p className="text-primary-200 text-lg max-w-xl mx-auto mb-8">
            Two independent Spring Boot services sharing a PostgreSQL database with schema isolation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
              <div className="text-2xl mb-2">👤</div>
              <h4 className="font-semibold">User Service</h4>
              <p className="text-primary-200 text-sm mt-1">Port 8080</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
              <div className="text-2xl mb-2">📅</div>
              <h4 className="font-semibold">Booking Service</h4>
              <p className="text-primary-200 text-sm mt-1">Port 8081</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
              <div className="text-2xl mb-2">🐘</div>
              <h4 className="font-semibold">PostgreSQL</h4>
              <p className="text-primary-200 text-sm mt-1">Multi-Schema</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
