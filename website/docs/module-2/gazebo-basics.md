# Gazebo Simulation Basics

## Introduction to Gazebo

Gazebo is a robot simulation environment that provides realistic physics simulation, high-quality graphics, and convenient programmatic interfaces. It's widely used in the robotics community for testing algorithms, training robots, and performing experiments.

## Key Features

### Physics Simulation
- Accurate physics simulation using ODE, Bullet, or DART engines
- Realistic collision detection and response
- Joint constraints and dynamics
- Force and torque sensors

### Visualization
- High-quality 3D rendering
- Multiple viewports and cameras
- Realistic lighting and shadows
- Plugin support for custom visualizations

### Sensors
- Camera sensors (monocular, stereo, depth)
- LiDAR and other range finders
- IMU and other inertial sensors
- Force/torque sensors
- GPS and magnetometer

## Gazebo Architecture

### World Files
World files define the environment for simulation using SDF (Simulation Description Format):
- Models placement and properties
- Physics engine configuration
- Lighting and environment settings
- Plugins and controllers

### Model Files
Robot models are defined using URDF (Unified Robot Description Format) or SDF:
- Link definitions with geometry and material
- Joint definitions with limits and dynamics
- Inertial properties
- Visual and collision properties

### Plugins
Gazebo supports various types of plugins:
- Model plugins: Attach to specific models
- World plugins: Affect the entire simulation
- Sensor plugins: Process sensor data
- GUI plugins: Extend the user interface

## Working with Gazebo

### Launching Gazebo
```bash
# Launch Gazebo with an empty world
gazebo

# Launch Gazebo with a specific world file
gazebo my_world.world

# Launch with GUI disabled (for faster simulation)
gazebo -s libgazebo_ros_factory.so
```

### Basic Commands
- `Ctrl + Click`: Select objects
- `Shift + Click + Drag`: Move objects
- `Ctrl + Click + Drag`: Rotate objects
- `Right Click`: Context menu
- `F`: Focus on selected object

## SDF (Simulation Description Format)

SDF is an XML-based format for describing robots and environments:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="default">
    <include>
      <uri>model://ground_plane</uri>
    </include>
    <include>
      <uri>model://sun</uri>
    </include>

    <model name="my_robot">
      <pose>0 0 0.5 0 0 0</pose>
      <link name="chassis">
        <pose>0 0 0 0 0 0</pose>
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </visual>
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.166667</ixx>
            <ixy>0</ixy>
            <ixz>0</ixz>
            <iyy>0.166667</iyy>
            <iyz>0</iyz>
            <izz>0.166667</izz>
          </inertia>
        </inertial>
      </link>
    </model>
  </world>
</sdf>
```

## ROS 2 Integration

Gazebo integrates with ROS 2 through the `gazebo_ros` package:

### Common Topics
- `/clock`: Simulation time
- `/gazebo/model_states`: Model poses and velocities
- `/gazebo/link_states`: Link poses and velocities
- `/gazebo/set_model_state`: Set model state
- `/gazebo/set_link_state`: Set link state

### Common Services
- `/gazebo/pause_physics`: Pause physics simulation
- `/gazebo/unpause_physics`: Resume physics simulation
- `/gazebo/reset_simulation`: Reset entire simulation
- `/gazebo/reset_world`: Reset world state
- `/gazebo/get_model_state`: Get model state
- `/gazebo/set_model_state`: Set model state

## Creating Your First Simulation

### Step 1: Create a Simple Robot Model
Create a URDF file for your robot with basic geometry and joints.

### Step 2: Create a World File
Define the environment where your robot will operate.

### Step 3: Launch the Simulation
Use ROS 2 launch files to start Gazebo with your robot and world.

### Step 4: Control Your Robot
Use ROS 2 topics and services to control your robot in simulation.

## Best Practices

1. **Start Simple**: Begin with basic shapes before complex models
2. **Tune Physics**: Adjust physics parameters for stability
3. **Use Proper Inertias**: Calculate realistic inertial properties
4. **Validate in Simulation**: Test thoroughly before real hardware
5. **Monitor Performance**: Keep simulation running smoothly

## Troubleshooting Common Issues

### Simulation Instability
- Reduce solver iterations
- Increase physics update rate
- Check inertial properties
- Reduce joint limits

### Slow Performance
- Simplify collision geometry
- Reduce visual complexity
- Use faster physics engine
- Reduce update rates

### Model Penetration
- Increase collision margins
- Reduce time step
- Improve mesh quality
- Adjust solver parameters