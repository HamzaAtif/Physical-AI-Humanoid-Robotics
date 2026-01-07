# ROS 2 Hands-on Exercises

## Exercise 1: Basic Publisher/Subscriber

### Objective
Create a simple publisher that publishes a counter value and a subscriber that logs the received values.

### Steps
1. Create a new ROS 2 package named `counter_demo`
2. Create a publisher node that publishes integer messages to a topic named `counter`
3. Create a subscriber node that subscribes to the `counter` topic and logs the received values
4. Create a launch file to run both nodes simultaneously
5. Test your implementation using `ros2 launch`

### Expected Output
- Publisher node should publish counter values every second
- Subscriber node should log the received counter values
- Both nodes should run simultaneously using the launch file

## Exercise 2: Custom Message Service

### Objective
Create a custom message type and a service that performs string manipulation.

### Steps
1. Define a custom message with a string field in a new package `custom_msgs`
2. Create a service definition that takes two strings and returns their concatenation
3. Implement a service server that concatenates the input strings
4. Implement a service client that calls the service with sample strings
5. Test the service using both your client and the command line tools

### Expected Output
- Custom message should be properly defined and built
- Service should successfully concatenate two input strings
- Client should receive and display the concatenated result

## Exercise 3: Parameter Server

### Objective
Implement a node that uses parameters to control its behavior.

### Steps
1. Create a node that publishes messages to a topic
2. Use parameters to control the publishing frequency and message content
3. Implement parameter validation and callbacks for parameter changes
4. Create a configuration file to set default parameter values
5. Test changing parameters at runtime using command line tools

### Expected Output
- Node should adjust behavior based on parameter values
- Parameters should be changeable at runtime
- Parameter changes should take effect immediately

## Exercise 4: Action Server

### Objective
Implement an action server for a simple navigation task.

### Steps
1. Define an action file for a navigation task (goal: target position, feedback: progress, result: success/failure)
2. Create an action server that simulates navigation to a target position
3. Create an action client that sends navigation goals
4. Implement feedback reporting during navigation
5. Test the action with different goal positions

### Expected Output
- Action server should accept navigation goals
- Client should receive feedback during navigation
- Navigation should complete with appropriate results

## Exercise 5: Multi-Node System

### Objective
Build a complete system with multiple interconnected nodes.

### Steps
1. Create a sensor node that publishes simulated sensor data
2. Create a processing node that subscribes to sensor data and performs calculations
3. Create an actuator node that receives commands and simulates actuator behavior
4. Use parameters to configure the system behavior
5. Create a launch file that starts the entire system
6. Add a monitoring node that logs system status

### Expected Output
- All nodes should communicate properly
- System should respond to parameter changes
- Launch file should start all nodes correctly
- Monitoring node should provide system status information