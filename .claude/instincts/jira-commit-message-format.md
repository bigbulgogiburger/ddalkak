---
id: jira-commit-message-format
trigger: "when committing changes to a feature branch"
confidence: 0.9
domain: "git-workflow"
source: "session-observation"
created: "2026-02-08"
---

# Always Format Commits with Ticket ID and Conventional Types

## Action
Use structured commit messages that reference Jira ticket and follow conventional commits.

## Pattern
```
DDALKAK-{number}: {type} {description}

{optional body for detailed explanation}
```

## Commit Types
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code reorganization (no behavior change)
- `docs:` Documentation updates
- `test:` Test additions/updates
- `chore:` Build process, dependencies, etc.

## Examples
```
DDALKAK-5: feat: create course generation form

Added a 3-step form component for course generation with:
- Region selection dropdown
- Date type selection
- Budget slider (50K-300K KRW)

DDALKAK-8: fix: responsive design on mobile

Fixed layout issues on devices < 768px width

DDALKAK-12: refactor: extract course card component

Moved CourseCard into separate reusable component
```

## Evidence
- Defined in CLAUDE.md Git Workflow section
- Enables ticket-to-commit traceability
- Makes git log searchable by ticket
- Clear type prefix helps with changelog generation

## Implementation
When user commits code on feature branch:
1. Remind to use DDALKAK-{number} prefix
2. Suggest appropriate type (infer from changes)
3. Help craft descriptive message
4. Optionally add body with context

## Related Instincts
- `jira-branch-naming`
- `git-master-push-only`
