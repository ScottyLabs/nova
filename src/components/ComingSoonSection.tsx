import Image from 'next/image';

export default function ComingSoonSection() {
	return (
		<section
			id="coming-soon"
			className="h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full"
		>
			<div className="max-w-3xl mx-auto flex items-center justify-center flex-col h-full relative w-full">
				<div className="relative w-full h-64 sm:h-80 lg:h-96">
					<Image
						src="/coming_soon.svg"
						alt="Coming Soon"
						className="object-contain"
						layout="fill"
					/>
				</div>
			</div>
		</section>
	);
}
