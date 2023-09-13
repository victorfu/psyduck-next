import "server-only";
import LoginButton from "@/components/LoginButton";

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div>Psyduck Next</div>
      <br />
      <LoginButton />
    </div>
  );
}

export default LoginPage;
