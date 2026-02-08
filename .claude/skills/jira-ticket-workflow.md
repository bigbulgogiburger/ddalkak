# jira-ticket-workflow Skill

**Evolved from**: Clustering 5 related instincts into a complete workflow skill

Automates the complete Jira ticket workflow with git branch management, DoD verification, and automated testing.

## When to Use

- Starting work on a Jira ticket
- Progressing through ticket implementation
- Verifying completion before merge
- Closing completed tickets

## Usage Patterns

### Pattern 1: Start New Ticket
```
User: "Starting work on DDALKAK-5"
AI:
  1. Extract ticket: DDALKAK-5
  2. Fetch latest master: git fetch && git pull master
  3. Suggest branch: DDALKAK-5/course-generation-form
  4. Create AND checkout branch: git checkout -b DDALKAK-5/course-generation-form
  5. Verify current branch with git branch
  6. Confirm ready to start with branch name visible
```

### Pattern 2: Regular Commits
```
User: "Added form component"
AI:
  1. Check current branch (must be DDALKAK-*/*)
  2. Run linting & format checks: npm run lint && npm run format:check
  3. Git add staged changes: git add .
  4. Suggest commit: "DDALKAK-5: feat: create course generation form"
  5. Commit with conventional format and proper message
  6. Verify commit in git log
  7. Push to remote (if origin configured)
  8. Confirm commit successful
```

### Pattern 3: DoD Verification
```
User: "Ready to merge"
AI:
  1. Display DoD checklist (4 sections)
  2. Ask to verify each item
  3. If frontend: Run Playwright tests
  4. If all pass: Approve merge
  5. If missing: List blockers
```

### Pattern 4: Merge to Master
```
User: "All tests pass, ready to merge"
AI:
  1. Verify all DoD items are checked
  2. Rebase on latest master: git rebase master
  3. Switch to master: git checkout master
  4. Merge feature branch: git merge DDALKAK-5/course-generation-form
  5. Delete feature branch: git branch -d DDALKAK-5/course-generation-form
  6. Show final git log to confirm merge
  7. Confirm merge successful
  8. Next: Update Jira ticket status to "완료" (Done)
```

### Pattern 5: Close Ticket
```
User: "Mark ticket as complete"
AI:
  1. Verify all DoD items checked
  2. Generate Jira comment with evidence
  3. Update Jira status to "완료"
  4. Confirm ticket closed
```

## Critical Rules

### ⚠️ BLOCKING RULES (Cannot proceed without)

1. **Start ticket MUST create AND checkout branch**
   - Command: `git checkout -b DDALKAK-{number}/{kebab-case}`
   - Verify with `git branch` (must show current branch)
   - Never just create without checking out
   - Example: ✅ Checked out to DDALKAK-21/docker-compose-local-dev

2. **Only merge after DoD completion**
   - All 4 sections must be verified
   - Frontend must have Playwright evidence
   - Cannot skip any items

3. **Never commit directly to master**
   - Always use DDALKAK-{number}/{description} branch
   - Reject direct master commits
   - Suggest feature branch instead

4. **Always rebase before merge**
   - Keep history clean and linear
   - Prevent merge commits
   - Stay in sync with latest master

5. **Frontend changes require Playwright**
   - Screenshots showing working feature
   - User interaction evidence
   - Responsive design testing
   - Error state testing

### ✅ STRONG RECOMMENDATIONS (Enforce by default)

- Use conventional commit types (feat, fix, refactor, etc.)
- Keep feature branches < 7 days old
- Delete branch after merge
- Add detailed Jira completion comments
- Reference commit hash in ticket

## Implementation Details

### Branch Naming
```
Pattern: DDALKAK-{number}/{kebab-case-description}
Examples:
  - DDALKAK-5/course-generation-form
  - DDALKAK-8/fix-mobile-responsive
  - DDALKAK-12/add-error-handling
```

### Commit Message Format
```
DDALKAK-{number}: {type} {description}

Optional body with context and details.

Types: feat, fix, refactor, docs, test, chore, perf, ci
```

### DoD Verification Checklist
```
1. Code Implementation ✓
   - Committed to git
   - Follows TypeScript standards
   - No console.log or debug code
   - ESLint: PASS
   - Prettier: PASS

2. Testing & Verification ✓
   - (Frontend) Playwright tests passed
   - (Backend) API calls tested
   - Error handling verified
   - Screenshots/videos captured

3. Documentation ✓
   - Code comments for complex logic
   - Types documented
   - API responses documented

4. Jira Updates ✓
   - DoD items checked in Jira
   - Completion comment added
   - Status: 완료 (Done)
```

## Key Instincts Clustered

1. **jira-branch-naming** (0.9) → Branch creation
2. **jira-commit-message-format** (0.9) → Commit format
3. **jira-dod-verification** (0.95) → DoD blocking
4. **git-master-push-only** (0.95) → Merge workflow
5. **playwright-required-for-frontend** (0.9) → Frontend testing

## Example Full Workflow

```
User: "Start DDALKAK-5: course generation form"
├─ AI: git fetch && git pull master (get latest)
├─ AI creates AND checks out: git checkout -b DDALKAK-5/course-generation-form
├─ AI verifies: git branch (shows * DDALKAK-5/course-generation-form)
├─ AI status: ✓ Ready to work on DDALKAK-5

User: "Added form inputs and validation"
├─ AI: npm run lint && npm run format:check
├─ AI: git add .
├─ AI suggests: "DDALKAK-5: feat: create course generation form"
├─ AI commits: git commit -m "DDALKAK-5: feat: create course generation form"
├─ AI verifies: git log -1
├─ AI status: ✓ Committed (skipping push - no remote)

User: "Complete, ready to test"
├─ AI: Detects frontend changes
├─ AI: Starts Playwright browser
├─ AI tests: Form rendering, inputs, validation, responsive design
├─ AI captures: Screenshots of working feature
├─ AI verifies: All DoD items in checklist (4/4 ✓)

User: "All tests pass, merge to master"
├─ AI: git checkout master
├─ AI: git merge DDALKAK-5/course-generation-form
├─ AI: git branch -d DDALKAK-5/course-generation-form
├─ AI verifies: git log (shows merge commit)
├─ AI status: ✓ Merged to master

User: "Update Jira ticket"
├─ AI: Adds completion comment to Jira
├─ AI: Updates ticket status to: 완료 (Done)
├─ AI: References commit hash and test evidence
├─ AI status: ✓ Ticket closed (DDALKAK-5)
```

## Related Resources

- CLAUDE.md: Git Workflow for Jira Tickets section
- DoD Checklist: Critical Development Requirements
- Playwright MCP: Frontend testing tools

## Confidence Score

**Overall: 0.92** (High confidence)

- jira-branch-naming: 0.9
- jira-commit-message-format: 0.9
- jira-dod-verification: 0.95
- git-master-push-only: 0.95
- playwright-required-for-frontend: 0.9

---

*This skill represents learned project patterns from the ddalkak-date development workflow.*
