import Company from "@/components/sections/Company";
import Hero from "@/components/sections/Hero";
import Story from "@/components/sections/Story";
import Testimonials from "@/components/sections/Testimonials";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Story />
      <Company />
      <Testimonials />
      {/* <HorizontalScroll /> */}
      {/* <Vision /> */}
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
