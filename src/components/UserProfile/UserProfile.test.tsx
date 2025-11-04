import type { User } from "@/types";
import { render, screen, waitFor } from "@testing-library/react";
import UserProfile from "./UserProfile";
import { type Mock } from "vitest";
import { fetchUser } from "@/api/usersAPI";

vi.mock("@/api/usersAPI", () => ({
  fetchUser: vi.fn(),
}));

describe("UserProfile component", () => {
  const mockUser: User = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: {
        lat: "-37.3159",
        lng: "81.1496",
      },
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  };
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    render(<UserProfile id={1} />);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("renders user data after successful fetch", async () => {
    (fetchUser as Mock).mockResolvedValueOnce(mockUser);
    render(<UserProfile id={1} />);
    await waitFor(() => {
      expect(screen.getByText(mockUser.name)).toBeInTheDocument();
      expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    });
  });

  it("shows an error message when fetch fails", async () => {
    (fetchUser as Mock).mockRejectedValueOnce(new Error("Network error"));
    render(<UserProfile id={1} />);
    await waitFor(() => {
      expect(screen.getByText(/Oops! network error/i)).toBeInTheDocument();
    });
  });
});
