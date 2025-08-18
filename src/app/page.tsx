// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { CardContent } from "@/components/ui/card";

// export default function Home() {
//   return (
//     <main className="w-full overflow-hidden">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-green-600 rounded-full"></div>
//           <span className="font-bold text-xl tracking-tight">AgriSense</span>
//         </div>
//         <div className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
//           <Button variant="ghost">Home</Button>
//           <Button variant="ghost">About Us</Button>
//           <Button variant="ghost">Gallery</Button>
//           <Button variant="ghost">Services</Button>
//         </div>
//         <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
//           Sign In
//         </Button>
//       </nav>
//       {/* Hero Section */}
//       <section className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 lg:pl-16 lg:pr-0 pt-12 lg:pt-20 lg:min-h-[70vh]">
//         {/* Left Text */}
//         <div className="space-y-6 self-start lg:self-center">
//           <p className="text-sm tracking-wide text-gray-500">
//             Sustainable Industry for a{" "}
//             <span className="text-green-600 font-medium">Green Planet</span>
//           </p>
//           <h1 className="text-5xl font-bold leading-tight text-gray-900">
//             Increasing Farm{" "}
//             <span className="bg-[#e3f6b8] px-2 rounded-md">Productivity</span>
//           </h1>
//           <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
//             Addressing this industry's challenges means solving problems across
//             the value chain. It provides solutions for farm advisors and farmers
//             with supply chain support.
//           </p>
//           <div className="flex space-x-4">
//             <Link href="/about" passHref>
//               <Button variant="outline" className="rounded-full px-6">
//                 More About
//               </Button>
//             </Link>
//             <button className="text-gray-700 hover:underline">
//               How it Works
//             </button>
//           </div>
//         </div>

//         {/* Right Image (anchored bottom-right) */}
//         <div className="relative w-full min-h-[320px] sm:min-h-[420px] lg:min-h-[620px] lg:mr-[-16px] lg:mb-[-20px]">
//           <Image
//             src="/hpimg.png"
//             alt="Farm Illustration"
//             fill
//             sizes="(min-width:1024px) 50vw, 90vw"
//             priority
//             className="object-contain object-right-bottom pointer-events-none select-none"
//           />
//         </div>
//       </section>

   

      
//     </main>
//   );
// }

////with perfect img alignment////



// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function Home() {
//   return (
//     <main className="w-full overflow-hidden">
//       {/* Navbar */}
//       {/* <nav className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
//         <div className="flex items-center gap-2">
//           <div className="w-6 h-6 bg-green-600 rounded-full"></div>
//           <span className="font-bold text-xl tracking-tight">AgriSense</span>
//         </div>
//         <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
//           <Button variant="ghost">Home</Button>
//           <Button variant="ghost">About Us</Button>
//           <Button variant="ghost">Gallery</Button>
//           <Button variant="ghost">Services</Button>
//         </div>
//         <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5">
//           Sign In
//         </Button>
//       </nav> */}
//       <nav className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
//       {/* Logo */}
//       <div className="flex items-center gap-2">
//         <div className="w-6 h-6 bg-green-600 rounded-full"></div>
//         <span className="font-bold text-xl tracking-tight">AgriSense</span>
//       </div>

//       {/* Nav links */}
//       <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
//         <Button asChild variant="ghost" className="text-lg">
//           <Link href="/">Home</Link>
//         </Button>
//         <Button asChild variant="ghost" className="text-lg">
//           <Link href="/about">About Us</Link>
//         </Button>
//         <Button asChild variant="ghost" className="text-lg">
//           <Link href="/gallery">Gallery</Link>
//         </Button>
//         <Button asChild variant="ghost" className="text-lg">
//           <Link href="/services">Services</Link>
//         </Button>
//       </div>

//       {/* Sign in */}
//       <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 text-lg">
//         Sign In
//       </Button>
//     </nav>

