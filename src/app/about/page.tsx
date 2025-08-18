// app/about/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white text-gray-900">
      {/* Navbar */}
      {/* <nav className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded-full"></div>
          <span className="font-bold text-xl tracking-tight">AgriSense</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">About Us</Button>
          <Button variant="ghost">Gallery</Button>
          <Button variant="ghost">Services</Button>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
          Sign In
        </Button>
      </nav> */}

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-20 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight">
            Smarter Farming, <span className="text-green-600">Simplified</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            AgriSense AI is your farm’s best friend — accurate, real-time advice
            delivered directly on WhatsApp.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-3 text-lg">
            Get Started
          </Button>
        </div>
        {/* Decorative gradient blob */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* challenge SECTION*/}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
    
    {/* Left Content */}
    <div>
      <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
        100 million Indian farmers
      </h2>
      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
        Every season, they face questions that decide the fate of their harvest:
      </p>

      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-600 rounded-full p-2">
            🌧️
          </div>
          <p className="text-lg text-gray-800">
            “Will it rain tomorrow, or should I irrigate today?”
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-600 rounded-full p-2">
            🌱
          </div>
          <p className="text-lg text-gray-800">
            “Will these seeds survive the sudden temperature drop?”
          </p>
        </div>

        <div className="flex items-start gap-4">
          <div className="bg-green-100 text-green-600 rounded-full p-2">
            📈
          </div>
          <p className="text-lg text-gray-800">
            “Will my crop sell for a better price next week?”
          </p>
        </div>
      </div>
    </div>

    {/* Right Image */}
    <div className="relative">
      <img
        src="/farmers.jpg"
        alt="Farmers working"
        className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
      />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  </div>
</section>

{/* Solution Section */}

<section className="bg-gradient-to-br from-white to-gray-50 py-20 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
    
    {/* Left: WhatsApp Chat Mock */}
{/* WhatsApp Chat Mock */}
<div
  className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative h-[380px] flex flex-col justify-center space-y-3 overflow-y-auto"
  style={{
    backgroundImage: "url('/wpBg.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "repeat",
    backgroundPosition: "center",
  }}
>
  {/* Farmer Message */}
  <div className="self-start bg-gray-100 text-gray-900 rounded-2xl px-4 py-3 shadow-sm max-w-[75%]">
    <p className="text-base leading-relaxed">
      Aaj shaam ko barish hogi kya?
    </p>
    <span className="block text-xs text-gray-500 mt-1">10:32 AM</span>
  </div>

  {/* AI Response */}
  <div className="self-end bg-green-100 text-gray-900 rounded-2xl px-4 py-3 shadow-md max-w-[75%]">
    <p className="text-base leading-relaxed italic">
      “Aaj shaam ko 80% barish ka chance hai. Paani mat do. Parso do.”
    </p>
    <span className="block text-xs text-gray-500 mt-1 text-right">10:33 AM</span>
  </div>
</div>



    {/* Right: Text */}
    <div>
      <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
        Our Solution
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        Farmers simply send a message on WhatsApp in their own dialect —
        and get <span className="font-semibold text-green-600">hyperlocal, accurate, verified answers </span> 
        within seconds.
      </p>

      <p className="text-gray-600 text-base leading-relaxed">
        Powered by <span className="font-medium">satellite data</span>, 
        <span className="font-medium"> GIS models</span>, and 
        <span className="font-medium"> AI reasoning</span> — all in a simple chat.
      </p>
    </div>
  </div>
</section>



      {/* Innovation Highlights
      <section className="px-6 md:px-20 py-16 bg-green-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Innovation Highlights</h2>
          <p className="text-gray-700">
            A unique mix of AI, GIS, and real-time communication
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            "🗣 Voice-first: Whisper + Bhasini",
            "🌾 Crop Detection: CLIP/BLIP-2",
            "🛰 GIS + Satellite Data",
            "🤖 Smart Reasoning: LLM + RAG",
            "📱 WhatsApp-native Experience",
            "⚡ Triple Verification System",
          ].map((item, idx) => (
            <Card
              key={idx}
              className="p-6 hover:shadow-md transition rounded-xl text-gray-700 font-medium"
            >
              {item}
            </Card>
          ))}
        </div>
      </section> */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20 px-6">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
      Innovation Highlights
    </h2>
    <p className="text-lg text-gray-600 mb-12">
      A unique mix of <span className="font-semibold">AI</span>, 
      <span className="font-semibold"> GIS</span>, and 
      <span className="font-semibold"> real-time communication</span>
    </p>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        { icon: "🗣️", text: "Voice-first: Whisper + Bhasini" },
        { icon: "🌾", text: "Crop Detection: CLIP/BLIP-2" },
        { icon: "🛰️", text: "GIS + Satellite Data" },
        { icon: "🤖", text: "Smart Reasoning: LLM + RAG" },
        { icon: "📱", text: "WhatsApp-native Experience" },
        { icon: "⚡", text: "Triple Verification System" },
      ].map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                     hover:shadow-lg hover:scale-105 transition-transform duration-300"
        >
          <span className="text-2xl">{item.icon}</span>
          <p className="text-gray-800 font-medium">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Impact Section */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Impact at Scale</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { value: "≥ 85%", label: "Verified Accuracy" },
            { value: "50,000+", label: "Farmers in Year 1" },
            { value: "15+", label: "Languages Supported" },
            { value: "≤ 5s", label: "Avg. Response Time" },
          ].map((stat, idx) => (
            <Card
              key={idx}
              className="p-6 rounded-xl text-center hover:shadow-md transition"
            >
              <h3 className="text-3xl font-bold text-green-700">
                {stat.value}
              </h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-20 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: "Dhruv Dawar"},
            { name: "Vidhi Arora"},
            { name: "Pari Gupta"},
          ].map((member, idx) => (
            <Card
              key={idx}
              className="p-6 rounded-xl text-center hover:shadow-md transition"
            >
              <div className="w-20 h-20 bg-green-100 mx-auto rounded-full mb-4" />
              <p className="font-semibold">{member.name}</p>
              {/* <p className="text-gray-600 text-sm">{member.role}</p> */}
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-20 text-center bg-gradient-to-r from-green-600 to-green-700 text-white">
        <h2 className="text-3xl font-bold mb-6">Join the AgriSense Movement</h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-green-100">
          Be part of the agricultural revolution. Whether you’re a farmer,
          partner, or supporter — together we can make farming smarter.
        </p>
        <Button className="bg-white text-green-700 hover:bg-green-100 rounded-full px-8 py-3 text-lg">
          Get Involved
        </Button>
      </section>
    </main>
  );
}
