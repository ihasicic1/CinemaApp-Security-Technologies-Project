import "./button.scss";

export type ButtonProps = {
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  label,
  className = "",
  icon,
  disabled = false,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={`button button-${variant} ${
        disabled ? "disabled" : ""
      } ${className}`}
      {...restProps}
    >
      {label} {icon}
    </button>
  );
};
