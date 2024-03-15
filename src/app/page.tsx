import Image from 'next/image';

export default function Home() {
	return (
		<main className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto flex items-center justify-center flex-col h-full">
				<div className="relative w-full h-64 sm:h-80 lg:h-96">
					<Image
						src="/nova_emerging_tech.svg"
						alt="Nova"
						className="object-contain"
						layout="fill"
					/>
				</div>
				<div className="flex flex-col sm:flex-row items-center justify-between w-full mt-8">
					<span className="font-paradisio text-xl sm:text-2xl mb-4 sm:mb-0">
						March 23-30, 2024
					</span>
					<span className="hidden sm:block">|</span>
					<div className="uppercase text-2xl sm:text-3xl text-center sm:text-left">
						Presented by{' '}
						<span className="text-primary">ScottyLabs</span>
					</div>
				</div>
			</div>
		</main>
	);
}
