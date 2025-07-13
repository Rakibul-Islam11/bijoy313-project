import { getAuth, updateEmail, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from "firebase/auth";
import { useState } from "react";

const EditProfileForm = () => {
    const [newEmail, setNewEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [needsReauth, setNeedsReauth] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            // 1. চেক করুন ইমেইল ভেরিফাইড কিনা
            if (!user.emailVerified) {
                await sendEmailVerification(user);
                setError("ইমেইল ভেরিফাইড নয়! প্রথমে আপনার ইমেইল ভেরিফাই করুন। ভেরিফিকেশন লিংক পাঠানো হয়েছে।");
                return;
            }

            // 2. Reauthentication প্রয়োজন হলে (যদি ইউজার Recently Signed-In না থাকে)
            if (needsReauth) {
                const credential = EmailAuthProvider.credential(user.email, password);
                await reauthenticateWithCredential(user, credential);
                setNeedsReauth(false);
            }

            // 3. ইমেইল আপডেট করুন
            await updateEmail(user, newEmail);
            setSuccess(true);
            setNewEmail("");
        } catch (error) {
            if (error.code === "auth/requires-recent-login") {
                setNeedsReauth(true);
                setError("ইমেইল আপডেটের জন্য আপনার বর্তমান পাসওয়ার্ড দিন।");
            } else {
                setError(error.message);
            }
        }
    };

    return (
        <div className="text-black">
            <h2>ইমেইল পরিবর্তন করুন</h2>
            <form onSubmit={handleUpdateEmail}>
                <div>
                    <label>নতুন ইমেইল:</label>
                    <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Reauthentication ফিল্ড (প্রয়োজন হলে) */}
                {needsReauth && (
                    <div>
                        <label>বর্তমান পাসওয়ার্ড:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                )}

                <button type="submit">আপডেট করুন</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>ইমেইল সফলভাবে আপডেট হয়েছে!</p>}
        </div>
    );
};

export default EditProfileForm;