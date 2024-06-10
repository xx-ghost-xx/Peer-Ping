// Importing the required modules
import { errorHandler } from "./errorHandler.js";

// Custom validation for user registration
export const validateUserRegistration = (data) => {
    // Destructuring the incoming data
    const { fullName, userName, email, password, confirmPassword, gender } = data;

    // Validating user full name
    if( !fullName || fullName === "" ) {
        throw errorHandler(400, "Fullname is required.");
    }
    // Validating username
    if( !userName || userName === "" ){
        throw errorHandler(400, "Username is required.");
    }
    // Validating the user email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email === "" || !emailRegex.test(email)) {
        throw errorHandler(400, "A valid email is required");
    }
    // Validating the user gender
    if ( !gender || gender === "" ) {
        throw errorHandler(400, "Gender is required");
    }
    // Validating user Passwords
    if( !password || password === "" || !confirmPassword || confirmPassword === "" ){
        throw errorHandler(400, "Passowrds must be atleast 8 characters or more.");
    }
    // Validating the both passwords
    if ( password !== confirmPassword ){
        throw errorHandler(400, "Both passwords must be exactly same.");
    }
};

// Custom validation for user login
export const validateUserLogin = (data) => {
    // Destructuring the incoming data
    const { userName, password } = data;
    // Validating username
    if( !userName || userName === "" ){
        throw errorHandler(400, "Username is required.");
    }
    // Validating user Password
    if( !password || password === "" ){
        throw errorHandler(400, "Passowrds must be atleast 8 characters or more.");
    }
};
