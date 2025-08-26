import GFMTFHeader from '../components/GFMTFHeader';
import GalleryHero from '../components/gallery/GalleryHero';
import VideoHighlights from '../components/gallery/VideoHighlights';
import MediaGrid from '../components/gallery/MediaGrid';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <GFMTFHeader />
      <GalleryHero />
      <VideoHighlights />
      <MediaGrid />
    </div>
  );
}