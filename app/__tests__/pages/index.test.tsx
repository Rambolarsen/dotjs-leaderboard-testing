import React from "react"
import { render } from "test/utils"

import Home from "app/pages/index"
import { useCurrentUser } from "app/hooks/useCurrentUser"

jest.mock("app/hooks/useCurrentUser")
const mockUseCurrentUser = useCurrentUser as jest.MockedFunction<typeof useCurrentUser>

describe("index when not logged in", function () {
  it("render sign up", () => {
    const { getByText } = render(<Home />)
    const linkElement = getByText(/Sign up/i)
    expect(linkElement).toBeInTheDocument()
  })

  it("render log in", () => {
    const { getByText } = render(<Home />)
    const linkElement = getByText(/Login/i)
    expect(linkElement).toBeInTheDocument()
  })
})

describe("index when logged in", function () {
  beforeEach(() => {
    mockUseCurrentUser.mockReturnValue({
      id: 1,
      name: "User",
      email: "user@email.com",
      role: "user",
    })
  })

  it("should not render login", () => {
    const { queryByText } = render(<Home />)
    expect(queryByText(/Login/i)).toBeNull()
  })

  it("should render actions", () => {
    const { getByText } = render(<Home />)
    expect(getByText(/Actions/i)).toBeInTheDocument()
  })

  it("should render activites", () => {
    const { getByText } = render(<Home />)
    expect(getByText(/Activities/i)).toBeInTheDocument()
  })

  //Fix this and you are a god!
  test.skip("should render leaderboard", () => {
    const { getByText } = render(<Home />)
    expect(getByText(/Leaderboard/i)).toBeInTheDocument()
  })
})
