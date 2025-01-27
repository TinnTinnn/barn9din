import {useState} from "react";
import Alert from "../../Components/Alert.jsx";

const Login = () => {

    // Error state
    const [error, setError] = useState(null);

    // Form data state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handle login
    const handleLogin = (e) => {
        e.preventDefault();
        console.log(email, password);
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

        {error && <Alert smg={error}/>}
    </section>
}

export default Login;