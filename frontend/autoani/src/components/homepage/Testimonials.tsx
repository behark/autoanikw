import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  vehicle: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'AutoAni made the car buying process incredibly smooth. Their team took the time to understand my needs and found the perfect vehicle for my lifestyle. I couldn\'t be happier with my Mercedes!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    vehicle: 'Mercedes-Benz E-Class'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Tech Executive',
    content: 'The attention to detail at AutoAni is unmatched. From the thorough inspection to the seamless financing options, they made purchasing my BMW an enjoyable experience. Highly recommend!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    vehicle: 'BMW 5 Series'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Marketing Director',
    content: 'I was hesitant about buying a pre-owned luxury car, but AutoAni changed my perspective. Their vehicles are meticulously maintained and their warranty program gave me complete peace of mind.',
    rating: 4,
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?q=80&w=200&auto=format&fit=crop',
    vehicle: 'Audi A6'
  }
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative">
      <div className="absolute top-6 right-6 text-primary-200">
        <FaQuoteLeft className="w-12 h-12 opacity-20" />
      </div>
      
      <div className="flex items-center mb-4 space-x-4">
        <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-primary-100">
          <img 
            src={testimonial.image} 
            alt={testimonial.name}
            className="w-full h-full object-cover" 
          />
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg">{testimonial.name}</h4>
          <p className="text-neutral-500 text-sm">{testimonial.role}</p>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <FaStar 
                key={i} 
                className={`w-4 h-4 ${i < testimonial.rating ? 'text-premium-DEFAULT' : 'text-neutral-300'}`} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mb-3 font-light leading-relaxed text-neutral-700">
        "{testimonial.content}"
      </div>
      
      <div className="text-sm font-medium text-primary-600">
        Vehicle: {testimonial.vehicle}
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-bg-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 text-primary-800">
            Customer Experiences
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear what our valued clients have to say about their journey with AutoAni - where premium service meets exceptional vehicles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="animate-fadeIn" style={{ animationDelay: `${parseInt(testimonial.id) * 200}ms` }}>
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/testimonials" className="inline-flex items-center bg-transparent border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-md transition-colors text-sm font-medium">
            Read More Stories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
