import Button from "../elements/Button";

export default function Home() {
  return(
    <div>
      <h1>Home Page</h1>
      <Button to="/profile" className="btn-primary">My Profile</Button>
      <Button to="/test" className="btn-secondary">Test Form</Button>
      <Button to="/login" className="btn-success">Login</Button>
    </div>
  );
}
