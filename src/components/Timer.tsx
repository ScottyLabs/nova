import TopBar from '@/components/TopBar';
import { useEffect, useState } from 'react';

const END_TIME = new Date('2024-11-09T17:30:00.000-05:00');

export default function Timer() {
	const [remainingTime, setRemainingTime] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			const remainingMs = END_TIME.getTime() - Date.now();

			const seconds = Math.floor((remainingMs / 1000) % 60);
			const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
			const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
			const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));

			setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="h-screen">
			<TopBar />

			<div className="flex flex-col items-center justify-center h-screen font-din">
				<b className="text-5xl text-green">HACKING ENDS IN</b>
				<b className="text-7xl text-pink pt-8">{remainingTime}</b>
				<b className="text-3xl text-green pt-16">HAPPENING NOW</b>
				<b className="text-2xl">Event</b>
			</div>
		</main>
	);
}
