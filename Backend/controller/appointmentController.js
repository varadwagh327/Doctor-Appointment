import {catchAsyncError} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import {Appointment} from "../models/appointmentSchema.js";
import {User} from "../models/userSchema.js";

export const postAppointment = catchAsyncError(async(req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dob,
        nic,
        gender,
        appointment_date,
        department,
        doctor,
        address
    } = req.body;

    // Check if all required fields are provided
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !dob ||
        !nic ||
        !gender ||
        !appointment_date ||
        !department ||
        !doctor.firstName ||
        !doctor.lastName ||
        !address
    ) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    // Check if the doctor exists in the system
    const doctorData = await User.findOne({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        role: "Doctor",
        doctorDepartment: department,
    });

    if (!doctorData) {
        return next(new ErrorHandler("Doctor not found!", 404));
    }

   
    // Create the appointment
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        dob,
        nic,
        gender,
        appointment_date,
        department,
        doctor,
        address,
        doctorId: doctorData._id,
        patientId: req.user._id // Assuming the patient is the logged-in user
    });

    res.status(201).json({
        success: true,
        message: "Appointment Sent Successfully!",
        appointment,
    });
});

export const getAllAppointments = catchAsyncError(async(req, res, next) => {
    const appointments = await Appointment.find();
    res.status(200).json({
        success: true,
        appointments,
    });
});

export const updateAppointmentStatus = catchAsyncError(
    async (req, res, next) => {
        const{ id } = req.params;
        let appointment = await Appointment.findById(id);
        if(!appointment) {
            return next(new ErrorHandler("Appointment Not Found", 404));
        }
        appointment = await Appointment.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });
        res.status(200).json({
            success: true,
            message: "Appointment Status Updated!",
            appointment,
        });
    });

export const deleteAppointmentStatus = catchAsyncError(
        async (req, res, next) => {
            const{ id } = req.params;
            let appointment = await Appointment.findById(id);
            if(!appointment) {
                return next(new ErrorHandler("Appointment Not Found", 404));
            }
            await appointment.deleteOne();
            res.status(200).json({
                success: true,
                message: "Appointment Deleted!",
            });
    });