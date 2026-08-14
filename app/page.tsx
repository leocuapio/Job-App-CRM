import { SignIn, SignOut } from "@/components/auth-components";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import ApplicationsClient from "@/components/applicationsClient";

export async function Page() {
  const session = await auth();

  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      }
    })
  }



  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#221f1f]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        {!session ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md rounded-lg border border-[#ded7cc] bg-white p-8 shadow-[0_24px_80px_rgba(34,31,31,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6d655c]">
                Job Application CRM
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-[#221f1f]">
                Track every role with a calmer desk.
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#6d655c]">
                Sign in to view your application pipeline, notes, and interview progress.
              </p>
              <div className="mt-8 grid gap-3">
                <SignIn provider="github" />
                <SignIn provider="google"/>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-6">
            <ApplicationsClient session = {session}/>
            <div className="flex justify-center pb-4">
              <SignOut />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
