import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the app
const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Example middleware (request logger)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Example route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the TypeScript Express App!");
});

// 404 Error Handling
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "An unexpected error occurred" });
});

export default app;
