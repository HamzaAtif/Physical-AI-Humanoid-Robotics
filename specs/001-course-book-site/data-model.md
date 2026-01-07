# Data Model: Physical AI & Humanoid Robotics Course Book

## Course Module
**Description**: Represents a major section of the course (Modules 1-4) with specific learning objectives, content, and exercises
**Fields**:
- id: string (unique identifier, e.g., "module-1", "module-2")
- title: string (display title of the module)
- description: string (brief overview of the module content)
- learningObjectives: string[] (list of specific learning objectives)
- lessons: Lesson[] (collection of lessons within the module)
- prerequisites: string[] (knowledge required before starting the module)
- estimatedDuration: string (estimated time to complete the module)
- capstoneRelated: boolean (whether this module connects to the capstone project)

**Relationships**: Contains multiple Lessons; referenced by Navigation System

## Lesson
**Description**: A subsection within a module that covers specific topics with theory, examples, and exercises
**Fields**:
- id: string (unique identifier within the module, e.g., "theory", "code-examples")
- moduleId: string (reference to parent module)
- title: string (display title of the lesson)
- content: string (MDX-formatted content)
- lessonType: enum (Theory | Practical | Exercise | Capstone)
- duration: string (estimated time to complete the lesson)
- prerequisites: string[] (knowledge required before this lesson)
- relatedLessons: string[] (IDs of related lessons in other modules)
- learningObjectives: string[] (specific objectives for this lesson)

**Relationships**: Belongs to a Course Module; contains Content Elements

## Content Element
**Description**: Individual pieces of educational content within lessons
**Fields**:
- id: string (unique identifier)
- lessonId: string (reference to parent lesson)
- elementType: enum (Text | CodeBlock | Diagram | Quiz | Exercise | Video | Image)
- content: string (the actual content in MDX format)
- caption: string (optional description/caption)
- difficulty: enum (Beginner | Intermediate | Advanced)
- tags: string[] (relevant topics/tags for search/filtering)

**Relationships**: Belongs to a Lesson; may reference other Content Elements

## Navigation Item
**Description**: Represents a link or menu item that allows users to navigate between different parts of the course
**Fields**:
- id: string (unique identifier)
- title: string (display text for the navigation item)
- path: string (relative path to the content)
- parentId: string (reference to parent navigation item, null for top-level)
- order: number (position in the navigation hierarchy)
- icon: string (optional icon identifier)
- visible: boolean (whether the item is visible in navigation)
- restricted: boolean (whether access is restricted)

**Relationships**: Hierarchical structure; links to Course Modules and Lessons

## Quiz Question
**Description**: Interactive assessment element within lessons to test understanding
**Fields**:
- id: string (unique identifier)
- lessonId: string (reference to parent lesson)
- question: string (the quiz question text)
- questionType: enum (MultipleChoice | TrueFalse | ShortAnswer | CodeExercise)
- options: string[] (for multiple choice questions)
- correctAnswer: string | string[] (the correct answer(s))
- explanation: string (explanation of the correct answer)
- difficulty: enum (Beginner | Intermediate | Advanced)
- hints: string[] (optional hints for the question)

**Relationships**: Belongs to a Lesson; may connect to other related questions

## User Progress
**Description**: Tracks individual student progress through the course
**Fields**:
- userId: string (identifier for the user)
- moduleId: string (reference to the module)
- lessonId: string (reference to the lesson)
- completed: boolean (whether the lesson is completed)
- lastAccessed: Date (timestamp of last interaction)
- quizScores: object (scores for quizzes in this lesson)
- timeSpent: number (time spent on this lesson in seconds)
- bookmarked: boolean (whether the user bookmarked this lesson)

**Relationships**: References Course Modules and Lessons; belongs to a User

## Site Configuration
**Description**: Global configuration settings for the course book site
**Fields**:
- siteTitle: string (main title of the site)
- siteDescription: string (meta description for SEO)
- themeConfig: object (configuration for colors, navbar, footer)
- searchEnabled: boolean (whether search functionality is active)
- darkModeEnabled: boolean (whether dark mode toggle is available)
- analyticsId: string (optional analytics tracking ID)
- socialLinks: object (links to social media/resources)
- copyright: string (copyright notice for the footer)

**Relationships**: Applied globally across the entire site