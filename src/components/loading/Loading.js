import Spinner from "react-bootstrap/Spinner";

function Loading() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ margin: "50vh 50vw", color: "cadetblue" }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loading;
