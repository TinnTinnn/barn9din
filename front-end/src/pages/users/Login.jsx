import {useContext, useState} from "react";
import Alert from "../../Components/Alert.jsx";
import {loginUser} from "../../Controllers/userController.js";
import {UserContext} from "../../contexts/UserContext.jsx";
import {useNavigate} from "react-router-dom";


const Login = () => {

    // Use navigate hook
    const navigate = useNavigate();

    // Use user context
    const { setUser } = useContext(UserContext);

    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Login the user
            const data = await loginUser(email, password);
            console.log("Login Response:", data); // Check data from API

            // Receive Role and Email to localStorage
            localStorage.setItem("email",data.email);
            localStorage.setItem("role",data.role);

            // Update the user state with data from API
            setUser({
                email: data.email,
                role:data.role,
                books: data.books || []
            })


            // Navigate to dashboard
            if (data.role === "admin") {
                navigate('/dashboard');
            } else {
                navigate('/')
            }

            // when login success error will not show
            setError(null);
        } catch (error) {
            setError(error.message);
        }

        // console.log(email, password);
    };

    return <section className="card">
        <h1 className="title">Login to your account</h1>

        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email Address"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
            />
            <input
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn">Login</button>
        </form>

        {error && <Alert msg={error}/>}
    </section>
}

export default Login;