// {/* Hero Section */}
// <section className="relative min-h-screen flex items-center pl-6 md:pl-12 lg:pl-20 pr-0 overflow-hidden">
//   {/* Left text content - centered vertically */}
//   <div className="max-w-lg lg:max-w-xl z-10 pr-4">
//     <p className="text-sm tracking-wide text-gray-500 mb-4">
//       Sustainable Industry for a <span className="text-green-600 font-medium">Green Planet</span>
//     </p>
//     <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
//   Increasing Farm <span className="bg-green-100 px-2 rounded">Productivity</span>
// </h1>

//     {/* <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
//       Addressing this industry's challenges means solving problems across the value chain.
//       It provides solutions for farm advisors and farmers with supply chain support.
//     </p> */}
//     <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
//   Addressing this industry's challenges means solving problems across the value chain.
//   It provides solutions for farm advisors and farmers with supply chain support.
// </p>


//     <div className="flex items-center space-x-6">
//       <Link href="/about" passHref>
//       <Button variant="outline" className="rounded-full px-6 text-lg">
//         More About
//       </Button>
//     </Link>
//       <button className="text-gray-700 hover:text-green-600 font-medium transition-colors">
//         How it Works →
//       </button>
//     </div>
//   </div>

//   {/* Right image - positioned absolutely to fill right side */}
//   <div className="absolute top-0 right-0 w-[60%] lg:w-[65%] h-full flex items-center justify-end">
//     <div className="relative w-full h-[90%] min-h-[600px] mr-0">
//       <Image
//         src="/hpimg.png"
//         alt="Farm Illustration"
//         fill
//         className="object-contain object-right"
//         priority
//         sizes="(min-width: 1024px) 65vw, 60vw"
//       />
//     </div>
//   </div>

//   {/* Optional: Subtle background gradient */}
//   <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-yellow-50/20 pointer-events-none"></div>
// </section>
//     </main>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-600 rounded-full"></div>
          <span className="font-bold text-xl tracking-tight">AgriSense</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
          <Button asChild variant="ghost" className="text-lg">
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="ghost" className="text-lg">
            <Link href="/about">About Us</Link>
          </Button>
          <Button asChild variant="ghost" className="text-lg">
            <Link href="/gallery">Gallery</Link>
          </Button>
          <Button asChild variant="ghost" className="text-lg">
            <Link href="/services">Services</Link>
          </Button>
        </div>

        {/* Sign in */}
        <Button className="bg-green-600 hover:bg-green-700 text-white rounded-full px-5 text-lg">
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pl-6 md:pl-12 lg:pl-20 pr-0 overflow-hidden">
        
        {/* Decorative Green Line */}
        <div className="absolute left-0 top-1/4 w-80 h-12 z-0">
          <svg
            width="320"
            height="48"
            viewBox="0 0 320 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            <path
              d="M0 24C80 8, 160 8, 240 24C280 32, 300 40, 320 24"
              stroke="#22c55e"
              strokeWidth="8"
              // strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Left text content - centered vertically */}
        <div className="max-w-lg lg:max-w-xl z-10 pr-4">
          <p className="text-sm tracking-wide text-gray-500 mb-4">
            Sustainable Industry for a <span className="text-green-600 font-medium">Green Planet</span>
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Increasing Farm <span className="bg-green-100 px-2 rounded">Productivity</span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed mb-8 max-w-md">
            Addressing this industry's challenges means solving problems across the value chain.
            It provides solutions for farm advisors and farmers with supply chain support.
          </p>

          <div className="flex items-center space-x-6">
            <Link href="/about" passHref>
              <Button variant="outline" className="rounded-full px-6 text-lg">
                More About
              </Button>
            </Link>
            <button className="text-gray-700 hover:text-green-600 font-medium transition-colors">
              How it Works →
            </button>
          </div>
        </div>

        {/* Right image - positioned absolutely to fill right side */}
        <div className="absolute top-0 right-0 w-[60%] lg:w-[65%] h-full flex items-center justify-end">
          <div className="relative w-full h-[90%] min-h-[600px] mr-0">
            <Image
              src="/hpimg.png"
              alt="Farm Illustration"
              fill
              className="object-contain object-right"
              priority
              sizes="(min-width: 1024px) 65vw, 60vw"
            />
          </div>
        </div>

        {/* Optional: Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 via-transparent to-yellow-50/20 pointer-events-none"></div>
      </section>
    </main>
  );
}
