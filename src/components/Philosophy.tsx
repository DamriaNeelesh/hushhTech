import lineGraph from '../../files/lineGraph.svg';

export default function Philosophy() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Heading Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Investment meets Innovation</h1>
        <p className="text-base md:text-lg mb-8">
          We're building a movement toward a future where wealth is built through <span className="text-red-600">intelligent, responsible investing</span>,
          powered by <span className="font-medium">cutting-edge mathematical models, statistical analysis, and artificial intelligence (AI)</span>.
        </p>

        <div className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-8 flex items-center justify-center bg-white rounded-lg overflow-hidden">
          <img src={lineGraph} alt="SVG Image" className="w-full h-full object-contain" />
        </div>

        <p className="text-base md:text-lg mb-16">
          Our approach is built on <span className="font-medium">rigorous research, strategic precision</span>, and an
          <span className="font-medium"> unwavering focus</span> on delivering consistent, sustainable growth for our investors.
        </p>
      </div>

      {/* Mission Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our <span className="text-red-600">Mission</span></h2>
        <p className="text-base md:text-lg mb-4">
          To empower individuals and institutions to achieve long-term financial success
          through <span className="font-medium">data-driven, intelligent investment strategies</span>.
        </p>
        <p className="text-sm text-gray-600">
          We believe that investment should be both powerful and personal—designed to work for people, not just portfolios.
          We're committed to transparency and ethical data use, ensuring that wealth creation is both impactful and aligned with
          our investors' values.
        </p>
      </section>

      {/* What We Do Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">What We Do</h2>
        <p className="text-base md:text-lg mb-4">
          We specialize in generating income through innovative options-based strategies, capitalizing on market opportunities.
        </p>
        <p className="text-sm text-gray-600">
          Our proprietary strategies, such as <span className="text-red-600">Sell the Wall</span> and <span className="text-red-600">Strategy 69</span>, are meticulously designed to generate
          consistent "alpha income" by leveraging price movement and volatility.
        </p>
      </section>

      {/* Investment Philosophy Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Our <span className="text-red-600">Investment Philosophy</span></h2>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-4">
              <span className="text-4xl">∫𝑥</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Math-Driven Precision</h3>
            <p className="text-sm">
              We apply advanced mathematical models to guide our investment decisions, ensuring consistency and removing bias.
            </p>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-4xl">🧠</span>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Insight</h3>
            <p className="text-sm">
              Leveraging AI and machine learning, we identify market inefficiencies and predict opportunities in real-time.
            </p>
          </div>
          <div>
            <div className="mb-4">
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Long-Term Stability</h3>
            <p className="text-sm">
              We focus on consistent returns through balanced strategies and prudent risk management.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="text-center mb-16 space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Why Choose Hu<span className="text-red-600">$$</span>h?</h2>
        <div>
          <h3 className="text-xl font-bold mb-2">Simplicity Meets Sophistication</h3>
          <p className="text-sm">
            Our models are complex, but our approach is straightforward—designed to perform in any market.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Unlocking Options Income</h3>
          <p className="text-sm">
            Our strategies capture premium income from market movements, creating a consistent revenue stream.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Human-Centric Wealth Creation</h3>
          <p className="text-sm">
            We respect the privacy, goals, and interests of our investors, ensuring ethical and impactful wealth creation.
          </p>
        </div>
      </section>

      {/* Vision Section */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our <span className="text-red-600">Vision</span></h2>
        <p className="font-bold mb-4">Our goal is to create lasting wealth that empowers financial freedom for generations.</p>
        <p className="text-sm text-gray-600">
          At Hushh Technologies LLC, we blend innovative strategies with human-centric values to deliver exceptional value.
        </p>
      </section>

      {/* Join Us Section */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Join <span className="text-red-600">Us</span></h2>
        <p className="mb-8">
          Whether you're an individual or an institution, Hushh Technologies LLC invites you to join us on our journey.
        </p>
        <div className="flex justify-center">
          <a  href="https://www.linkedin.com/in/manishsainani/"  target="_blank"
  rel="noopener noreferrer" className="text-red-600 hover:text-red-700 flex items-center">
          </a>
        </div>
      </section>
    </div>
  );
}
