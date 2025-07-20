import { createContext, useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { authContext } from "../auth-porvider-context/AuthContext";

export const activeJobContext = createContext(null);

const ActiveJobProvider = ({ children }) => {
    const { user } = useContext(authContext);

    const [jobHistoryReport, setJobHistoryReport] = useState();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [totalBalance, setTotalBalance] = useState(0);
    const [balanceState, setBalanceState] = useState(null);
console.log(totalBalance);

    // প্রথম‑বার লোডার দেখানোর জন্য:
    const initialLoad = useRef(true);

    useEffect(() => {
        let interval;

        if (user?.uid) {
            // First fetch immediately
            const fetchJobHistory = () => {
                axios.get(`https://bijoy-server.vercel.app/api/active-jobs-reports/${user.uid}`)
                    .then(res => {
                        if (res.data.success) {
                            setJobHistoryReport(res.data.data);
                        }
                    })
                    .catch(err => {
                        console.error("Error fetching job history:", err);
                    });
            };

            fetchJobHistory(); // Initial call

            interval = setInterval(fetchJobHistory, 2000); // Fetch every 2 seconds
        }

        return () => clearInterval(interval); // Clean up interval on unmount
    }, [user?.uid]);

    //activee job ammount count 
    useEffect(() => {
        if (!user?.uid) return;

        const fetchJobs = async () => {
            try {
                const res = await axios.get(`https://bijoy-server.vercel.app/api/active-jobs-reports/${user.uid}`);
                if (res.data.success) {
                    setJobs(res.data.data);

                    // ✅ মোট ব্যালেন্স হিসাব করা
                    const total = res.data.data.reduce((sum, job) => sum + (parseFloat(job.balance) || 0), 0);
                    setTotalBalance(total);
                } else {
                    setError("Failed to load jobs");
                }
            } catch (err) {
                console.error("Error fetching jobs:", err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        // প্রথমবার ফেচ করা
        fetchJobs();

        // প্রতি 1 সেকেন্ড পর পর ফেচ করার জন্য ইন্টারভাল সেট করা
        const intervalId = setInterval(fetchJobs, 1000);

        // কম্পোনেন্ট আনমাউন্ট হলে ইন্টারভাল ক্লিয়ার করা
        return () => clearInterval(intervalId);
    }, [user?.uid]);
    //balance get
    useEffect(() => {
        if (!user?.uid || loading) return;

        // Reusable fetch fn
        const fetchBalance = async () => {
            try {
                const { data } = await axios.get(
                    `https://bijoy-server.vercel.app/api/wallets/balance/${user.uid}`
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
    // fallback
    const balance = balanceState?.balance ?? 0;
    

    const serveData = {
        jobHistoryReport,
        totalBalance, //active jobs tottal earn
        balance //all balance of user
    };
    return (
        <activeJobContext.Provider value={serveData}>

            {children}
        </activeJobContext.Provider>
    );
};

export default ActiveJobProvider;
