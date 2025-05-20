import React from 'react';
import { useNavigate } from 'react-router-dom';

type FeatureCardProps = {
  title: string;
  imageUrl: string;
  redirectTo?: string;
};

function FeatureCard({ title, imageUrl, redirectTo }: FeatureCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (redirectTo) {
      navigate(redirectTo);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="flex-1">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover sm:h-60 md:h-64 lg:h-69"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col text-white">
      <header className="py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Domirun welcomes you</h1>
        <p className="text-lg max-w-2xl mx-auto text-zinc-200">
          A powerful platform for managing motorcycle deliveries. Connect restaurants, customers,
          riders, and logistics operators through a modern interface.
        </p>
      </header>

      <section className="py-16 px-6 sm:px-10 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <FeatureCard title="Restaurants" imageUrl="/restaurant.png" redirectTo="/restaurants/list" />
          <FeatureCard title="Customers" imageUrl="/clients.png" redirectTo="/customers/list" />
          <FeatureCard title="Riders" imageUrl="/drivers.png" redirectTo="/drivers/list" />
          <FeatureCard title="Logistics" imageUrl="/logistic.png" redirectTo="/statistics" />
        </div>
      </section>
    </div>
  );
}
