import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../Button";
import logo from "../../assets/img/Logo.png";
import signIn from "../../assets/img/sign-in-success.png";
import signUp from "../../assets/img/sign-up-success.png";

import "../Authentication/authentication.scss";

export type SuccessScreenProps = {
  type: "signIn" | "signUp";
  onClose: () => void;
  redirectPath?: string;
};

export const SuccessScreen = ({
  type,
  onClose,
  redirectPath = "/",
}: SuccessScreenProps) => {
  const isSignIn = type === "signIn";
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      navigate(redirectPath);
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, onClose, redirectPath]);

  const handleButtonClick = () => {
    onClose();
    navigate(redirectPath);
  };

  const getDestinationInfo = () => {
    if (redirectPath === "/") {
      return {
        destination: "homepage",
        buttonText: isSignIn ? "Go to Home" : "See Movies",
      };
    }

    if (redirectPath === "/buy-ticket") {
      return {
        destination: "ticket booking page",
        buttonText: "Continue Booking",
      };
    }

    return {
      destination: "homepage",
      buttonText: isSignIn ? "Go to Home" : "See Movies",
    };
  };

  const { destination, buttonText } = getDestinationInfo();

  return (
    <div className="auth-container">
      <div className="auth-content">
        <img src={logo} alt="Logo" className="auth-logo-icon" />
        <h5 className="auth-title">
          {isSignIn ? "Sign In Successful!" : "You're all set!"}
        </h5>

        <p className="auth-subtitle">
          {!isSignIn
            ? "Start exploring latest movies, venues, and ticket options!"
            : `You will be redirected to the ${destination}.`}
        </p>

        <div className="auth-success-image">
          <img src={isSignIn ? signIn : signUp} alt="Success" />
        </div>

        <Button
          variant="primary"
          label={buttonText}
          className="auth-submit-button"
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
