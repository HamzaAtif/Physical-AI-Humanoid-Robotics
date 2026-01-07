# Research: Physical AI & Humanoid Robotics Course Book

## Decision: Docusaurus Version and Theme
**Rationale**: Using Docusaurus v3+ with classic theme provides stable foundation with extensive plugin ecosystem and good MDX support for educational content.
**Alternatives considered**:
- Next.js with custom MDX solution (more complex setup)
- GitBook (less customization options)
- Hugo (different templating system)

## Decision: Content Organization Structure
**Rationale**: Organizing content in 4 main modules with sub-lessons follows the course structure outlined in the spec, making navigation intuitive for students.
**Alternatives considered**:
- Chronological organization by week (less thematic coherence)
- Topic-based clustering (might not follow course progression)

## Decision: Search Implementation
**Rationale**: Algolia DocSearch provides enterprise-grade search functionality that's free for open-source projects, with excellent performance and relevance.
**Alternatives considered**:
- Local search plugins (less sophisticated results)
- Custom search implementation (high development overhead)

## Decision: Custom Components for Educational Features
**Rationale**: Creating custom components for quizzes, exercises, and diagrams enables rich interactive learning experiences while maintaining consistency across the site.
**Alternatives considered**:
- Third-party embeds (less control, potential reliability issues)
- Plain MDX without interactivity (reduces educational value)

## Decision: Diagram Integration Approach
**Rationale**: Supporting multiple diagram formats (Mermaid, SVG, images) gives flexibility for different types of visualizations needed in robotics/ai content.
**Alternatives considered**:
- Single diagram tool only (limits visualization options)
- External diagram hosting (reliability concerns)

## Decision: Code Block Enhancements
**Rationale**: Using Docusaurus code block features with copy buttons, line highlighting, and language tabs improves the learning experience for code-heavy robotics content.
**Alternatives considered**:
- Standard Markdown code blocks (limited functionality)
- Custom code rendering (unnecessary complexity)

## Decision: Deployment Strategy
**Rationale**: GitHub Actions with GitHub Pages provides seamless CI/CD pipeline that meets the automatic deployment requirement with no additional infrastructure costs.
**Alternatives considered**:
- Netlify/Vercel deployments (would require additional account management)
- Self-hosted solution (higher maintenance overhead)