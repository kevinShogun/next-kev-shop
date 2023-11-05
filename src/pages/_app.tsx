import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { AuthProvider, CartProvider, UiProvider } from "@/context";
import { lightTheme } from "@/themes";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<PayPalScriptProvider
				options={{
					clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT || "",
				}}
			>
				<SWRConfig
					value={{
						//   refreshInterval: 3000,
						fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
					}}
				>
					<AuthProvider>
						<CartProvider>
							<UiProvider>
								<ThemeProvider theme={lightTheme}>
									<CssBaseline />
									<Component {...pageProps} />
								</ThemeProvider>
							</UiProvider>
						</CartProvider>
					</AuthProvider>
				</SWRConfig>
			</PayPalScriptProvider>
		</SessionProvider>
	);
}
