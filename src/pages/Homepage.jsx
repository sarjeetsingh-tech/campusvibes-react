import React from 'react';

export default function Homepage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white text-center py-8">
        <h1 className="text-4xl font-bold">Welcome to CampusVibes</h1>
        <p className="mt-2">Your ultimate destination for campus events!</p>
      </header>
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <li className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Spring Fest 2025</h3>
            <p className="text-gray-600">Date: April 25-27, 2025</p>
            <p className="text-gray-600">Location: Campus Grounds</p>
            <p className="mt-4">Spring Fest is back with a bang! Join us for three days of music, food, games, and fun.</p>
          </li>
        </ul>
      </section>
      <section className="container mx-auto py-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-gray-800">
          CampusVibes is your one-stop platform for discovering and participating in various events happening on your campus. Stay updated with the latest events, workshops, seminars, and more!
        </p>
      </section>
      <footer className="bg-blue-500 text-white text-center py-4">
        <p>&copy; 2024 CampusVibes. All rights reserved.</p>
      </footer>
    </div>
  );
}
