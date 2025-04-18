import { ReactNode } from "react";

import "./card.scss";

export type CardProps = {
  photoUrl: string;
  title: string;
  description: ReactNode;
  className?: string;
};

export const Card = ({
  photoUrl,
  title,
  description,
  className = "",
}: CardProps) => {
  return (
    <div className={`card-container ${className}`}>
      <img className="card-img" src={photoUrl} />
      <p className="card-title" title={title}>
        {title}
      </p>
      <div className="card-description">{description}</div>
    </div>
  );
};
