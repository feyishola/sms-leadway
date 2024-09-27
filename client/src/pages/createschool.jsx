import React, {  useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import arrowBack from "../assets/images/arrowBack-img.svg";
import createSchoolImg from "../assets/images/createSchool-img.jpg";


// Formik validation schema
const validationSchema = Yup.object({
  schoolName: Yup.string()
    .min(5, "School name must be at least 5 characters")
    .required("School name is required"),
  schoolType: Yup.string()
    .min(5, "School type must be at least 5 characters")
    .required("School type is required"),
  schoolAddress: Yup.string()
    .min(10, "Address must be at least 10 characters long")
    .required("School address is required"),
});

function CreateSchool() {
  const navigate = useNavigate();
 
//   const { addNewSchool } = useContext(SchoolContext);

  // Initial values for the form fields
  const initialValues = {
    schoolName: "",
    schoolType: "",
    schoolAddress: "",
  };

  const [formData, setFormData] = useState(initialValues)

//   const handleCreateSchoolSubmit = async (
//     values,
//     { setSubmitting, resetForm }
//   ) => {
//     try {
//       await addNewSchool({
//         schoolName: values.schoolName,
//         schoolType: values.schoolType,
//         schoolLocation: values.schoolAddress,
//         schoolLogo: "/src/assets/icons/school/schoolIcon.svg", // Default logo
//       });

//       navigate("/creating-school");
//       setSubmitting(false);
//       resetForm();

//       setTimeout(() => {
//         navigate("/school-created");

//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 3000);
//       }, 4000);
//     } catch (error) {
//       console.error("Error creating school:", error);
//       setSubmitting(false);
//     }
//   };

const handleCreateSchoolSubmit = (values, { setSubmitting, resetForm }) => {

  setFormData((prev)=>({...prev, values}))
  
  setSubmitting(false);
  resetForm();

  navigate("/creating-school");
  
    setTimeout(() => {
      navigate("/school-created");

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }, 4000);
};

  return (
    <div className="flex h-[100vh] flex-1 w-[100%]">
      {/* LEFT SIDE */}
      <div className="hidden sm:w-0 flex-1 w-[50%] lg:block relative">
        <img
          alt="create-school-img"
          src={createSchoolImg}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <Link to="/home" className="flex gap-2 absolute top-10 left-10">
          <img src={arrowBack} alt="back-arrow" />
          <p className="text-white">Back</p>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-[50%] flex flex-1 flex-col relative justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 max-w-[300px]">
            Create Your School
          </h2>

          <Formik
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleCreateSchoolSubmit}
          >
            {({ isSubmitting, resetForm }) => (
              <div className="mt-8">
                <Form className="space-y-6">
                  {/* School Name Field */}
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                      School Name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        placeholder="Enter School name"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="schoolName"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* School Type Field */}
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                      School Type
                    </label>
                    <div className="mt-1">
                      <Field
                        id="schoolType"
                        name="schoolType"
                        type="text"
                        placeholder="Enter School Type"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="schoolType"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* School Address Field */}
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900 text-left">
                      School Address
                    </label>
                    <div className="mt-1">
                      <Field
                        id="schoolAddress"
                        name="schoolAddress"
                        type="text"
                        placeholder="Enter School Address"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="schoolAddress"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex justify-end gap-5">
                    <button
                      type="button"
                      onClick={() => resetForm()}
                      className="btn bg-white p-2 px-5 text-[12px] font-semibold ring-1 ring-[#5243AA] text-[#5243AA] rounded"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-[#5243AA] p-2 px-5 text-[12px] rounded text-white font-semibold"
                    >
                      {isSubmitting ? "Submitting..." : "Create School"}
                    </button>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default CreateSchool;