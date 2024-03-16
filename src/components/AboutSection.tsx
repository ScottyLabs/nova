import Image from 'next/image';

export default function AboutSection() {
	return (
		<section
			id="about"
			className="bg-text h-screen my-32 overflow-y-visible overflow-x-clip"
		>
			<div className="relative w-full h-full max-w-8xl mx-auto">
				<Image
					src="/arches_down.svg"
					alt="Nova"
					height="512"
					width="512"
					className="-top-56 left-20 min-w-[32rem] absolute"
				/>
				<Image
					src="/arches_up.svg"
					alt="Nova"
					height="512"
					width="512"
					className="-bottom-56 right-20 min-w-[32rem] absolute"
				/>
				<Image
					src="/tilted_1.svg"
					alt="Nova"
					height="256"
					width="256"
					className="w-48 sm:w-64 top-20 left-20 absolute"
				/>
				<Image
					src="/tilted_2.svg"
					alt="Nova"
					height="256"
					width="256"
					className="w-48 sm:w-64 bottom-20 right-20 absolute"
				/>
				<Image
					src="/novaflake.svg"
					alt="Nova"
					height="256"
					width="256"
					className="left-1/2 -translate-x-1/2 bottom-32 absolute hidden md:block w-48"
				/>
				<div className="py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full h-full">
					<div className="text-background font-stretch-sans w-full max-w-4xl text-center text-2xl sm:text-3xl leading-5 sm:leading-7">
						This season, tech is in{' '}
						<span className="text-tertiary">bloooom</span>—our
						dynamic logotype grows throughout the weeklong event,
						representing a multitude of events before culminating in
						an emergent flower for the final showcase.
					</div>
				</div>
			</div>
		</section>
	);
}
