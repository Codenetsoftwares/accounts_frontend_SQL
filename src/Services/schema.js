import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const CreateDepositTransactionSchema = Yup.object({
  transactionID: Yup.string().required("Transaction ID is required"),
  amount: Yup.number()
    .positive("Amount must be a positive number")
    .required("Amount is required"),
  paymentMethod: Yup.string()
    .oneOf(["UPI", "IMPS", "RTGS", "NEFT"], "Invalid Payment Method")
    .required("Payment Method is required"),
  userName: Yup.string().required("User Name is required"),
  bankName: Yup.string().required("Bank Name is required"),
  websiteName: Yup.string().required("Website Name is required"),
  transactionType: Yup.string()
    .oneOf(["Deposit", "Withdrawal"], "Invalid Transaction Type")
    .required("Transaction Type is required"),
  bonus: Yup.number().moreThan(-1, "Amount must be zero or  a positive number"),
  remarks: Yup.string().required("Remarks are required"),
});

export const CreateWithDrawTransactionSchema = Yup.object({
  transactionID: Yup.string().required("Transaction ID is required"),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be a positive number"),
  paymentMethod: Yup.string()
    .oneOf(["UPI", "IMPS", "RTGS", "NEFT"], "Invalid Transaction Type")
    .required("Payment Method is required"),
  userName: Yup.string().required("User Name is required"),
  bankName: Yup.string().required("Bank Name is required"),
  websiteName: Yup.string().required("Website Name is required"),
  transactionType: Yup.string()
    .oneOf(["Deposit", "Withdraw"], "Invalid Transaction Type")
    .required("Transaction Type is required"),
  bankCharges: Yup.number().min(0, "bankCharges must be a positive number"),
  remarks: Yup.string().required("Remarks are required"),
});

export const CreateIntroducerSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(10, "First Name must not exceed 10 characters")
    .required("First Name is required"),
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(10, "Last Name must not exceed 10 characters")
    .required("Last Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const CreateUserSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First Name must be at least 2 characters")
    .max(10, "First Name must not exceed 10 characters")
    .matches(/^[A-Za-z]+$/, "First Name must only contain alphabetic characters")
    .required("First Name is required"),
  userName: Yup.string()
    .min(2, "Username must be at least 2 characters")
    .max(25, "Username must not exceed 25 characters")
    .required("Username is required"),
  lastName: Yup.string()
    .min(2, "Last Name must be at least 2 characters")
    .max(10, "Last Name must not exceed 10 characters")
    .matches(/^[A-Za-z]+$/, "Last Name must only contain alphabetic characters")
    .required("Last Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  contactNumber: Yup.string()
    .min(10, "Contact Number must be at least 10 characters")
    .max(10, "Contact Number must be at most 10 characters")
    .required("Contact Number is required"),
  introducersUserName: Yup.string(),
  introducerPercentage: Yup.string(),
  introducersUserName1: Yup.string(),
  introducersUserName2: Yup.string(),
  confirmPassword: Yup.string()
    .min(6, "Confirm Password must be at least 6 characters")
    .required("Confirm Password is required"),
});

export const CreateSubAdminSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name must be at least 2 characters")
    .max(50, "First Name must be at most 50 characters"),

  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name must be at least 2 characters")
    .max(50, "Last Name must be at most 50 characters"),

  userName: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),

  roles: Yup.array()
    .of(Yup.string().required("Role is required"))
    .min(1, "At least one role is required"),
});
