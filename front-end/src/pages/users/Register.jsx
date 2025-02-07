import Alert from "../../Components/Alert.jsx";
import {useContext, useState} from "react";
import {registerUser} from "../../Controllers/userController.js";
import {UserContext} from "../../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";

const Register = () => {

    // Use navigate hook
    const navigate = useNavigate();

    //  User user context
    const { setUser } = useContext(UserContext);

    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        role: '',
    });


    // Handle Register
    const handleRegister = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            // Register the user
            await registerUser(
                formData.email,
                formData.password,
                formData.passwordConfirm,
                formData.role
            );
            // Update the user state
            setUser({ email: formData.email, role: formData.role, books: [] });
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        }

        console.log(formData);
    };

    return <section className="card">
        <h1 className="title">Create a new account</h1>

        <form onSubmit={handleRegister}>
            <input
                type="email"
                placeholder="Email Address"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                autoFocus
            />
            <input
                type="password"
                placeholder="Password"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="input"
                value={formData.passwordConfirm}
                onChange={(e) => setFormData({...formData, passwordConfirm: e.target.value})}
            />
            <select
            className="input"
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button className="btn">Register</button>
        </form>

        {error && <Alert msg={error}/>}
    </section>

}

export default Register;