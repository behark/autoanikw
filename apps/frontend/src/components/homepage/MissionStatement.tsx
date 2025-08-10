import React from 'react';
import { FaShieldAlt, FaHandshake, FaRegLightbulb } from 'react-icons/fa';

const MissionStatement: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-bg-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-primary-800">
            Our Mission at AutoAni
          </h2>
          <p className="text-xl font-light text-neutral-700 leading-relaxed mb-8 animate-fadeIn">
            To transform the luxury vehicle ownership experience through transparency, 
            exceptional service, and a commitment to excellence that exceeds expectations.
          </p>
          <div className="w-24 h-1 bg-premium-DEFAULT mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slideUp" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShieldAlt className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-primary-800 mb-4 text-center">Trust & Quality</h3>
            <p className="text-neutral-600 text-center">
              Every vehicle in our collection undergoes rigorous inspection and 
              certification. We stand behind every car we sell with comprehensive 
              warranties and support.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHandshake className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-primary-800 mb-4 text-center">Personal Relationship</h3>
            <p className="text-neutral-600 text-center">
              We build lasting relationships with our clients through personalized service, 
              attention to detail, and a genuine interest in matching you with the 
              perfect vehicle for your lifestyle.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-slideUp" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaRegLightbulb className="text-primary-600 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-primary-800 mb-4 text-center">Innovation</h3>
            <p className="text-neutral-600 text-center">
              We continuously evolve our services and processes to make luxury car 
              ownership more accessible, enjoyable, and sustainable for a new 
              generation of enthusiasts.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/about" 
            className="inline-flex items-center bg-primary-700 text-white hover:bg-primary-800 px-6 py-3 rounded-md transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Learn More About Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
