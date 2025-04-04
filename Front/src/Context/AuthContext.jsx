import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status";
import server from "../environment";
export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`,
});

export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // Declare useNavigate once at the top

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password,
            });

            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (error) {
            throw error;
        }
    };

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password,
            });

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                navigate("/home"); // Use 'navigate' instead of 'router'
            }
        } catch (error) {
            throw error;
        }
    };

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin, // Include handleLogin in context
        addToUserHistory,
        getHistoryOfUser,
    };
    // This data object is passed to AuthContext.Provider, so that any component inside the provider can access these values & functions easily.

    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
