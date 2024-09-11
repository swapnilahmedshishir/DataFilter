import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MdOutlineArrowDownward } from "react-icons/md";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Country, State } from "country-state-city";
import { AppContext } from "../../../Dashbord/SmallComponent/AppContext";

import {
  Dialog,
  useTheme,
  useMediaQuery,
  DialogContentText,
  DialogTitle,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { BsExclamationCircle } from "react-icons/bs";

const ClientList = () => {
  const { state } = useContext(AppContext);
  // path
  const isHomePageRoute = location.pathname;
  const navigate = useNavigate();

  // state
  const [errorMessage, setErrorMessage] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataDeleteId, setDataDeleteId] = useState(null);
  const [faqToDelete, setFaqToDelete] = useState(null);

  // fetch data
  useEffect(() => {
    axios
      .get(`${state.port}/api/admin/clientlist`)
      .then((result) => {
        if (result.data.Status) {
          setClientList(result.data.Result);
        } else {
          setErrorMessage(result.data.Error);
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }, [state.port]);

  // matrial dialog box
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // dialog box open and close function
  const handleClickOpen = (id) => {
    setOpen(true);
    setDataDeleteId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // data delete and cancel function
  const handleCancel = () => {
    toast.error(`Cancel`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setOpen(false);
  };

  const handleDelete = () => {
    axios
      .delete(`${state.port}/api/admin/clientlist/delete/` + dataDeleteId)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/client");
          setFaqToDelete(`Deleted successfully`);
          toast.success(`Deleted successfully`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setFaqToDelete(result.data.Error);
        }
      })
      .catch((err) => setFaqToDelete(err.message));

    setOpen(false);
  };

  return (
    <div className="conatiner dashboard_All">
      <ToastContainer />
      <h5>{isHomePageRoute}</h5>
      <h1 className="dashboard_name">Client List</h1>
      <hr />
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div>
        <div>
          <Link to="/dashboard/client/create">
            <button className="button-62 mb-4" role="button">
              <span>New Client</span>
              <span>
                {" "}
                <HiPlus />
              </span>
            </button>
          </Link>

          <p className="success-message">{faqToDelete}</p>
        </div>
        <div className="dropdown">
          {/* <button className="dropbtn text-end">Select</button> */}
          <button
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-right"
            type="button"
          >
            Select
          </button>
          <div className="dropdown-content">
            <span className="actionBtn"> Edit</span>
            <span className="actionBtn"> SHOW</span>
            <span> DELETE</span>
          </div>
        </div>
        {/* ++++++========part 3 =======++++++++ */}
        <div>
          <div className="grid grid-cols-4 gap-5">
            {clientList.length > 0 ? (
              clientList.map(
                (cl, index) => (
                  console.log(cl),
                  (
                    <div
                      key={index}
                      className="allClinetDataShow p-3 rounded-lg"
                    >
                      <p className="text-center bg-[#0B6211] font-bold text-xl rounded-sm text-white">
                        {cl.unNameBn}
                      </p>
                      <div className="flex justify-between mx-4 mt-3">
                        <a
                          href={cl.unLinkOne}
                          target="_blank"
                          className="bg-purple-900 p-2 rounded-lg font-medium"
                        >
                          GOV Link
                        </a>
                        <a
                          href={cl.unLinkOne}
                          target="_blank"
                          className="bg-purple-900 px-5 py-2 rounded-lg font-medium"
                        >
                          Link-2
                        </a>
                      </div>

                      <div className="flex justify-between mt-7">
                        <Link
                          to={`/dashboard/client/edit/${cl.uuid}`}
                          className="routeLink bg-orange-400 p-2 rounded-lg font-medium"
                        >
                          <span className="actionBtn"> Edit</span>
                        </Link>

                        <Link
                          to={`/dashboard/client/${cl.uuid}`}
                          className="routeLink bg-green-400 p-2 text-black rounded-lg font-medium"
                        >
                          <span className="actionBtn "> SHOW</span>
                        </Link>

                        <span
                          onClick={() => handleClickOpen(cl.uuid)}
                          className="actionBtn  bg-rose-500 p-2 rounded-lg font-medium"
                        >
                          {" "}
                          DELETE
                        </span>

                        <Dialog
                          fullScreen={fullScreen}
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle
                            id="responsive-dialog-title "
                            className="icon_div"
                          >
                            <div style={{ textAlign: "center" }}>
                              <BsExclamationCircle className="icon" />
                              <h3 style={{ paddingTop: "20px" }}>
                                Are You sure?{" "}
                              </h3>
                            </div>
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Are you sure delete this client Info
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button
                              autoFocus
                              onClick={handleCancel}
                              style={{ color: "#E16565" }}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleDelete} autoFocus>
                              <Link
                                to={`/dashboard/client/delete`}
                                style={{
                                  color: "#E16565",
                                  textDecoration: "none",
                                }}
                              >
                                Yes, delete it!
                              </Link>
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </div>
                    </div>
                  )
                )
              )
            ) : (
              <p
                style={{
                  color: "#828BB2",
                  textAlign: "end",
                  paddingTop: "0.9rem",
                }}
              >
                No data available in table
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
