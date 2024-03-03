import { useState } from "react";
import { z, ZodError } from "zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserEntryPayload } from "./userEntryService";
import axios from "../../config/axios";
import { Navbar } from "../../components/ui/navbar";
import { Button } from "../../components/ui/button";

const formDataSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .max(30, "Name should be less than 30 characters"),
  mobileNumber: z
    .string({ required_error: "Mobile number is required" })
    .regex(/^\d{10}$/, {
      message: "Invalid mobile number",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  address: z.string({ required_error: "Address is required" }),
  panNumber: z.string({ required_error: "Pan number is required" }),
  aadhaarNumber: z.string({ required_error: "Aadhaar number is required" }),
  image: z
    .any()
    .refine((val) => val instanceof File && val.type === "image/jpeg", {
      message: "A photo of JPEG type is required",
    }),
  pdf: z
    .any()
    .refine((val) => val instanceof File && val.type === "application/pdf", {
      message: "PDF file is required",
    }),
});

const UserEntryPage = () => {
  const navigate = useNavigate();
  const [userTextData, setUserTextData] = useState<UserEntryPayload>({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    panNumber: "",
    aadhaarNumber: "",
  });
  const [image, setImage] = useState<File>();
  const [pdf, setPdf] = useState<File>();

  const handleTextDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTextData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadData = async () => {
    try {
      formDataSchema.parse({ image, pdf, ...userTextData });

      const formData = new FormData();

      formData.append("image", image!);
      formData.append("pdf", pdf!);
      formData.append("name", userTextData.name);
      formData.append("mobileNumber", userTextData.mobileNumber);
      formData.append("email", userTextData.email);
      formData.append("address", userTextData.address);
      formData.append("panNumber", userTextData.panNumber);
      formData.append("aadhaarNumber", userTextData.aadhaarNumber);

      try {
        await axios.post("/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("User data uploaded!");
        navigate("/");
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error.message);
        } else {
          toast.error("User data upload failed!");
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
      }
    }
  };

  const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setImage(e.target.files[0]);
  };
  const pdfChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setPdf(e.target.files[0]);
  };

  return (
    <div className="h-screen  flex flex-col p-6 md:p-8">
      <div className="pb-6 md:pb-8">
        <Navbar title="User Creation" />
      </div>

      <div className="flex justify-center items-center">
        <div className="border border-black bg-white flex flex-col justify-center gap-6 p-6 md:p-8 rounded-md w-full  max-w-[600px]">
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.name}
              id="name"
              name="name"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="mobile">
              Mobile No.
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.mobileNumber}
              id="mobile"
              name="mobileNumber"
              placeholder="Enter your mobile number"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="email">
              Email ID
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.email}
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="address">
              Address{" "}
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.address}
              id="address"
              name="address"
              placeholder="Enter your address"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="pan">
              PAN No.
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.panNumber}
              id="pan"
              name="panNumber"
              placeholder="Enter your PAN number"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="aadhaar">
              Aadhaar No.
            </label>
            <input
              className="w-full border border-black px-2 py-1 rounded-md"
              onChange={handleTextDataChange}
              value={userTextData.aadhaarNumber}
              id="aadhaar"
              name="aadhaarNumber"
              placeholder="Enter your Aadhaar number"
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="photo">
              Photo (JPEG)
            </label>
            <input
              className="w-full"
              id="photo"
              accept="image/jpeg"
              placeholder="Enter your image"
              type="file"
              onChange={imageChangeHandler}
              required
            />
          </div>
          <div className="flex items-center">
            <label className="w-[40%]" htmlFor="panPdf">
              PAN or Aadhaar (PDF)
            </label>
            <input
              onChange={pdfChangeHandler}
              className="w-full"
              id="panPdf"
              accept="application/pdf"
              placeholder="Enter your PAN or Aadhaar (pdf)"
              type="file"
              required
            />
          </div>
          <Button
            onClick={uploadData}
            className="py-6 bg-black active:scale-[0.99]"
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEntryPage;
