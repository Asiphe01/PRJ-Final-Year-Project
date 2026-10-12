import { useState } from 'react';

function RegisterPage() {
const Register = () => {
    // Form State
    const [role, setRole] = useState('athlete');
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [password, setPassword] = useState('');

    // Error and Feedback State
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Input Validation Function
    const validateForm = () => {
        const newErrors = {};

        // Full Name Validation
        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required.';
        } else if (fullName.trim().split(' ').length < 2) {
            newErrors.fullName = 'Please enter both first and last name.';
        }

        // Gender Validation
        if (!gender) {
            newErrors.gender = 'Please select a gender.';
        }

        // Age Validation
        const parsedAge = Number(age);
        if (!age) {
            newErrors.age = 'Age is required.';
        } else if (isNaN(parsedAge) || parsedAge < 5 || parsedAge > 120) {
            newErrors.age = 'Please enter a valid age between 5 and 120.';
        }

        // Height Validation (in cm)
        const parsedHeight = Number(height);
        if (!height) {
            newErrors.height = 'Height is required.';
        } else if (isNaN(parsedHeight) || parsedHeight < 50 || parsedHeight > 250) {
            newErrors.height = 'Please enter a valid height in cm (50 - 250).';
        }

        // Password Validation (at least 8 chars, 1 uppercase, 1 number)
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (!passwordRegex.test(password)) {
            newErrors.password = 'Password must be at least 8 characters long, contain 1 uppercase letter, and 1 number.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');

        if (validateForm()) {
            const userData = {
                role,
                fullName,
                gender,
                age: Number(age),
                height: Number(height),
                password
            };

            console.log('Submitting registration data:', userData);
            setSuccessMessage(`Successfully registered as a ${role.toUpperCase()}!`);
            
            // TODO: Send data to your backend API endpoint here
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <h2>Create Your Account</h2>
                <p className="subtitle">Join our sports portal as an Athlete or Coach</p>

                {successMessage && <div className="success-banner">{successMessage}</div>}

                {/* Role Selection Tabs */}
                <div className="role-selector">
                    <button 
                        type="button"
                        className={`role-tab ${role === 'athlete' ? 'active' : ''}`}
                        onClick={() => setRole('athlete')}
                    >
                        Athlete Registration
                    </button>
                    <button 
                        type="button"
                        className={`role-tab ${role === 'coach' ? 'active' : ''}`}
                        onClick={() => setRole('coach')}
                    >
                        Coach Registration
                    </button>
                </div>

                {/* Full Name */}
                <div className="input-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input 
                        type="text" 
                        id="fullName" 
                        placeholder="e.g. Sarah Jenkins" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <span className="error-text">{errors.fullName}</span>}
                </div>

                {/* Gender Selection */}
                <div className="input-group">
                    <label htmlFor="gender">Gender</label>
                    <select 
                        id="gender" 
                        value={gender} 
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">Select Gender...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other / Prefer not to say</option>
                    </select>
                    {errors.gender && <span className="error-text">{errors.gender}</span>}
                </div>

                {/* Age & Height Grid */}
                <div className="form-row">
                    <div className="input-group">
                        <label htmlFor="age">Age (years)</label>
                        <input 
                            type="number" 
                            id="age" 
                            placeholder="e.g. 24" 
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                        {errors.age && <span className="error-text">{errors.age}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="height">Height (cm)</label>
                        <input 
                            type="number" 
                            id="height" 
                            placeholder="e.g. 175" 
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        {errors.height && <span className="error-text">{errors.height}</span>}
                    </div>
                </div>

                {/* Password */}
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="At least 8 chars, 1 uppercase, 1 number" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="register-btn">
                    Register as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
            </form>
        </div>
    );
}
};

export default RegisterPage;