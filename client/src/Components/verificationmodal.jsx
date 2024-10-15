import { useEffect, useState, useRef, useCallback } from "react";
// import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { verifyUser } from "../features/auth/authslice";

export default function VerificationModal() {
  const { isError, isVerified,message } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [openModal] = useState(true);

  
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]); // checks if inputs are empty

 

useEffect(() => {
  if (isVerified) {
    // toast.success("great!!!");
    alert("Great")
     navigate("/")
    //  navigate to login
  } else if (!isVerified && isError) {
    alert(message)
    // toast.error("Verification code is wrong!!!");
  }
}, [isVerified, isError]);

  // Handle OTP input change
  const handleInputChange = (index, value) => {
  if (/^\d$/.test(value)) {  // Ensure only digits
    const newOtp = [...otp];
    newOtp[index] = value;

    // Update OTP state
    setOtp(newOtp);

    // Move focus to the next input if the value is not empty and not the last input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  }
};

  // Handle OTP form submission

  /**
   * Can handleSubmit be used without useCallback?

    Technically, yes—you could remove useCallback and not wrap handleSubmit. However, if you do this:
        1. The useEffect will still work, but since handleSubmit is being re-created on every render, the effect might re-run unnecessarily if you include it in the dependency array. This could lead to unintended behavior in more complex cases.
        2. If you don't include handleSubmit in the dependency array and don't wrap it in useCallback, there's a risk of using a stale version of handleSubmit that doesn't capture the most current state (recall i was having 5 digits of  otp not 6 ie stale version of otp), particularly otp.
        since otp is the dynamic part that changes (as users enter their OTP), handleSubmit needs to "watch" or rely on the latest version of otp. That's why it's included in the useCallback dependency array.
   */
  const handleSubmit = useCallback(() => {
    const activationToken = localStorage.getItem("verificationToken");
  
  
    const activationCode = otp.join("");
  
    const values = {
      activation_token: activationToken,
      activation_code: activationCode,
    };
  
    console.log("Submitting values:", values);
  
    dispatch(verifyUser(values));

    setOtp(Array(6).fill(""));
    inputRefs.current[0].focus();

  }, [otp]);

  useEffect(() => {
    if (otp.join("").length === 6) {
      handleSubmit(); 
    }
  }, [otp,handleSubmit]);

  return (
     openModal && (
      <Dialog open={openModal} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Please enter the verification code that was sent to your email
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm mb-5 text-gray-500">Enter Codes</p>
                  <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  );
}
/**
 * In React, every time a component re-renders, all the variables and functions defined inside that component are recreated. This includes functions, like handleSubmit, that are defined directly in the component body.
 * Every time MyComponent re-renders (due to state changes, props changes, etc.), a new version of the handleSubmit function is created. Even though the code inside handleSubmit looks the same, technically it's a different function with a new memory reference.

    This is not a problem when you're just calling handleSubmit inside onClick. However, when you're using it in a dependency array of useEffect, React will detect that the function has changed (since its reference is new on each render), and this might cause issues.
 */