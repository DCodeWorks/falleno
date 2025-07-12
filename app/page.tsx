import { redirect } from "next/navigation";

export default function RootPage() {
  // Per ora, reindirizziamo sempre alla landing page.
  // In futuro: if(utenteAutenticato) redirect('/dashboard');
  redirect("/landing");
}
