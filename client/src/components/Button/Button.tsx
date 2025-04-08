import "./button.scss";

export type ButtonProps = {
  variant?: "primary" | "secondary";
  label: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  variant = "primary",
  label,
  className,
  ...restProps
}: ButtonProps) => {
  return (
    <button className={`button button-${variant} ${className}`} {...restProps}>
      {label}
    </button>
  );
};
