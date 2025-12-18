import { useEffect, useState } from "react";

export interface GitHubUser {
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
}

export function useGitHubUser(username: string) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("Failed to fetch GitHub user");
        const data = await response.json();
        setUser({
          avatar_url: data.avatar_url,
          name: data.name || username,
          bio: data.bio || "",
          public_repos: data.public_repos,
          followers: data.followers,
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  return { user, loading, error };
}
