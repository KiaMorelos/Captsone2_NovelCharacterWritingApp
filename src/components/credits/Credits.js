import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import "./Credits.css";
//prettier-ignore
function Credits() {
  return (
    <div className="m-auto p-5">
      <h1 className="display-1 text-center">
        Credits
        <FontAwesomeIcon icon={faQuoteRight} />
      </h1>
      <h2 className="display-6 text-center">This project is a class project</h2>
      <div className="m-5 p-3">
        <p>
          <a href="https://avatars.dicebear.com/styles/bottts">Bottts </a>
          placeholder photos are by Pablo Stanley via
          <a href="https://avatars.dicebear.com/licenses"> DiceBear</a>
        </p>
        <p>
          Marcel Proust Questionaire Data copied from The Write Practice's
          post{" "}
          <a href="https://thewritepractice.com/proust-questionnaire/">
            Proust Questionnaire: 35 Questions To Ask Your Characters From
            Marcel Proust{" "}
          </a>
          , but can be found in many archives on the web, including Wikipedia
          and Vanity fair.
        </p>
        <p>
          Bernard Pivot and James Lipton Questionaire Data was copied from
          <a href="https://www.deschuteslibrary.org/">
            {" "}
            Deschutes Library.org
          </a>{" "}
          The original pdf can be found
          <a href="https://www.deschuteslibrary.org/files/uploads/Bernard%20Pivot%20and%20James%20Lipton%20Questionnaires.pdf">
            {" "}
            here
          </a>
          , and also can be found on various other websites.
        </p>

        <p>
          The largest list of questions comes from
          <a href="https://mousepawmedia.com/"> MousePawMedia's</a> Character
          Analysis Form
          <a href="https://mousepawmedia.com/downloads/writing/CharacterAnalysis.pdf">
            {" "}
            found here in pdf format
          </a>
        </p>
      </div>
    </div>
  );
}

export default Credits;
