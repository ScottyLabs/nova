import Image from 'next/image';
import Link from 'next/link';

export default function LandingSection() {
	return (
		<section className="min-h-[60vh] py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full">
			<div className="max-w-3xl mx-auto flex items-center justify-center flex-col h-full relative w-full">
				<div className="relative w-full h-64 sm:h-80">
					<Image
						src="/nova_emerging_tech.svg"
						alt="Nova"
						className="object-contain"
						layout="fill"
					/>
				</div>
				<div className="flex flex-col sm:flex-row items-center gap-4">
					<span className="font-paradisio text-xl sm:text-2xl mb-4 sm:mb-0">
						March 23-30, 2024
					</span>
					<span className="hidden sm:block text-4xl">|</span>
					<div className="uppercase text-2xl sm:text-3xl text-center sm:text-left">
						Presented by{' '}
						<span className="text-primary">ScottyLabs</span>
					</div>
				</div>
				<div className="mt-8 sm:mt-12">
					<Link
						href="http://go.scottylabs.org/nova"
						className="inline-block w-fit text-center"
					>
						<Image
							src="/register.svg"
							alt="Register"
							width={259}
							height={69}
						/>
					</Link>
				</div>
			</div>
		</section>
	);
}
