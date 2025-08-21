'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Phone, MapPin, Mail } from 'lucide-react';

export default function DesignPreview() {
  const [selectedDesign, setSelectedDesign] = useState(1);

  const designs = [
    {
      id: 1,
      name: "Minimal Black & White",
      description: "Ultra-clean with red accents only",
      bgColor: "bg-white",
      textColor: "text-black",
      accentColor: "text-red-600",
      buttonStyle: "bg-black text-white hover:bg-gray-900",
      cardStyle: "bg-white border border-gray-200"
    },
    {
      id: 2,
      name: "Dark Athletic",
      description: "Professional dark theme with gold accents",
      bgColor: "bg-gray-950",
      textColor: "text-white",
      accentColor: "text-yellow-500",
      buttonStyle: "bg-yellow-500 text-black hover:bg-yellow-400",
      cardStyle: "bg-gray-900 border border-gray-800"
    },
    {
      id: 3,
      name: "Clean Gray",
      description: "Sophisticated gray with red highlights",
      bgColor: "bg-gray-50",
      textColor: "text-gray-900",
      accentColor: "text-red-600",
      buttonStyle: "bg-red-600 text-white hover:bg-red-700",
      cardStyle: "bg-white shadow-lg"
    }
  ];

  const currentDesign = designs[selectedDesign - 1];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Design Selector */}
      <div className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Choose Your Design</h1>
            <div className="flex gap-2">
              {designs.map((design) => (
                <button
                  key={design.id}
                  onClick={() => setSelectedDesign(design.id)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    selectedDesign === design.id
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {design.name}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">{currentDesign.description}</p>
        </div>
      </div>

      {/* Preview Area */}
      <div className={`min-h-screen ${currentDesign.bgColor} transition-colors duration-500`}>
        {/* Hero Section Preview */}
        <section className="relative min-h-[600px] flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div>
                <h1 className={`text-5xl lg:text-6xl font-black mb-4 ${currentDesign.textColor}`}>
                  TRUST YOUR
                  <span className={`block ${currentDesign.accentColor}`}>
                    PROCESS
                  </span>
                </h1>
                <p className={`text-xl mb-8 ${currentDesign.textColor} opacity-80`}>
                  At GFM Training Academy our mission is to help players of all ages reach their potential!
                </p>
                <p className={`text-lg mb-8 ${currentDesign.textColor} opacity-70`}>
                  Coach Larry Grayson is one of the top hitting instructors in Central Florida and South Atlanta, Georgia.
                </p>
                <div className="flex gap-4">
                  <button className={`px-8 py-4 rounded-lg font-bold transition-all ${currentDesign.buttonStyle}`}>
                    Start Training
                  </button>
                  <button className={`px-8 py-4 rounded-lg font-bold border-2 ${
                    currentDesign.bgColor === 'bg-gray-950' 
                      ? 'border-white text-white hover:bg-white hover:text-black' 
                      : 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                  } transition-all`}>
                    View Programs
                  </button>
                </div>
              </div>

              {/* Logo */}
              <div className="flex justify-center">
                <div className={`relative p-8 rounded-full ${
                  currentDesign.bgColor === 'bg-gray-950' ? 'bg-white/5' : 'bg-gray-50'
                }`}>
                  <Image
                    src="/gfm_logo.webp"
                    alt="GFM Training Academy"
                    width={400}
                    height={400}
                    className="drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className={`text-4xl font-black text-center mb-4 ${currentDesign.textColor}`}>
              PROFESSIONAL TRAINING
            </h2>
            <p className={`text-center mb-12 ${currentDesign.textColor} opacity-70`}>
              Individual and team training for baseball and softball players of all ages
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {['Hitting Excellence', 'Fielding Mastery', 'Speed & Agility'].map((service, idx) => (
                <div key={idx} className={`p-8 rounded-xl ${currentDesign.cardStyle} transition-all hover:scale-105`}>
                  <h3 className={`text-xl font-bold mb-4 ${currentDesign.textColor}`}>
                    {service}
                  </h3>
                  <p className={`mb-6 ${currentDesign.textColor} opacity-70`}>
                    Help every player reach their full potential with personalized training programs.
                  </p>
                  <div className={`text-3xl font-black ${currentDesign.accentColor}`}>
                    $85
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className={`max-w-4xl mx-auto p-12 rounded-2xl ${currentDesign.cardStyle}`}>
              <h2 className={`text-3xl font-black text-center mb-8 ${currentDesign.textColor}`}>
                START YOUR JOURNEY
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <Phone className={`w-8 h-8 mx-auto mb-3 ${currentDesign.accentColor}`} />
                  <p className={`font-bold ${currentDesign.textColor}`}>407-519-0984</p>
                </div>
                <div>
                  <Mail className={`w-8 h-8 mx-auto mb-3 ${currentDesign.accentColor}`} />
                  <p className={`font-bold ${currentDesign.textColor}`}>Larrygrayson@gfmtf.com</p>
                </div>
                <div>
                  <MapPin className={`w-8 h-8 mx-auto mb-3 ${currentDesign.accentColor}`} />
                  <p className={`font-bold ${currentDesign.textColor}`}>Central FL & South Atlanta</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <button className={`px-12 py-4 rounded-lg font-bold text-lg ${currentDesign.buttonStyle}`}>
                  Book Your Session
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}