import { signIn, signOut } from "@/lib/auth";

export function SignIn({ provider }: { provider?: string }) {
  const providerLabel = provider === "github" ? "GitHub" : provider === "google" ? "Google" : provider;

  return (
    <form
      action={async () => {
        "use server"; 
        await signIn(provider); 
      }}
      className="w-full"
    >
      <button className="w-full rounded-md border border-[#221f1f] bg-[#221f1f] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#393431] focus:outline-none focus:ring-2 focus:ring-[#221f1f] focus:ring-offset-2">
        Sign In with {providerLabel}
      </button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"; 
        await signOut(); 
      }} 
      className="w-auto"
    >
      <button className="rounded-md border border-[#cfc7bc] bg-white px-4 py-2 text-sm font-semibold text-[#3b3631] shadow-sm transition hover:border-[#a99d8e] hover:bg-[#f9f7f3] focus:outline-none focus:ring-2 focus:ring-[#756a5f] focus:ring-offset-2">
        Sign Out
      </button>
    </form>
  );
}
