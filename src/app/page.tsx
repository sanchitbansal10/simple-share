import { randomUUID } from "crypto";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function HomePage({}) {
  const noteId = randomUUID();
  redirect(`/${noteId}`)
}
