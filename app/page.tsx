import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { FeatureTile } from "@/components/home/FeatureTile";
import { WeeklyPicks } from "@/components/home/WeeklyPicks";
import { IconFeatures } from "@/components/home/IconFeatures";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { Testimonials } from "@/components/home/Testimonials";

export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeatureTile />
      <WeeklyPicks />
      <IconFeatures />
      <AboutTeaser />
      <Testimonials />
    </>
  );
}
