import Image from 'next/image';

export default function Separator() {
	return (
		<div className="w-full h-24 relative overflow-clip">
			<Image
				src="/separator.svg"
				className="object-cover"
				alt=""
				layout="fill"
			/>
		</div>
	);
}
