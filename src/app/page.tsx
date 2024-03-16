import ComingSoonSection from '@/components/ComingSoonSection';
import LandingSection from '@/components/LandingSection';
import AboutSection from '@/components/AboutSection';
import Separator from '@/components/Separator';

export default function Home() {
	return (
		<main className="flex flex-col gap-8">
			<LandingSection />
			<Separator />
			<ComingSoonSection />
			<AboutSection />
		</main>
	);
}
