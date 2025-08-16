// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
//               src/app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-sm rounded-b-2xl">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-full"></div>
          <span className="font-bold text-lg">AgriSense</span>
        </div>
        <div className="flex gap-6">
          <Button variant="ghost">Home</Button>
          <Button variant="secondary">About Us</Button>
          <Button variant="ghost">Gallery</Button>
          <Button variant="ghost">Services</Button>
        </div>
        <Button className="bg-blue-500 text-white rounded-full px-5">
          SignIn
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">What Is Our Success?</h1>
        <p className="text-gray-600">Learn More →</p>
      </section>

      <section className="px-8 grid md:grid-cols-2 gap-8">
        {/* Left Block */}
        <Card className="relative overflow-hidden rounded-2xl p-6">
          <h2 className="text-2xl font-semibold">
            New Opportunities <br /> For{" "}
            <span className="bg-yellow-200 px-2 rounded">Agricultural</span>{" "}
            Production
          </h2>

          <div className="relative mt-4">
            <Image
              src="/carrots.jpg"
              alt="Carrots"
              width={500}
              height={500}
              className="rounded-xl"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge className="bg-white shadow">🥗 Fresh food</Badge>
              <Badge className="bg-white shadow">2023 / New harvest</Badge>
            </div>
          </div>

          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow px-4 py-2">
            <h3 className="text-xl font-bold">
              120 <span className="text-gray-500 text-sm">tons</span>
            </h3>
            <p className="text-sm text-gray-600">
              of green crops per month thanks to the vertical farms
            </p>
          </div>
        </Card>

        {/* Right Block */}
        <Card className="bg-yellow-100 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            Innovations In <br /> Vertical Farming!
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 rounded-xl bg-blue-100">
              <Image
                src="/apples.jpg"
                alt="Apples"
                width={200}
                height={200}
                className="rounded-md"
              />
              <p className="font-medium mt-2">Less Water And Pesticides</p>
              <Button variant="link">Explore</Button>
              <p className="text-sm text-gray-600">
                More Yield All Year Around
              </p>
            </Card>

            <Card className="p-4 rounded-xl bg-green-800 text-white">
              <Image
                src="/asparagus.jpg"
                alt="Asparagus"
                width={200}
                height={200}
                className="rounded-md"
              />
              <p className="font-medium mt-2">Minimum Space Usage</p>
              <Button variant="link" className="text-white">
                More
              </Button>
              <p className="text-sm">Maximum Harvest In 2023</p>
            </Card>
          </div>
        </Card>
      </section>
    </main>
  );
}
