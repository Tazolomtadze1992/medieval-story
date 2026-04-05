import { GardenArchivePrototype } from "@/components/garden-archive-prototype";
import { sampleChapters } from "@/content/sample-chapters";

export default function Home() {
  return <GardenArchivePrototype chapters={sampleChapters} />;
}
