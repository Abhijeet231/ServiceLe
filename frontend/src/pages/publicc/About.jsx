import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-amber-500 uppercase mb-2">
            About
          </p>

          <h1 className="text-3xl md:text-4xl font-semibold text-stone-800">
            About ServiceLe
          </h1>

          <p className="text-stone-500 mt-3 max-w-2xl">
            A simple platform to discover reliable local services.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-8 space-y-6">
          
          <p className="text-stone-600 leading-relaxed">
            <span className="font-semibold text-stone-800">ServiceLe</span> is a
            simple marketplace that helps people discover and connect with
            trusted local service providers.
          </p>

          <p className="text-stone-600 leading-relaxed">
            Whether you are looking for a cook, electrician, cleaner, or other
            everyday services, ServiceLe makes it easy to browse and find the
            right help in just a few clicks.
          </p>

          <p className="text-stone-600 leading-relaxed">
            The goal of ServiceLe is straightforward — make it easier for people
            to find skilled professionals and give service providers a place to
            showcase their expertise.
          </p>

          <div className="pt-4 border-t border-stone-100">
            <p className="text-sm text-stone-400">
              Built to simplify how local services are discovered.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;