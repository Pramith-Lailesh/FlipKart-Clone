const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_2RzayNagjiaDMu",
  key_secret: "PbMU9S5Nok0NvI4orOLDImct",
});

const getKey = async (req, res) => {
  try {
    const key = "rzp_test_2RzayNagjiaDMu";
    res.status(200).json({
      success: true,
      key,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const checkOut = async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount) * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error while checkOut",
      error: error.message,
    });
  }
};

const crypto = require("crypto");

const keySecret = "PbMU9S5Nok0NvI4orOLDImct";

const createSignature = (order_id, razorpay_payment_id) => {
  const text = `${order_id}|${razorpay_payment_id}`;
  const signature = crypto
    .createHmac("sha256", keySecret)
    .update(text)
    .digest("hex");
  return signature;
};

const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const expectedSignature = await createSignature(
    razorpay_order_id,
    razorpay_payment_id
  );

  if (expectedSignature === razorpay_signature) {
    res.redirect("http://localhost:3000");
  } else {
    res.status(400).json({
      success: false,
      error: "Payment verification failed",
    });
  }
};
module.exports = { checkOut, getKey, paymentVerification };
