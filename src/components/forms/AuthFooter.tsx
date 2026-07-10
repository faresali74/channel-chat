import { Link } from "react-router-dom";

type AuthFooterProps = {
  text: string;
  action: string;
  to: string;
};

function AuthFooter({ text, action, to }: AuthFooterProps) {
  return (
    <div className="border-t pt-4 text-center text-sm">
      {text}{" "}
      <Link to={to} className="font-semibold hover:underline">
        {action}
      </Link>
    </div>
  );
}

export default AuthFooter;
