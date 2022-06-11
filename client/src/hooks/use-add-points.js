import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../actions/auth";
import { setPointsJustScored } from "../actions/pointsJustScored";

const useAddPoints = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth)

    const addPoints = (numberOfPoints) => {
        dispatch(updateUser({ points: user.points + numberOfPoints }))
        dispatch(setPointsJustScored(numberOfPoints))
        setTimeout(() => {
            dispatch(setPointsJustScored(0))
        }, 5000);
    }

    return addPoints
}

export default useAddPoints;