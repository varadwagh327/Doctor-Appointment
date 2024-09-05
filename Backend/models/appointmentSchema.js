import mongoose from "mongoose";
import validator from "validator";

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Phone Number Must Contain Exact 10 Digits!"],
        maxLength: [10, "Phone Number Must Contain Exact 10 Digits!"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "NIC Must Contain Exact 13 Digits!"],
        maxLength: [13, "NIC Must Contain Exact 13 Digits!"]
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"],
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    appointment_date: {
        type: Date,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    doctor: {
        firstName: {
            type: String,
            required: true,
            minLength: [3, "Doctor's First Name Must Contain At Least 3 Characters!"]
        },
        lastName: {
            type: String,
            required: true,
            minLength: [3, "Doctor's Last Name Must Contain At Least 3 Characters!"]
        },
    },
    address: {
        type: String,
        required: true,
    },
    hasVisited: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Assuming the doctor is a user in your system
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Assuming the patient is a user in your system
    }
});

// Export the Appointment model
export const Appointment = mongoose.model("Appointment", appointmentSchema);
