import React, { ReactNode, Suspense } from "react"
import { Head, useMutation, Link } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const UnauthLinks = () => (
  <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
    <li className="flex-1 md:flex-none md:mr-3">
      <Link href="/signup">
        <a className="inline-block py-2 px-4 text-white no-underline">Sign Up</a>
      </Link>
    </li>
    <li className="flex-1 md:flex-none md:mr-3">
      <Link href="/login">
        <a className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4">
          Login
        </a>
      </Link>
    </li>
  </ul>
)

const HeaderLinks = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <ul className="list-reset flex justify-between flex-1 md:flex-none items-center">
        <li className="flex-1 md:flex-none md:mr-3">
          <Link href="/leaderboard">
            <a className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4">
              Leaderboard
            </a>
          </Link>
        </li>
        <li className="flex-1 md:flex-none md:mr-3">
          <span className="inline-block py-2 px-4 text-white no-underline">
            {currentUser.name || "Noname"}
          </span>
        </li>
        <li className="flex-1 md:flex-none md:mr-3">
          <button
            className="inline-block no-underline text-white hover:text-gray-200 hover:text-underline py-2 px-4"
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }
  return <UnauthLinks />
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "dotjs-leaderboardd"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
        <div className="flex flex-wrap items-center">
          <div className="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
            <a href="/" className="flex w-12 justify-center">
              <span className="text-xl pl-2">
                <img src="/dotjs.svg" alt="dotjs logo" />
              </span>
            </a>
          </div>
          <div className="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2"></div>
          <div className="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <Suspense fallback={<UnauthLinks />}>
              <HeaderLinks />
            </Suspense>
          </div>
        </div>
      </nav>
      <div className="flex flex-col md:flex-row mt-24">
        <div className="container mx-auto">{children}</div>
      </div>
    </>
  )
}

export default Layout
