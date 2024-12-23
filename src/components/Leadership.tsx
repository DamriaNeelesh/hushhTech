import img from '../../files/img.png';
import img2 from '../../files/img (1).png';

export default function Leadership() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* About Us Section */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl font-semibold mb-2">
          Empowering Wealth Creation with Integrity and Innovation
        </p>
        <p className="text-base md:text-lg mb-6">
          We blend quantitative expertise with ethical investment practices to deliver personalized financial solutions.
        </p>
      </div>
     
      {/* Our Mission Section */}
      <section className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold mb-2">Our Mission</h2>
        <h3 className="text-lg md:text-2xl font-semibold mb-4">Innovative Strategies, Proven Results</h3>
        <ul className="list-disc list-inside text-left items-center mx-[29%]  space-y-2">
          <li>Cutting-edge AI-powered insights for smarter investments.</li>
          <li>Proprietary options-based strategies generating consistent income.</li>
          <li>Focused investments in cash-generating giants like Apple & Microsoft.</li>
          <li>Generating "rental income" through advanced options models.</li>
        </ul>
      </section>

      {/* Unique Approach Section */}
      <section className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Unique Approach to Investment Management</h2>
        <p className="text-base md:text-lg mb-4">
          At <span className="font-semibold">Hushh Technologies</span>, we combine the art of investment with the science of technology:
        </p>
        <ul className="list-disc list-inside text-left mx-auto max-w-3xl space-y-2">
          <li>
            <strong>Differentiation in Investment Approach:</strong> Unlike traditional funds that rely on speculative returns, Hushh combines high-frequency options income with disciplined, data-driven long-term growth. We prioritize stability, focusing on high-FCF SPX10 companies that represent the backbone of global markets.
          </li>
          <li>
            <strong>Math-Driven Decision Making:</strong> Every strategy is informed by rigorous quantitative analysis, ensuring precision and accuracy.
          </li>
          <li>
            <strong>AI-Powered Insights:</strong> Leveraging the latest advancements in machine learning, we identify market inefficiencies and capitalize on opportunities in real-time.
          </li>
          <li>
            <strong>Long-Term Stability:</strong> Our investments focus on high-quality, cash-generating businesses, ensuring a balance between growth and reliability.
          </li>
          <li>
            <strong>Transparency You Can Trust:</strong> Clear communication and a human-centric approach to wealth creation.
          </li>
        </ul>
      </section>

      {/* Our Leadership Team Section */}
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold mb-6">Our Leadership Team</h2>
        <p className="text-md md:text-xl font-semibold mb-6">
          At Hushh Technologies LLC, our leadership team combines expertise in technology, finance, and strategy to redefine wealth creation. Together, they bring innovation, precision, and integrity to every investment decision.
        </p>

        {/* Manish Sainani */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="w-32 h-32 md:w-48 md:h-48 mb-4 bg-gray-200 rounded-full overflow-hidden">
            <img src={img} alt="Manish Sainani" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg md:text-2xl font-bold mb-1">Manish <span className="text-red-600">Sainani</span></h3>
          <p className="text-gray-600 mb-2">Founder & CEO</p>
          <p className="text-sm md:text-md text-gray-700">
            With over a decade of leadership at Google, Microsoft, and Splunk, Manish brings unmatched expertise in AI, machine learning, and data-driven innovation. His vision drives Hushh’s mission to empower investors with sustainable, technology-powered wealth strategies.
          </p>
        </div>

        {/* Justin Donaldson */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="w-32 h-32 md:w-48 md:h-48 mb-4 bg-gray-200 rounded-full overflow-hidden">
            <img src={img2} alt="Justin Donaldson" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-lg md:text-2xl font-bold mb-1">Justin <span className="text-red-600">Donaldson</span></h3>
          <p className="text-gray-600 mb-2">Chief Scientist & Investment Strategist</p>
          <p className="text-sm md:text-md text-gray-700">
            Justin leads Hushh’s scientific and strategic investment approaches. As the architect behind proprietary options strategies like "Sell the Wall," he uses advanced quantitative models to deliver consistent, risk-optimized returns.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <section className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold mb-4">Join <span className="text-red-600">Us</span></h2>
        <p className="text-base md:text-lg mb-4">
          Whether you're an individual or an institution, Hushh Technologies LLC invites you to join us on our journey.
        </p>
      </section>
    </div>
  );
}
