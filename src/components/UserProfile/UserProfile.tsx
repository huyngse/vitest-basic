import { useEffect, useState } from "react";
import type { UserProfileProps } from "./types";
import styles from "./UserProfile.module.css";
import type { User } from "@/types";
import { fetchUser } from "@/api/usersAPI";

const UserProfile = ({ id }: UserProfileProps) => {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchedUser = await fetchUser(id);
        setUser(fetchedUser);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  if (loading)
    return (
      <div className={styles.spinnerContainer}>
        <span />
        <p>Loading...</p>
      </div>
    );
  if (error) return <p className={styles.errorMessage}>Oops! {error}</p>;

  return (
    <div className={styles.userProfile}>
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};

export default UserProfile;
