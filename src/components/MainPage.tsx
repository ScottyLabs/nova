import Image from 'next/image';
import Link from 'next/link';
import TopBar from '@/components/TopBar';

export default function MainPage() {
	return (
		<div>
			<Image
				src="/landing_page.svg"
				alt="Nova"
				height="100"
				width="10000"
				className="absolute"
			/>
			<TopBar />
			<Link
				href="https://go.scottylabs.org/nova"
				className="absolute left-[52.3vw] top-[30vw]"
			>
				<Image
					src="/new_register.svg"
					alt="Register"
					width={0}
					height={0}
					style={{ width: '10vw', height: 'auto' }} // optional
				/>
			</Link>
		</div>
	);
}
