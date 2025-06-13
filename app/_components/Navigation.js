import Link from "next/link";
import Image from "next/image";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/" className="hover:text-accent-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              {/* <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 rounded-full"
                referrerPolicy="no-referrer"
              ></img> */}
              <div className="relative h-8 w-8">
                <Image
                  fill
                  src={session.user.image}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                  className="object-contain rounded-full"
                ></Image>
              </div>
              <span>Guest area</span>
              {/* <span>{session.user.name}</span> */}
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
