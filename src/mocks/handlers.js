import { rest } from "msw";
export const getAllQuestionairesResponse = rest.get(
  `${process.env.REACT_APP_BASE_URL}/questionaires`,
  (req, res, ctx) => {
    return res(
      ct.status(200),
      ctx.json({
        questionaires: [
          {
            id: 1,
            name: "Marcel Proust",
            questionaireType: "character analysis",
          },
          {
            id: 2,
            name: "Bernard Pivot",
            questionaireType: "character analysis",
          },
          {
            id: 3,
            name: "James Lipton",
            questionaireType: "character analysis",
          },
          {
            id: 4,
            name: "Mouse Paw Media",
            questionaireType: "character analysis",
          },
        ],
      })
    );
  }
);

export const getAllQuestionsResonse = rest.get(
  `${process.env.REACT_APP_BASE_URL}/questions`,
  (req, res, ctx) => {
    return res(
      ct.status(200),
      ctx.json([
        {
          id: 1,
          questionaireId: 1,
          question: "What is your idea of perfect happiness?",
          questionCategory: "psychological information",
        },
        {
          id: 2,
          questionaireId: 1,
          question: "What is your greatest fear?",
          questionCategory: "psychological information",
        },
        {
          id: 3,
          questionaireId: 1,
          question: "What is the trait you most deplore in yourself?",
          questionCategory: "psychological information",
        },
      ])
    );
  }
);

export const handlers = [getAllQuestionsResonse, getAllQuestionairesResponse];
