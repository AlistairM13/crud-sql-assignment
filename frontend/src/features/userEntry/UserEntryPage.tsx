import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserEntryPayload, createUserEntry } from "./userEntryService";

const UserEntryPage = () => {
  const [userTextData, setUserTextData] = useState<UserEntryPayload>({
    name: "",
    mobileNumber: "",
    email: "",
    address: "",
    panNumber: "",
    aadhaarNumber: "",
  });

  const handleTextDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserTextData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const uploadData = () => {
    createUserEntryMutation(userTextData);
  };

  //   const { isPending, error, data } = useQuery({
  //     queryKey: ["userEntry"],
  //     queryFn: () => fetchAllUsers(),
  //   });

  //   if (isPending) return "Loading...";

  //   if (error) return "An error has occurred: " + error.message;

  //   console.log(data);

  const { mutate: createUserEntryMutation } = useMutation({
    mutationFn: (user: UserEntryPayload) => createUserEntry(user),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="border border-black  flex flex-col justify-center gap-4 p-6 md:p-8 rounded-md  w-[30%] max-w-[768px]">
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
            type="number"
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
            Photo (jpeg)
          </label>
          <input
            className="w-full"
            id="photo"
            placeholder="Enter your image"
            type="file"
            required
          />
        </div>
        <div className="flex items-center">
          <label className="w-[40%]" htmlFor="panPdf">
            PAN or Aadhaar PDF
          </label>
          <input
            className="w-full"
            id="panPdf"
            placeholder="Enter your PAN or Aadhaar pdf"
            type="file"
            required
          />
        </div>
        <button
          className="rounded-md py-4 border border-black hover:bg-black hover:text-white"
          onClick={uploadData}
        >
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
};

export default UserEntryPage;
