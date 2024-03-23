import ImageSelect from "../elements/ImageSelect";

export function Static() {
  return(
    <div>
      <p>Static User Profile Img</p>
    </div>
  );
}

export function Editable() {
  return(
    <div>
      <ImageSelect/>
    </div>
  );
}
