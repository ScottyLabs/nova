import Image from 'next/image';

export default function Schedule() {
	const scheduleItems = [
		{
			date: 'Saturday, March 23',
			svg: '/dates/saturday_march_23.svg',
			items: [
				{ time: '12:00pm', title: 'Opening Ceremony' },
				{ time: '1:00pm', title: 'Lunch' },
				{ time: '12:00am', title: 'Proposals Due' },
			],
		},
		{
			date: 'Sunday, March 24',
			svg: '/dates/sunday_march_24.svg',
			items: [{ time: '12:00pm', title: 'Projects Reviewed' }],
		},
		{
			date: 'Monday, March 25',
			svg: '/dates/monday_march_25.svg',
			items: [],
		},
		{
			date: 'Tuesday, March 26',
			svg: '/dates/tuesday_march_26.svg',
			items: [
				{ time: '2:00-3:00pm', title: 'Michael Hilton Office Hours' },
			],
		},
		{
			date: 'Wednesday, March 27',
			svg: '/dates/wednesday_march_27.svg',
			items: [],
		},
		{
			date: 'Thursday, March 28',
			svg: '/dates/thursday_march_28.svg',
			items: [],
		},
		{
			date: 'Friday, March 29',
			svg: '/dates/friday_march_29.svg',
			items: [
				{ time: '1:00-2:00pm', title: 'Michael Hilton Office Hours' },
			],
		},
		{
			date: 'Saturday, March 30',
			svg: '/dates/saturday_march_30.svg',
			items: [
				{ time: '4:30-6:30pm', title: 'Project Expo' },
				{ time: '6:30-7:30pm', title: 'Dinner & Judging' },
				{ time: '7:30-8:30pm', title: 'Closing Ceremony' },
			],
		},
	];

	return (
		<section
			id="schedule"
			className="py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center w-full"
		>
			<div className="max-w-3xl mx-auto flex items-center justify-center flex-col h-full relative w-full">
				{scheduleItems.map((day, index) => (
					<div key={index} className="mb-16">
						<div className="relative w-full h-32 sm:h-40 mb-4">
							<Image
								src={day.svg}
								alt="Day SVG"
								className="object-contain"
								layout="fill"
							/>
						</div>
						<div className="w-[1011px] h-[233px] flex-shrink-0 border-2 border-[#41F168] rounded-[23px] px-8 py-6 flex items-center justify-center">
							<div className="w-[884px] h-[192px] flex-shrink-0">
								{day.items.length > 0 ? (
									<>
										{day.items.map((item, itemIndex) => (
											<div
												key={itemIndex}
												className="mb-1"
											>
												<div className="text-[#CEFFD9] font-paradisio font-normal text-[41.493px] leading-[55.324px]">
													{item.time} - {item.title}
												</div>
											</div>
										))}
									</>
								) : (
									<div className="flex items-center justify-center h-full">
										<Image
											src="/coming_soon.svg"
											alt="Coming Soon"
											width={701}
											height={160}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
