import React, { forwardRef } from "react";
import "./parcours.css";

type Props = {
  year: string;
  title: string;
  institution: string;
  details?: string;
  bgImage: string;
};

const ParcoursCard = forwardRef<HTMLDivElement, Props>(
  ({ year, title, institution, details, bgImage }, ref) => {
    return (
      <div
        className="parcours-item"
        ref={ref}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="parcours-item-overlay" />
        <div className="parcours-item-year">{year}</div>
        <div className="parcours-item-content">
          <div className="parcours-item-title">{title}</div>
          <div className="parcours-item-institution">{institution}</div>
          {details && <div className="parcours-item-details">{details}</div>}
        </div>
      </div>
    );
  }
);

export default ParcoursCard;
