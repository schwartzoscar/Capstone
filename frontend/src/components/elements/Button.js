import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import LoadingBars from "./LoadingBars";

export default function Button(props) {

  const btnClass = `btn ${props.className ?? ''}`;

  const icon = useMemo(() => {
    if(props.loading) return <LoadingBars/>;
    if(props.icon) return <i className={`fas ${props.icon}`}/>;
    return null;
  }, [props.loading, props.icon]);

  if(props.hasOwnProperty('to')) {
    return <Link className={btnClass} to={props.to} disabled={props.disabled || props.loading}>{icon}{props.children}</Link>;
  } else {
    return <button className={btnClass} onClick={props.onClick} disabled={props.disabled || props.loading}>{icon}{props.children}</button>;
  }
}