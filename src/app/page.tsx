import ComingSoonSection from '@/components/ComingSoonSection';
import LandingSection from '@/components/LandingSection';
import AboutSection from '@/components/AboutSection';
import Separator from '@/components/Separator';
import Schedule from '@/components/Schedule';

export default function Home() {
	return (
		<main className="flex flex-col gap-8">
			<LandingSection />
			<Separator />
			<Schedule />
			<ComingSoonSection />
			<AboutSection />
		</main>
	);
}
