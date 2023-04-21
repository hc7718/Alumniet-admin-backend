const Joi = require("joi");
const admindb = require("../models/admin");
const otpdb = require("../models/otp");
const nodemailer = require("nodemailer");
exports.addAdmin = async (req, res) => {
  try {
    const { body } = req;
    const adminSchema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
      })
      .required();
    let result = adminSchema.validate(body);
    if (result.error) {
      res.status(403).send({ message: result.error.details[0].message });
    } else {
      const admin = await admindb.findOne({ email: body.email });
      if (admin) {
        res.status(409).send({
          message: "This admin is already registered",
        });
      } else {
        const createAdmin = new admindb(body);
        await createAdmin.save();
        res.status(200).send({ message: "Added subAdmin sucessfully" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.checkAdmin = async (req, res) => {
  try {
    const { body } = req;
    const adminSchema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
      })
      .required();
    let result = adminSchema.validate(body);
    if (result.error) {
      res.status(403).send({ message: result.error.details[0].message });
    } else {
      const admin = await admindb.findOne({ email: body.email });
      if (admin) {
        res.status(200).send({
          message: "Congratulations you are admin",
        });
      } else {
        res.status(404).send({ message: "Email not found for this admin" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.sendEmail = async (req, res) => {
  try {
    const { body } = req;
    const mailSchema = Joi.object()
      .keys({
        email: Joi.string().email().required(),
      })
      .required();
    let result = mailSchema.validate(body);
    if (result.error) {
      res.status(403).send({ message: result.error.details[0].message });
    } else {
      const admin = await admindb.findOne({ email: body.email });
      if (admin) {
        const otp = Math.floor(Math.random() * 9000) + 1000;
        const transport = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD,
          },
        });

        const mailOptions = {
          from: "harshchaudhary7718@gmail.com",
          to: body.email,
          subject: "ALUMNIETS OTP",
          text: "OTP",
          html: `<b>Hey Admin! </b><br> Your OTP is ${otp}<br />`,
        };
        transport.sendMail(mailOptions, async (error, info) => {
          if (error) {
            return console.log(error);
          }
          const createOTP = new otpdb({
            otpId: info.messageId.slice(1, 37),
            otp: otp,
          });
          await createOTP.save();
          res.status(200).send({
            otpId: info.messageId.slice(1, 37),
            message: "OTP sent sucessfully",
          });
        });
      } else {
        res.status(404).send({ message: "You're not admin" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { body } = req;
    const otpSchema = Joi.object()
      .keys({
        otpId: Joi.string().required(),
        otp: Joi.number().min(1000).max(9999).required(),
      })
      .required();
    let result = otpSchema.validate(body);
    if (result.error) {
      res.status(403).send({ message: result.error.details[0].message });
    } else {
      const isValid = await otpdb.findOne(body);
      if (isValid) {
        res.status(200).send({
          message: "Correct OTP",
        });
      } else {
        res.status(404).send({ message: "Wrong OTP" });
      }
    }
  } catch (e) {
    res.status(500).send({ message: e.name });
  }
};
