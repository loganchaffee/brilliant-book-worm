import express from 'express';
import mongoose from 'mongoose';
import Notification from '../models/notification.js';

export const fetchNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.userId, viewed: false }).populate('createdBy', 'name')

        res.status(200).json(notifications)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

export const markNotificationAsRead = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.body.id, { viewed: true })

        res.status(200).json({ message: 'success' })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}