import asyncHandler from "express-async-handler";
import prisma from "../prisma/prismaClient";
import { uploadFileToStorage } from "../utils/uploadToFirebase";
import dayjs from "dayjs";
import path from "path";

export const fetchAllUsers = asyncHandler(async (req, res) => {
  const users = await prisma.user.findMany();

  if (users) {
    res.json(
      users.map((user) => ({
        id: user.ID,
        name: user.name,
        mobileNumber: user.mobile_no,
        email: user.email_id,
        address: user.address,
        panNumber: user.pan_no,
        aadhaarNumber: user.aadhar_no,
        certificatePath: user.certificate_path,
        photoPath: user.photo_path,
        status: user.status,
        uploadedDateTime: user.uploaded_datetime,
      }))
    );
  } else {
    res.status(400);
    throw new Error("Error fetching user entries");
  }
});

export const createNewUser = asyncHandler(async (req, res) => {
  const { name, mobileNumber, email, address, panNumber, aadhaarNumber } =
    req.body;
  if (
    !name ||
    !mobileNumber ||
    !email ||
    !address ||
    !panNumber ||
    !aadhaarNumber
  ) {
    res.status(400);
    throw new Error("Missing required parameters");
  }

  // @ts-ignore
  if (!req.files || !req.files["image"] || !req.files["pdf"]) {
    res.status(400);
    throw new Error("Missing files");
  }

  // @ts-ignore
  const image = req.files["image"][0];
  // @ts-ignore
  const pdf = req.files["pdf"][0];

  const imageName = `${name}_photo_${dayjs().format("DMYYYYHHmmss")}${path
    .extname(image.originalname)
    .toLowerCase()}`;

  const pdfName = `${name}_certificate_${dayjs().format("DMYYYYHHmmss")}${path
    .extname(pdf.originalname)
    .toLowerCase()}`;

  const imageDownloadUrl = await uploadFileToStorage(image, imageName);
  const pdfDownloadUrl = await uploadFileToStorage(pdf, pdfName);

  const response = await prisma.user.create({
    data: {
      name: name,
      mobile_no: mobileNumber,
      email_id: email,
      address: address,
      pan_no: panNumber,
      aadhar_no: aadhaarNumber,
      certificate_path: pdfDownloadUrl,
      photo_path: imageDownloadUrl,
    },
  });

  if (response) {
    res.status(201).json({
      id: response.ID,
      name: response.name,
      mobileNumber: response.mobile_no,
      email: response.email_id,
      address: response.address,
      panNumber: response.pan_no,
      aadhaarNumber: response.aadhar_no,
      certificatePath: response.certificate_path,
      photoPath: response.photo_path,
      status: response.status,
      uploadedDateTime: response.uploaded_datetime,
    });
  } else {
    res.status(400);
    throw new Error("Error creating a new user entry");
  }
});

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const response = await prisma.user.update({
    where: { ID: +id },
    data: { status: "ACTIVE" },
  });

  if (response) {
    res.status(201).json({
      id: response.ID,
      name: response.name,
      mobileNumber: response.mobile_no,
      email: response.email_id,
      address: response.address,
      panNumber: response.pan_no,
      aadhaarNumber: response.aadhar_no,
      certificatePath: response.certificate_path,
      photoPath: response.photo_path,
      status: response.status,
      uploadedDateTime: response.uploaded_datetime,
    });
  } else {
    res.status(400);
    throw new Error("Error updating status of user entry");
  }
});
