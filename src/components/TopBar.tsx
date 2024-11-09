import Image from 'next/image';

export default function TopBar() {
	return (
		<div>
			<div className="absolute inset-x-0 p-[3vw] md:p-[2vw]">
				<Image
					src="/logo.svg"
					alt="Logo"
					width={0}
					height={0}
					style={{ width: '5vw', height: 'auto' }}
					className="absolute"
				/>
			</div>
			<div className="absolute top-0 right-0 py-[5vw] md:py-[3vw] px-[3.5vw]">
				<div className="flex">
					<Image
						src="/vees.svg"
						alt="vees"
						height={0}
						width={0}
						style={{ width: '8vw', height: 'auto' }}
						className="mx-2"
					/>
					<b className="font-din text-[2vw] md:text-[1.5vw]">
						<a className="text-pink">PRESENTED BY</a>{' '}
						<a className="text-green">SCOTTYLABS</a>
					</b>
				</div>
			</div>
		</div>
	);
}
