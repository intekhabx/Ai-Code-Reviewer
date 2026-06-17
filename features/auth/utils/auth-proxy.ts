import { NextRequest, NextResponse } from "next/server";
import { getSafeCallbackPath, SIGN_IN_PATH } from ".";
import { auth } from "@/lib/auth";


function redirectToSignIn(req: NextRequest, pathname: string){
  const signInUrl = new URL(SIGN_IN_PATH, req.url);

  signInUrl.searchParams.set("callbackUrl", `${pathname}${req.nextUrl.search}`)

  return NextResponse.redirect(signInUrl);
}


function getPostAuthRedirectPath(request: NextRequest): string {
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  return getSafeCallbackPath(callbackUrl);
}



export async function handleAuthProxy(req: NextRequest) {

  const {pathname} = req.nextUrl;

  if(pathname === "/"){
    return NextResponse.next();
  }

  // check here user is loggedin or not
  const session = await auth.api.getSession({
    headers: req.headers
  })

  if(pathname === SIGN_IN_PATH){
    // if user is loggedin the redirect to dashboard
    if(session){
      const redirectPath = getPostAuthRedirectPath(req);
      // redirectPath ====== "/dasboard"
      return NextResponse.redirect(new URL(redirectPath, req.url));
    }

    return NextResponse.next();
  }


  if(!session){
    return redirectToSignIn(req, pathname)
  }

  return NextResponse.next()
}