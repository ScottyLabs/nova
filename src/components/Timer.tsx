import TopBar from '@/components/TopBar';
import { useEffect, useState } from 'react';

const START_DATE = new Date('2024-11-09T11:00:00.000-05:00');
const END_DATE = new Date('2024-11-09T17:30:00.000-05:00');

const EVENTS = [
	['10:30', '11:00', 'Opening Ceremony'],
	['12:00', '13:00', 'Lunch'],
	['18:00', '19:30', 'Presentations'],
	['19:30', '20:30', 'Dinner'],
	['20:30', '21:30', 'Closing and Awards'],
];

export default function Timer() {
	const [remainingTimeString, setRemainingTimeString] = useState('');
	const [currentEvent, setCurrentEvent] = useState('');

	const setRemainingTime = (time: number) => {
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / (1000 * 60)) % 60);
		const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const days = Math.floor(time / (1000 * 60 * 60 * 24));

		setRemainingTimeString(`${days}d ${hours}h ${minutes}m ${seconds}s`);
	};

	const getRemainingTime = () => {
		const currentTime = Date.now();
		const startTime = START_DATE.getTime();
		const endTime = END_DATE.getTime();

		if (currentTime < startTime) {
			return startTime - currentTime;
		}
		if (currentTime < endTime) {
			return endTime - currentTime;
		}
		return 0;
	};

	const getCurrentEvent = () => {
		const currentTime = Date.now();
		for (let i = 0; i < EVENTS.length; i += 1) {
			const event = EVENTS[i];
			const start = new Date(`2024-11-09T${event[0]}:00.000-05:00`);
			const end = new Date(`2024-11-09T${event[1]}:00.000-05:00`);

			if (
				currentTime >= start.getTime() &&
				currentTime <= end.getTime()
			) {
				return event[2];
			}
		}
		return '-';
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingTime(getRemainingTime());
			setCurrentEvent(getCurrentEvent());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="h-screen">
			<TopBar />

			<div className="flex flex-col items-center justify-center h-screen font-din">
				<b className="text-5xl text-green">
					HACKING {new Date() < START_DATE ? 'STARTS' : 'ENDS'} IN
				</b>
				<b className="text-7xl text-pink pt-8">{remainingTimeString}</b>
				<b className="text-3xl text-green pt-16">HAPPENING NOW</b>
				<b className="text-2xl">{currentEvent}</b>
			</div>
		</main>
	);
}
