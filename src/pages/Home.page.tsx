import React from "react";

type FeatureCardProps = {
  title: string;
  imageUrl: string;
};

function FeatureCard({ title, imageUrl }: FeatureCardProps) {
  return (
    <div className="bg-zinc-900 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300">
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
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      {/* Hero */}
      <header className="bg-gradient-to-br from-blue-700 to-blue-900 py-20 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to DomiRun</h1>
        <p className="text-lg max-w-2xl mx-auto text-zinc-200">
          A powerful platform for managing motorcycle deliveries. Connect restaurants, customers,
          riders, and logistics operators through a modern and responsive interface.
        </p>
      </header>

      {/* Features */}
      <section className="py-16 px-6 sm:px-10 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          <FeatureCard
            title="Restaurants"
            imageUrl="https://source.unsplash.com/400x300/?restaurant,food"
          />
          <FeatureCard
            title="Customers"
            imageUrl="https://source.unsplash.com/400x300/?customer,delivery"
          />
          <FeatureCard
            title="Riders"
            imageUrl="https://source.unsplash.com/400x300/?motorcycle,rider"
          />
          <FeatureCard
            title="Logistics"
            imageUrl="https://source.unsplash.com/400x300/?logistics,tracking"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-zinc-400 py-8 text-sm">
        &copy; {new Date().getFullYear()} DomiRun. All rights reserved.
      </footer>
    </div>
  );
}
