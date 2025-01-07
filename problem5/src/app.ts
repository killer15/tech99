// src/app.ts
import { Request, Response } from 'express';
import * as express from "express";
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import "express-async-errors";
import errorHandler from './errorHandler';

dotenv.config();
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(errorHandler);

// Create a resource
app.post('/resources', async (req: Request, res: Response) => {
    const { name, details } = req.body;
    if (!name || !details){
        return res.status(422).json({ error: 'Name or details is missing' });
    }
    const resource = await prisma.resource.create({
        data: { name, details },
    });
    res.status(200).json(resource);
});

// List resources with basic filters
app.get('/resources', async (req: Request, res: Response) => {
    const { name, page, limit } = req.query;
    const whereQuery: {name?: any} = {};
    if (name){
        whereQuery['name'] = {
            contains: name
        }
    }
    const resources = await prisma.resource.findMany({
        where: whereQuery,
        skip: (Number(page) * Number(limit || 10) || 1)  - 1,
        take: Number(limit) || 10
    });
    res.json(resources);
});

// Get details of a resource
app.get('/resources/:id', async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    if (!id || Number.isNaN(id)){
        return res.status(422).json({ error: 'Resource not found' });
    }
    const resource = await prisma.resource.findUnique({
        where: { id: Number(id) },
    });
    if (!resource) {
        return res.status(422).json({ error: 'Resource not found' });
    }
    res.json(resource);
});

// Update resource details
app.put('/resources/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || Number.isNaN(id)){
        return res.status(422).json({ error: 'Resource not found' });
    }
    const resource = await prisma.resource.findUnique({
        where: { id: Number(id) },
    });
    if (!resource){
        return res.status(422).json({ error: 'Resource not found' });
    }
    const { name, details } = req.body;
    const updateData : {name?: string, details?: string} = {};
    if (name){
        updateData['name'] = name;
    }
    if (details){
        updateData['details'] = details;
    }
    if (!Object.keys(updateData).length){
        return res.status(422).json({ error: 'Resource not found' });
    }
    await prisma.resource.update({
        where: { id: Number(id) },
        data: { name, details },
    });
    res.json(resource);
});

// Delete a resource
app.delete('/resources/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id || Number.isNaN(id)){
        return res.status(422).json({ error: 'Resource not found' });
    }
    const resource = await prisma.resource.findUnique({
        where: { id: Number(id) },
    });
    if (!resource){
        return res.status(422).json({ error: 'Resource not found' });
    }
    await prisma.resource.delete({
        where: { id: Number(id) }
    });
    res.json({message: 'Resource is deleted successfully'});
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});