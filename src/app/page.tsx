import Image from 'next/image';

export default function Home() {
	return (
		<main className="h-[40rem]">
			<div className="max-w-3xl mx-auto flex items-center justify-center flex-col h-full">
				<div className="relative w-full h-64">
					<Image
						src="/nova_emerging_tech.svg"
						alt="Nova"
						className="object-contain"
						layout="fill"
					/>
				</div>
				<div className="flex flex-row items-center justify-between w-full">
					<span className="font-paradisio text-2xl">
						March 23-30, 2024
					</span>
					<span>|</span>
					<div className="uppercase text-3xl">
						Presented by{' '}
						<span className="text-primary">ScottyLabs</span>
					</div>
				</div>
			</div>
		</main>
	);
}
