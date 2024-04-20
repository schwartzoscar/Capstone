import clsx from "clsx";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import RBTooltip from 'react-bootstrap/Tooltip';

export const PASSWORD_TOOLTIP = "Password must contain at least 8 characters including uppercase, lowercase, and numbers.";

export default function Tooltip({ id, children, className }) {
  return(
    <OverlayTrigger overlay={<RBTooltip id={id}>{children}</RBTooltip>}>
      <span className={clsx("fas fa-circle-info", className)}/>
    </OverlayTrigger>
  );
}
