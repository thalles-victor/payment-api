import express from "express";
import type { Request, Response } from "express";
import { cards } from "./cards";

const app = express();

app.use(express.json());

app.post("/charge", (request: Request, response: Response) => {
  const cardDTO = request.body.card;

  if (!cardDTO) {
    return response.status(400).json({
      statusCode: 400,
      message: "bad request",
    });
  }

  if (!cardDTO) {
    return response.status(400).json({
      statusCode: 400,
      message: "parameters invalid, required card object",
    });
  }

  const card = cards.find((_card) => _card.number === cardDTO.number);

  if (!card) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.holder !== cardDTO.holder) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.exp_year !== cardDTO.exp_year) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.exp_mouth !== cardDTO.exp_mouth) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.security_code !== cardDTO.security_code) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  return response.status(200).json({
    payment_status: "PAYED",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
