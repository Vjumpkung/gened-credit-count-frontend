import { useLogin } from "@/services/useLogin";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [pushed, setPushed] = useState<boolean>(false);
  const { login } = useLogin();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = token ? jwtDecode(token) : null;
    if (
      decoded ? (decoded.exp ? decoded.exp * 1000 : 0) : 0 * 1000 > Date.now()
    ) {
      router.push("/gened");
    }
  });

  function onSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (!username || !password) {
      alert("Please fill in all fields");
    } else {
      login(username, password)
        .then((res) => {
          if (!res) {
            alert("Invalid username or password");
            return;
          } else {
            localStorage.setItem("token", res.accesstoken);
            router.push("/gened");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input
          className="border border-gray-300 rounded-md p-2 text-black"
          type="text"
          placeholder="Nontri Account"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="border border-gray-300 rounded-md p-2 text-black"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          type="submit"
          onClick={(event) => onSubmit(event)}
        >
          Login
        </button>
      </form>
    </main>
  );
}
