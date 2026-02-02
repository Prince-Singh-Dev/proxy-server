# Proxy Server

This project demonstrates how to connect a backend application to MongoDB Atlas using a proxy server.

The proxy acts as an intermediate layer between the client and MongoDB, helping in:

Managing secure connections
Hiding direct database credentials
Handling network restrictions (like IP whitelisting)
Centralizing database access logic

# Tech Stack

Node.js
Express.js
MongoDB Atlas

Proxy Network (HTTP)

# How It Works

Client -> Proxy Server → MongoDB Atlas

The client sends requests to the proxy server.

The proxy server forwards these requests to MongoDB Atlas.

MongoDB responds back through the proxy.

The proxy sends the response to the client.

This way, the client never directly connects to MongoDB Atlas.

# Environment Variables

Create a .env file in the root directory:

MONGODB_URI=your_mongodb_atlas_connection_string
PORT=10000
