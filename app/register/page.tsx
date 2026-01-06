import Link from 'next/link';
import LoginPage from '../login/page';

// Reuse login page but maybe change text slightly if desired, 
// for simplicity we point user to uses the same form as per the Login page design (buttons for both).
// Or we can just redirect /register to /login
export default function RegisterPage() {
    return (
        <LoginPage isRegister={true} />
    )
}
