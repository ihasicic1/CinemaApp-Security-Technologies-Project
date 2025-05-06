import { ReactNode } from "react";

import "./card.scss";

export type CardProps = {
  photoUrl: string;
  title: string;
  description: ReactNode;
  extra?: ReactNode;
  layout?: "vertical" | "horizontal";
  className?: string;
};

export const Card = ({
  photoUrl,
  title,
  description,
  extra,
  layout = "vertical",
  className = "",
}: CardProps) => {
  return (
    <div className={`card-container ${className} ${layout}`}>
      <img className="card-img" src={photoUrl} />
      <div className="card-content">
        <h4 className="card-title" title={title}>
          {title}
        </h4>
        <div className="card-description">{description}</div>
      </div>
      <div className="card-extra">{extra}</div>
    </div>
  );
};
