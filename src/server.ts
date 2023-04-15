import express, { response } from "express";
import type { Request, Response } from "express";
import { cards } from "./cards";
import swaggerUI from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { ChargeSchema } from "./Schemas/Charge.schema";
import { ChardDTO } from "./@types/Charge.dto";

const app = express();

app.use(express.json());
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get("/", (request, response) => {
  return response.status(200).json({
    message: "Server running...",
  });
});

app.post("/charge", (request: Request, response: Response) => {
  const orderDTO = request.body;

  const result = ChargeSchema.safeParse(orderDTO);

  if (!result.success) {
    const formatted = result.error.format();
    return response.status(400).json({
      statusCode: 400,
      message: "bad request",
      more_info: formatted,
    });
  }

  const card = cards.find(
    (_card) => _card.number === orderDTO.order.card.number
  );

  if (!card) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.holder !== orderDTO.order.card.holder) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.exp_year !== orderDTO.order.card.exp_year) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.exp_month !== orderDTO.order.card.exp_month) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  if (card.security_code !== orderDTO.order.card.security_code) {
    return response.status(404).json({
      statusCode: 404,
      message: "payment refused",
      payment_status: "REFUSED",
    });
  }

  return response.status(200).json({
    statusCode: 200,
    payment_status: "PAYED",
    message: "payment was approved",
    paid_in: new Date(),

    purchase_information: {
      title: orderDTO.order.title,
      price: orderDTO.order.price,
      installments: orderDTO.order.installments,
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
