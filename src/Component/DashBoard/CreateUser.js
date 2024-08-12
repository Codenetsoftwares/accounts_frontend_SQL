import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaUser, FaEnvelope } from "react-icons/fa";
import PasswordCU from "./PasswordCU";
import { CreateSubAdminSchema } from "../../Services/schema";
import SingleCard from "../../common/singleCard";
import AccountService from "../../Services/AccountService";
import { useAuth } from "../../Utils/Auth";
import { toast } from "react-toastify";

const CreateUser = () => {
  const auth = useAuth();

  // Check auth object for debugging
  console.log("Auth object:", auth);

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    roles: [],
  };

  const handleSubmit = (values, { resetForm }) => {
    AccountService.createuser(values, auth.user)
      .then((res) => {
        console.log("res", res);
        toast.success(res.data.message);
        resetForm(); // Reset the form after successful submission
      })
      .catch((err) => {
        console.log("error", err);
        toast.error(err?.response?.data?.errMessage);
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateSubAdminSchema}
      onSubmit={handleSubmit}
    >
      {({ values, handleChange, setFieldValue, errors, touched }) => (
        <Form>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="row justify-content-center">
                <SingleCard
                  className="mt-2"
                  style={{ backgroundColor: "#e6f7ff" }}
                >
                  <SingleCard
                    className="card shadow-lg p-3 mb-5 bg-white rounded"
                    style={{
                      boxShadow:
                        "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
                      borderRadius: "10px",
                      padding: "20px",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            <FaUser /> First name
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            placeholder="First name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="lastName" className="form-label">
                            <FaUser /> Last name
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            placeholder="Last name"
                          />
                          <ErrorMessage
                            name="lastName"
                            component="div"
                            className="text-danger"
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="userName" className="form-label">
                            <FaEnvelope /> User Name
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            placeholder="Enter UserName"
                          />
                          <ErrorMessage
                            name="userName"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="col-md-6">
                          <label htmlFor="password" className="form-label">
                            <FaEnvelope /> Password
                            <span className="text-danger">*</span>
                          </label>
                          <Field
                            type="text"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <SingleCard style={{ backgroundColor: "#e6f7ff" }}>
                          <div className="text-center">
                            <h5 style={{ fontWeight: "bold" }}>
                              <div className="badge-pill badge-secondary">
                                GRANTIFY
                              </div>
                            </h5>
                          </div>

                          <div className="row m-auto justify-content-between">
                            {[
                              "Dashboard-View",
                              "report-all-txn",
                              "report-my-txn",
                              "Create-Transaction",
                              "Bank-View",
                              "Create-User",
                              "Website-View",
                              "Introducer-Profile-View",
                              "RequestAdmin",
                              "RecycleBin-View",
                              "Transaction-Edit-Request",
                              "Transaction-Delete-Request",
                              "User-Profile-View",
                              "Profile-View",
                              "Create-Withdraw-Transaction",
                              "Create-Deposit-Transaction",
                              "Create-Introducer",
                            ].map((role) => (
                              <div
                                key={role}
                                className="col-md-4 col-sm-12 mb-0 text-nowrap d-flex g-1"
                                style={{ flexDirection: "column" }}
                              >
                                <div className="form-check form-switch">
                                  <Field
                                    type="checkbox"
                                    className="form-check-input"
                                    id={role}
                                    name="roles"
                                    value={role}
                                    checked={values.roles.includes(role)}
                                    onChange={(event) => {
                                      const { checked, value } = event.target;
                                      setFieldValue(
                                        "roles",
                                        checked
                                          ? [...values.roles, value]
                                          : values.roles.filter(
                                              (role) => role !== value
                                            )
                                      );
                                    }}
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor={role}
                                    style={{
                                      fontFamily: "'Abril Fatface', serif",
                                      fontWeight: "bold",
                                      color: "#708090",
                                    }}
                                  >
                                    {role.replace(/-/g, " ")}
                                  </label>
                                </div>
                              </div>
                            ))}
                          </div>
                        </SingleCard>
                        <ErrorMessage
                          name="roles"
                          component="div"
                          className="text-danger text-center"
                        />
                        <div className="">
                          <div className="row justify-content-center mt-2">
                            <div className="col-md-6 submit-button">
                              <button
                                type="submit"
                                className="btn btn-dark w-100 fw-bold"
                              >
                                Create Sub-Admin
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SingleCard>
                </SingleCard>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateUser;
