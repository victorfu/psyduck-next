import "server-only";
import LoginButton from "@/components/ui/login-button";
import Logo from "@/components/ui/logo";

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
