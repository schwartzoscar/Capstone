import clsx from "clsx";

export default function InfoBlock(props) {

  const { title, children, className } = props;

  return(
    <div className={clsx("info-block", className)}>
      {title && <div className="info-block-title">{title}</div>}
      <div className="info-block-content">{children}</div>
    </div>
  );
}
