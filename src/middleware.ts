import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import { jwt } from "@/utils";

export async function middleware(req: NextRequest) {
	const prevPage = req.nextUrl.pathname;

	if (prevPage.startsWith("/checkout")) {
		const token = req.cookies.get("token")?.value;

		if (!token) {
			return NextResponse.redirect(
				new URL(`/auth/login?p=${prevPage}`, req.url)
			);
		}

		try {
			await jose.jwtVerify(
				token || "",
				new TextEncoder().encode(process.env.JWT_SECRET_SEED)
			);
			return NextResponse.next();
		} catch (error) {
			console.log(`JWT no válido -> ${error}`);
			// const {protocol, host, pathname} = req.nextUrl;
			// return NextResponse.redirect(
			// 	`${protocol}//${host}/auth/login?previousPath=${pathname}`
			//   );
			return NextResponse.redirect(
				new URL(`/auth/login?p=${prevPage}`, req.url)
			);
		}
	}
}

export const config = {
	matcher: ["/checkout/:path*"],
};
