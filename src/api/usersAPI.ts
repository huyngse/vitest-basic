import type { User } from "../types";

export const fetchUser = async (id: number): Promise<User> => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (response.status === 404) {
        throw new Error("User not found")
    }
    if (!response.ok) throw new Error("Failed to fetch user");
    const user = await response.json();
    if (!user || Object.keys(user).length === 0) {
        throw new Error("User not found")
    }
    return user;
}