import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";
import { IoStarSharp } from "react-icons/io5";
import { Editor } from "@tinymce/tinymce-react";

const CreateClinetList = () => {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazillas, setUpazillas] = useState([]);
  const [error, setError] = useState(null);

  // Fetch divisions from API using fetch
  const fetchDivisions = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setDivisions(data.data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const endPoint = "https://bdapis.com/api/v1.2/divisions";
    fetchDivisions(endPoint);
  }, []);

  // Fetch districts based on selected division using fetch
  const handleDivisionChange = async (divisionName) => {
    try {
      const res = await fetch(
        `https://bdapis.com/api/v1.2/division/${divisionName}`
      );
      const data = await res.json();
      setDistricts(data.data);
      setUpazillas([]); // Clear upazillas when division changes
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch upazillas based on selected district using fetch
  const handleDistrictChange = async (districtName) => {
    try {
      const res = await fetch(
        `https://bdapis.com/api/v1.2/district/${districtName}`
      );
      const data = await res.json();
      setUpazillas(data.data.upazilla); // Assuming 'upazilla' is an array
    } catch (error) {
      setError(error.message);
    }
  };

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      clientName: "",
      clientmobile: "",
      clientemail: "",
      division: "",
      district: "",
      upazilla: "",
      clientAddress: "",
      note: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          `${state.port}/api/admin/clientlist/create`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          }
        );
        const result = await response.json();
        if (result.Status) {
          setErrorMessage(null);
          toast.success(`Client created successfully`, {
            position: "top-right",
            autoClose: 5000,
          });
          setTimeout(() => {
            navigate("/dashboard/client");
          }, 1500);
        }
      } catch (error) {
        setErrorMessage(`Error: ${error}`);
      }
      resetForm();
    },
  });

  return (
    <div className="container dashboard_All">
      <ToastContainer />
      <h1 className="dashboard_name">Create Client</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="form_div">
        <form onSubmit={formik.handleSubmit} className="p-2">
          <div className="grid grid-cols-6 gap-7">
            {/* Division */}
            <div className="col-span-2 inputfield">
              <label htmlFor="division">Division</label>
              <select
                name="division"
                id="division"
                className="text_input_field"
                value={formik.values.division}
                onChange={(e) => {
                  formik.setFieldValue("division", e.target.value);
                  handleDivisionChange(e.target.value);
                }}
              >
                <option value="">Choose Division</option>
                {divisions.map((dv) => (
                  <option key={dv.division} value={dv.division}>
                    {dv.division}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div className="col-span-2 inputfield">
              <label htmlFor="district">District</label>
              <select
                name="district"
                id="district"
                className="text_input_field"
                value={formik.values.district}
                onChange={(e) => {
                  formik.setFieldValue("district", e.target.value);
                  handleDistrictChange(e.target.value);
                }}
              >
                <option value="">Choose District</option>
                {districts.map((dist) => (
                  <option key={dist.district} value={dist.district}>
                    {dist.district}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazilla */}
            <div className="col-span-2 inputfield">
              <label htmlFor="upazilla">Upazilla</label>
              <select
                name="upazilla"
                id="upazilla"
                className="text_input_field"
                value={formik.values.upazilla}
                onChange={formik.handleChange}
              >
                <option value="">Choose Upazilla</option>
                {upazillas.map((upa) => (
                  <option key={upa} value={upa}>
                    {upa}
                  </option>
                ))}
              </select>
            </div>

            {/* up Name  english*/}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientAddress">union name english</label>
              <input
                className="text_input_field"
                type="text"
                name="clientAddress"
                onChange={formik.handleChange}
                placeholder="Client Address"
                value={formik.values.clientAddress}
              />
            </div>

            {/* up Name  bangla*/}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientAddress">union name bangla</label>
              <input
                className="text_input_field"
                type="text"
                name="clientAddress"
                onChange={formik.handleChange}
                placeholder="Client Address"
                value={formik.values.clientAddress}
              />
            </div>

            {/* up linke1 */}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientemail">union link 1 </label>
              <input
                className="text_input_field"
                type="text"
                name="clientemail"
                onChange={formik.handleChange}
                placeholder="Client Email"
                value={formik.values.clientemail}
              />
            </div>
            {/* up linke2 */}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientemail">union link 2 </label>
              <input
                className="text_input_field"
                type="text"
                name="clientemail"
                onChange={formik.handleChange}
                placeholder="Client Email"
                value={formik.values.clientemail}
              />
            </div>

            {/* up secretary(সচিব) Name  */}
            <div className="inputfield col-span-3">
              <label htmlFor="clientName">
                Union secretary name
                <IoStarSharp className="reqired_symbole" />
              </label>
              <input
                className="text_input_field"
                type="text"
                name="clientName"
                onChange={formik.handleChange}
                placeholder="Client Name"
                value={formik.values.clientName}
                required
              />
            </div>
            {/* up secretary contact Number  */}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientmobile">contact Number</label>
              <input
                className="text_input_field"
                type="text"
                name="clientmobile"
                onChange={formik.handleChange}
                placeholder="Clinet Mobile"
                value={formik.values.clientmobile}
              />
            </div>
            {/* up secretary Email Address  */}
            <div className="col-span-3 inputfield">
              <label htmlFor="clientemail">email address</label>
              <input
                className="text_input_field"
                type="text"
                name="clientemail"
                onChange={formik.handleChange}
                placeholder="Client Email"
                value={formik.values.clientemail}
              />
            </div>

            {/* up secretary gender */}
            <div className="col-span-3 inputfield">
              <label htmlFor="gender">gender</label>

              <select
                name="gender"
                id="gender"
                className="text_input_field"
                aria-label="Default select example"
                value={formik.values.gender}
                onChange={(e) => formik.setFieldValue("gender", e.target.value)}
                required
              >
                <option value="male" selected>
                  Male
                </option>
                <option value="female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* union info note */}
            <div className="col-span-6 inputfield">
              <h5 className="text-xl font-extrabold">union info note </h5>
              <Editor
                id="note"
                apiKey="heppko8q7wimjwb1q87ctvcpcpmwm5nckxpo4s28mnn2dgkb"
                textareaName="note"
                initialValue="Get Start ..."
                onEditorChange={(content) => {
                  formik.setFieldValue("note", content);
                }}
                init={{
                  height: 350,
                  menubar: false,
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo |fullscreen blocks|" +
                    "bold italic forecolor fontsize |code link image preview| alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | table | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size: 1rem;  color: #3f3e3e; }",
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="col-span-6 inputFiledMiddel">
              <button
                type="submit"
                className="button-62 cetificate_image_AddBtn"
              >
                ADD Client
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClinetList;
