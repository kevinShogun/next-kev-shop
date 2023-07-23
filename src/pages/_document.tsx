import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<Script src="https://polyfill.io/v3/polyfill.min.js?features=Intl.NumberFormat,Intl.NumberFormat.~locale.en"/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
