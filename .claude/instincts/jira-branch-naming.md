---
id: jira-branch-naming
trigger: "when starting work on a Jira ticket"
confidence: 0.9
domain: "git-workflow"
source: "session-observation"
created: "2026-02-08"
---

# Always Use Jira-Based Branch Naming

## Action
Create feature branches using the Jira ticket ID in kebab-case format.

## Pattern
```
{TICKET-KEY}/{description-in-kebab-case}

Examples:
- DDALKAK-1/setup-project
- DDALKAK-5/course-generation-form
- DDALKAK-12/fix-responsive-design
```

## Evidence
- Observed in CLAUDE.md Git Workflow section
- Ensures clear ticket traceability
- Prevents orphaned branches
- Makes commit history searchable by ticket
- Follows Atlassian best practices

## Implementation
When user mentions starting work on a Jira ticket:
1. Extract ticket ID (e.g., DDALKAK-5)
2. Suggest descriptive branch name (kebab-case, max 50 chars)
3. Create branch: `git checkout -b {TICKET-ID}/{description}`
4. Confirm branch creation

## Related Instincts
- `jira-commit-message-format`
- `git-master-push-only`
- `jira-dod-verification`
