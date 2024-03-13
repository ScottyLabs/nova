import type { Metadata } from 'next';
import './globals.css';

import localFont from 'next/font/local';
import NavBar from '@/components/NavBar';

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
		<html lang="en">
			<body
				className={`${diatypeFont.variable} ${paridisioFont.variable} ${stretchSansFont.variable} bg-background`}
			>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
