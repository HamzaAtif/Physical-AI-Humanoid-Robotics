/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1/index',
        'module-1/theory',
        'module-1/code-examples',
        'module-1/exercises'
      ],
    },
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2/index',
        'module-2/gazebo-basics',
        'module-2/unity-integration',
        'module-2/simulation-tutorials'
      ],
    },
    {
      type: 'category',
      label: 'Module 3: NVIDIA Isaac™ (Physical Intelligence)',
      items: [
        'module-3/index',
        'module-3/isaac-ros-overview',
        'module-3/hardware-integration'
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA) Models',
      items: [
        'module-4/index',
        'module-4/vla-models',
        'module-4/perception-systems',
        'module-4/capstone-project'
      ],
    },
  ],
};

module.exports = sidebars;