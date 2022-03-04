import express from 'express';
import mongoose from 'mongoose';
import Book from "../models/Book.js"

export const getBookExcerpt = async (req, res) => {
    try {
        const excerpt = `
            Buck did not read the newspapers, or he would have known that trouble
            was brewing, not alone for himself, but for every tide-water dog,
            strong of muscle and with warm, long hair, from Puget Sound to San
            Diego. Because men, groping in the Arctic darkness, had found a yellow
            metal, and because steamship and transportation companies were booming
            the find, thousands of men were rushing into the Northland. These men
            wanted dogs, and the dogs they wanted were heavy dogs, with strong
            muscles by which to toil, and furry coats to protect them from the
            frost.
            Buck lived at a big house in the sun-kissed Santa Clara Valley. Judge
            Miller's place, it was called. It stood back from the road, half hidden
            among the trees, through which glimpses could be caught of the wide
            cool veranda that ran around its four sides. The house was approached
            by gravelled driveways which wound about through wide-spreading lawns
            and under the interlacing boughs of tall poplars. At the rear things
            were on even a more spacious scale than at the front. There were great
            stables, where a dozen grooms and boys held forth, rows of vine-clad
            servants' cottages, an endless and orderly array of outhouses, long
            grape arbors, green pastures, orchards, and berry patches. Then there
            was the pumping plant for the artesian well, and the big cement tank
            where Judge Miller's boys took their morning plunge and kept cool in
            the hot afternoon.
        `
        const wordCount = excerpt.split(" ").length

        res.status(200).json(excerpt)
    } catch (error) {
        res.status(404).json(error)
    }
}
