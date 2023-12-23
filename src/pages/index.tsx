import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { useLogin } from "@/services/useLogin";
import { Button, Image, Input } from "@nextui-org/react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NextImage from "next/image";
import Swal from "sweetalert2";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isExecute, setIsExecute] = useState<boolean>(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
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
    setIsExecute(true);
    e.preventDefault();
    if (!username || !password) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
        confirmButtonColor: "#0070f0",
      });
      setIsExecute(false);
    } else {
      login(username, password)
        .then((res) => {
          if (!res) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Wrong username or password!",
              confirmButtonColor: "#0070f0",
            });
            setIsExecute(false);
            return;
          } else {
            localStorage.setItem("token", res.accesstoken);
            router.push("/gened");
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Wrong username or password!",
            confirmButtonColor: "#0070f0",
          });
          setIsExecute(false);
        });
    }
  }

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between`}>
      <title>KU GenEd Credit Count - Login Page</title>
      <form className="flex flex-col items-center justify-center gap-4 w-full max-w-xl m-auto px-2">
        <Image
          as={NextImage}
          width={100}
          height={100}
          src="/icon.png"
          quality={100}
          alt="KU GenEd Credit Count Logo"
        />
        <h1 className="text-2xl font-bold">KU GenEd Credit Count</h1>
        <Input
          size="lg"
          type="text"
          placeholder="Nontri Account"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={isVisible ? "text" : "password"}
          size="lg"
          placeholder="Password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="font-bold text-lg"
          isDisabled={isExecute}
          isLoading={isExecute}
          size="lg"
          color="primary"
          type="submit"
          onClick={(e) => onSubmit(e)}
        >
          Login
        </Button>
        <span className="text-xs text-gray-300">
          for educational purposes only.
        </span>
      </form>
    </main>
  );
}
