import Image from 'next/image';

const links = [
	{ name: 'About', link: '#about' },
	{ name: 'Schedule', link: '#schedule' },
	{ name: 'Speakers', link: '#speakers' },
	{ name: 'Prizes', link: '#prizes' },
	{ name: 'Sponsors', link: '#sponsors' },
	{ name: 'FAQ', link: '#faq' },
] as const;

export default function NavBar() {
	return (
		<nav className="hidden md:block m-8">
			<div className="flex justify-between">
				<Image src="/logo.svg" alt="Nova" width={100} height={100} />
				<div className="flex items-center justify-center gap-8 font-paradisio capitalize">
					{links.map((link) => (
						<a key={link.name} href={link.link}>
							<span className="tracking-widest capitalize group transition duration-300">
								{link.name.toUpperCase()}
								<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary" />
							</span>
						</a>
					))}
				</div>
			</div>
		</nav>
	);
}
