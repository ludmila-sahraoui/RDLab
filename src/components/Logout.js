import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import BtnStyle1 from "./BtnStyleOne";
import BtnStyle2 from './BtnStyleTwo';
const LogoutPopup = ({onCancel, onLogout }) => {
    return (
        <div className="fixed inset-0 bg-purple-medium bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8  w-[50%] shadow-lg relative text-center">
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 left-4 "
                >
                    <TiDeleteOutline className="text-4xl text-purple-dark hover:bg-purple-medium  rounded-2xl" />
                </button>

                {/* Message */}
                <p className="text-xl font-semibold text-gray-800 mb-8 pt-4 pb-2 break-words text-center">
                    Do You Want To logout ?
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-20 pt-4 ">
                    <BtnStyle1
                        onClick={onCancel}
                        label={"Cancel"}
                    />
                    <BtnStyle2
                        onClick={onLogout}
                        label={"Logout"}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogoutPopup;
