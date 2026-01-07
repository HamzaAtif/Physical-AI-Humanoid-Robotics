# ROS 2 Theory & Concepts

## Core Architecture

ROS 2 follows a distributed computing architecture where computation is broken down into discrete graph nodes that communicate with each other using topics, services, and actions.

### Nodes

A node is an executable that uses ROS 2 to communicate with other nodes. Nodes are designed to be modular, with each node typically responsible for a specific task or set of functions.

### Communication Patterns

#### Topics (Publish/Subscribe)
- Asynchronous, one-way communication
- Publishers send messages to topics
- Subscribers receive messages from topics
- Uses Data Distribution Service (DDS) as the middleware

#### Services (Request/Response)
- Synchronous, two-way communication
- Client sends a request to a service
- Service processes the request and sends back a response
- Useful for operations that require a specific result

#### Actions
- Goal-based communication pattern
- Used for long-running tasks with feedback
- Supports goal preemption and cancellation

### Packages

ROS 2 packages are the basic building blocks of ROS 2 software. A package contains:
- Source code (C++ and/or Python)
- Launch files
- Configuration files
- Documentation
- Dependencies

### Quality of Service (QoS)

QoS policies allow you to configure communication behavior based on your application's needs:
- **Reliability**: Best effort or reliable delivery
- **Durability**: Volatile or transient local durability
- **History**: Keep all or keep last messages
- **Deadline**: Maximum time between consecutive messages
- **Liveliness**: How to determine if a publisher is alive

## Middleware & DDS

ROS 2 uses Data Distribution Service (DDS) as its underlying middleware. DDS provides:
- Data-centric publish/subscribe
- Real-time performance
- Platform independence
- Language independence
- Built-in discovery mechanisms

## Lifecycle Management

ROS 2 provides lifecycle nodes that support state management:
- Unconfigured → Inactive → Active → Finalized
- Explicit state transitions
- Better resource management
- Improved system reliability

## Parameter Management

Parameters in ROS 2 are:
- Dynamic and reconfigurable at runtime
- Hierarchical naming
- Type-safe
- Can be declared with default values and constraints