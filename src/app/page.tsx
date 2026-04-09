import VideoHero from "@/components/VideoHero";
import IdentitySection from "@/components/IdentitySection";
import ServiceCards from "@/components/ServiceCards";
import GalleryGrid from "@/components/GalleryGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <VideoHero />
      <IdentitySection />
      <ServiceCards />
      <GalleryGrid />
      <Footer />
    </div>
  );
}
