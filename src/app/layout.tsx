import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';

const diatypeFont = localFont({
	src: '../fonts/diatype-condensed-regular.woff2',
	display: 'swap',
	variable: '--font-diatype',
});
const paridisioFont = localFont({
	src: '../fonts/paridisio.otf',
	display: 'swap',
	variable: '--font-paridisio',
});
const stretchSansFont = localFont({
	src: '../fonts/stretch-sans.otf',
	display: 'swap',
	variable: '--font-stretch-sans',
});
const dinFont = localFont({
	src: '../fonts/DIN-2014_Regular.otf',
	display: 'swap',
	variable: '--font-din',
});

export const metadata: Metadata = {
	title: 'Nova',
	description: 'Emerging tech',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth">
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
			</head>
			<body
				className={`${diatypeFont.variable} ${paridisioFont.variable} ${stretchSansFont.variable} ${dinFont.variable} bg-background`}
			>
				{children}
			</body>
		</html>
	);
}
