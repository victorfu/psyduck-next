import "server-only";
import LoginButton from "@/components/LoginButton";
import Logo from "@/components/Logo";

function LoginPage() {
  return (
    <div className="flex flex-col items-center pt-36">
      <Logo />
      <br />
      <LoginButton />
    </div>
  );
}

export default LoginPage;
