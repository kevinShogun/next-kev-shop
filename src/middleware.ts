import { NextRequest, NextResponse } from "next/server";
// import * as jose from "jose";
import { getToken } from "next-auth/jwt";
// import { jwt } from "@/utils";

export async function middleware(req: NextRequest) {
	// const prevPage = req.nextUrl.pathname;

	// if (prevPage.startsWith("/checkout")) {
	// 	const token = req.cookies.get("token")?.value;

	// 	if (!token) {
	// 		return NextResponse.redirect(
	// 			new URL(`/auth/login?p=${prevPage}`, req.url)
	// 		);
	// 	}

	// 	try {
	// 		await jose.jwtVerify(
	// 			token || "",
	// 			new TextEncoder().encode(process.env.JWT_SECRET_SEED)
	// 		);
	// 		return NextResponse.next();
	// 	} catch (error) {
	// 		console.log(`JWT no válido -> ${error}`);
	// 			return NextResponse.redirect(
	// 			new URL(`/auth/login?p=${prevPage}`, req.url)
	// 		);
	// 	}
	// }

	const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	// console.log(session);
	if(!session){
		const requestedPage = req.nextUrl.pathname;
		const url = req.nextUrl.clone();
		url.pathname = `/auth/login`;
		url.search = `p=${requestedPage}`

		return NextResponse.redirect(url);
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/checkout/address", "/checkout/summary"],
};
