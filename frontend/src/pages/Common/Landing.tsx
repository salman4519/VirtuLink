// src/HomePage.tsx
import React, { useEffect, useState } from 'react';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shapes = document.querySelectorAll(".floating-shape");

      shapes.forEach((shape, index) => {
        const speed = 0.05 + index * 0.02;
        const element = shape as HTMLElement;
        element.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Sample data for events
  const events = [
    {
      id: 1,
      title: "Future of AI in Events",
      date: "June 20, 2025",
      time: "2:00 PM EST",
      type: "Panel Discussion",
      speakers: ["Dr. Sarah Chen", "Mark Johnson", "Priya Patel"],
      image: "ai-event.jpg"
    },
    {
      id: 2,
      title: "Virtual Networking Masterclass",
      date: "June 25, 2025",
      time: "11:00 AM EST",
      type: "Workshop",
      speakers: ["Alex Morgan", "Jamie Smith"],
      image: "networking-event.jpg"
    },
    {
      id: 3,
      title: "Tech Startup Showcase",
      date: "July 5, 2025",
      time: "3:30 PM EST",
      type: "Exhibition",
      speakers: ["Various Founders"],
      image: "startup-event.jpg"
    }
  ];

  // Sample features
  const features = [
    {
      icon: "🌐",
      title: "Global Reach",
      description: "Connect with attendees from around the world without leaving your home"
    },
    {
      icon: "💬",
      title: "Real-time Chat",
      description: "Engage in meaningful conversations with built-in chat and video rooms"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Get detailed insights into attendee engagement and event performance"
    },
    {
      icon: "🛠️",
      title: "Powerful Tools",
      description: "Everything you need to host successful events in one platform"
    }
  ];

  // Sample testimonials
  const testimonials = [
    {
      name: "Michael Rodriguez",
      role: "Event Organizer",
      quote: "VirtuLink transformed our annual conference. Engagement was higher than our in-person events!",
      avatar: "avatar1.jpg"
    },
    {
      name: "Sophia Kim",
      role: "Marketing Director",
      quote: "The networking features are incredible. We made more valuable connections than we ever expected.",
      avatar: "avatar2.jpg"
    },
    {
      name: "David Wilson",
      role: "Tech Speaker",
      quote: "Presenting on VirtuLink feels just like being on stage. The audience interaction tools are top-notch.",
      avatar: "avatar3.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20 blur-3xl top-[20%] left-[10%]"></div>
        <div className="absolute w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl top-[60%] right-[15%]"></div>
        <div className="absolute w-64 h-64 rounded-full bg-pink-500 opacity-20 blur-3xl bottom-[10%] left-[30%]"></div>

        <div
          className="absolute floating-shape w-[300px] h-[300px] top-[5%] right-[10%] bg-gradient-to-br from-purple-600 to-blue-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-10"
          style={{ animationDelay: '-2s' }}
        ></div>
        <div
          className="absolute floating-shape w-[400px] h-[400px] bottom-[10%] left-[5%] bg-gradient-to-br from-pink-600 to-purple-500 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-10"
          style={{ animationDelay: '-5s' }}
        ></div>
        <div
          className="absolute floating-shape w-[250px] h-[250px] top-[40%] left-[20%] bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[30%_70%_50%_50%/50%_50%_70%_30%] opacity-10"
          style={{ animationDelay: '-8s' }}
        ></div>

        <div className="absolute inset-0 bg-[#121212] bg-opacity-90 -z-10"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#121212]/80 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            <span className="text-xl font-bold bg-white bg-clip-text text-transparent">VirtuLink</span>
          </div>

          

          <div className="flex items-center space-x-4">
            <a
              href="/login"
              className="hidden md:block px-5 py-2 border border-primary text-white rounded-full font-medium hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              Login / Register
            </a>
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-primary">VirtuLink</span> — <br />
            Your Gateway to Limitless Virtual Events
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-4xl mx-auto">
            Join. Network. Engage. Anywhere. Anytime.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="/login"
              className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all"
            >
              Explore Events
            </a>
            <a
              href="/login"
              className="px-8 py-3 border border-primary text-white rounded-full font-medium hover:bg-primary/10 transition-all"
            >
              Host an Event
            </a>
          </div>

          <div className="relative h-64 md:h-96 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl overflow-hidden border border-[#2a2a2a]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-2xl md:text-4xl font-bold text-white mb-4">
                  "Future of AI in Events" – Live Panel
                </div>
                <div className="text-lg md:text-xl text-gray-300 mb-6">
                  June 20, 2025 | 2:00 PM EST
                </div>
                <a
                  href="/login"
                  className="inline-block px-6 py-2 bg-white text-[#121212] rounded-full font-medium hover:bg-gray-200 transition-all"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Why Choose VirtuLink</h2>
          <p className="text-lg text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Our platform is designed to make virtual events feel natural, engaging, and productive
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a] hover:border-primary/50 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="mb-24">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Upcoming Events</h2>
            <a href="#" className="text-primary hover:underline">View all events</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="bg-[#1e1e1e] rounded-xl overflow-hidden border border-[#2a2a2a] hover:border-primary/50 transition-all">
                <div className="h-48 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                    <span className="text-xs bg-white/20 text-white   px-2 py-1 rounded-full">{event.type}</span>
                  </div>
                  <div className="text-gray-400 mb-4">
                    <div className="flex items-center mb-1">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      {event.date} • {event.time}
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                      </svg>
                      Speakers: {event.speakers.join(", ")}
                    </div>
                  </div>
                  <a
                    href="/login"
                    className="inline-block w-full text-center px-4 py-2 border  text-white  rounded-full font-medium hover:bg-primary/10 transition-all border-white"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mr-4"></div>
                  <div>
                    <h4 className="text-white font-medium">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 md:p-12 border border-[#2a2a2a]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Events?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're looking to attend or host, VirtuLink has everything you need for successful virtual experiences.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">

              <a
                href="/login"
                className="px-8 py-3 border border-white text-white rounded-full font-medium hover:bg-white/10 transition-all"
              >
                Get Started for Free
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#121212] border-t border-[#2a2a2a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-pacifico text-white mb-4">VirtuLink</h3>
              <p className="text-gray-400">Your gateway to limitless virtual events.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#2a2a2a] text-center text-gray-400">
            <p>© 2025 VirtuLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;