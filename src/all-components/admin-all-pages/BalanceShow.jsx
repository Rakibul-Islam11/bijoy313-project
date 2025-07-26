import { useContext, useEffect, useState, useRef } from "react";
import { authContext } from "../auth-porvider-context/AuthContext";
import axios from "axios";

const BalanceShow = () => {
    const { user, loading } = useContext(authContext);

    const [balanceState, setBalanceState] = useState(null);

    // প্রথম‑বার লোডার দেখানোর জন্য:
    const initialLoad = useRef(true);

    useEffect(() => {
        if (!user?.uid || loading) return;

        // Reusable fetch fn
        const fetchBalance = async () => {
            try {
                const { data } = await axios.get(
                    `https://bijoy-server-nu.vercel.app/api/wallets/balance/${user.uid}`
                );

                if (data.success) {
                    setBalanceState(prev => {
                        // ⚡️ কেবল ভ্যালু বদলালে setState, নইলে আবার রেন্ডারই হবে না
                        if (
                            !prev ||
                            prev.balance !== data.balance ||
                            prev.totalBalance !== data.totalBalance
                        ) {
                            return { balance: data.balance, totalBalance: data.totalBalance };
                        }
                        return prev;
                    });
                }
            } catch (err) {
                console.error("Failed to fetch balance:", err);
            } finally {
                initialLoad.current = false;
            }
        };

        fetchBalance();


        const id = setInterval(fetchBalance, 1000);
        return () => clearInterval(id);
    }, [user?.uid, loading]);

    // প্রথমবার না পাওয়া পর্যন্ত শুধু একবারই স্পিনার
    if (loading || (initialLoad.current && !balanceState)) {
        return (
            <div className="flex justify-center items-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500" />
            </div>
        );
    }

    // fallback
    const balance = balanceState?.balance ?? 0;


    return (
        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg shadow-md">
            <h1 className="text-black mt-15">৳{balance.toFixed(2)}</h1>
        </div>
    );
};

export default BalanceShow;
