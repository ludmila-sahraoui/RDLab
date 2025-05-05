import React from "react";
import { TiDeleteOutline } from "react-icons/ti";
import BtnStyle1 from "./BtnStyleOne";
import BtnStyle2 from './BtnStyleTwo';
const DeletePopup = ({ fileName, onClose, onDelete }) => {
    return (
        <div className="fixed inset-0 bg-purple-medium bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8  w-[50%] shadow-lg relative text-center">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 left-4 "
                >
                    <TiDeleteOutline className="text-4xl text-purple-dark hover:bg-purple-medium  rounded-2xl" />
                </button>

                {/* Message */}
                <p className="text-xl font-semibold text-gray-800 mb-8 pt-4 pb-2 break-words text-center">
                    Do You Want To Delete <span className="font-bold">“{fileName}”</span> From Your Documents?
                </p>


                {/* Buttons */}
                <div className="flex justify-center gap-20 pt-4 ">
                    <BtnStyle1
                        onClick={onClose}
                        label={"Go Back"}
                    />
                    <BtnStyle2
                        onClick={onDelete}
                        label={" Delete Document"}
                    />

                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
