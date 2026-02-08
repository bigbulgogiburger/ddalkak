import { RegionSelector } from '../components/RegionSelector';

export default function CourseWizard() {
  const handleRegionSelect = (region: string) => {
    console.log('Selected region:', region);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-2xl mx-auto pt-8">
        <RegionSelector onRegionSelect={handleRegionSelect} />
      </div>
    </div>
  );
}
