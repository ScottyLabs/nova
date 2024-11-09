import { useEffect, useState } from 'react';
import TopBar from '@/components/TopBar';

export default function Timer() {
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds((prevSeconds) => prevSeconds + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<main className="h-screen">
			<TopBar />

			<div className="flex flex-col gap-8 items-center">
				<h1>Timer</h1>
				<p>{seconds} seconds have elapsed.</p>
				<p>ntaoshueasntuhaao</p>
			</div>
		</main>
	);
}
