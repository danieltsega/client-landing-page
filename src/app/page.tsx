import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Vision from "@/components/sections/Vision";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Story />
      <Vision />
      {/* Keep your 5 test sections */}
      {[...Array(5)].map((_, i) => (
        <section
          key={i}
          className="h-screen flex items-center justify-center text-6xl font-bold"
          style={{ background: i % 2 === 0 ? "#111" : "#222" }}
        >
          Section {i + 1}
        </section>
      ))}
    </main>
  );
}
