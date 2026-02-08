# /jira-ticket Command

Quick-access command for Jira ticket workflow automation.

## Syntax

```
/jira-ticket {action} {TICKET-ID} [description]
```

## Actions

### 1. start
Start work on a new Jira ticket.

```
/jira-ticket start DDALKAK-5
/jira-ticket start DDALKAK-5 course-generation-form
```

**What it does:**
- Extracts ticket ID (DDALKAK-5)
- Suggests kebab-case branch name
- Creates feature branch from latest master
- Confirms ready to start coding

**Output:**
```
✓ Switched to new branch: DDALKAK-5/course-generation-form
✓ Branch created from latest master
✓ Ready to start work!


Next steps:
1. Make your changes
2. Commit with: /jira-ticket commit "your description"
3. When done: /jira-ticket verify
```

---

### 2. commit
Create a commit with proper formatting.

```
/jira-ticket commit "add form validation"
/jira-ticket commit "feat: add form validation"
```

**What it does:**
- Detects current branch (DDALKAK-5/...)
- Extracts ticket ID
- Formats commit: `DDALKAK-5: feat: add form validation`
- Runs linting & formatting checks
- Creates commit
- Pushes to remote

**Output:**
```
✓ ESLint: PASS
✓ Prettier: PASS
✓ Commit: DDALKAK-5: feat: add form validation
✓ Pushed to remote

Branch: DDALKAK-5/course-generation-form
Status: Ready for next work
```

---

### 3. verify
Verify Definition of Done checklist.

```
/jira-ticket verify
```

**What it does:**
- Displays DoD checklist (4 sections)
- Asks to verify each item
- If frontend changes detected: Run Playwright tests
- Captures evidence (screenshots/snapshots)
- Confirms all items complete
- Asks: Ready to merge?

**Output:**
```
╔════════════════════════════════════════════════════════╗
║          DEFINITION OF DONE VERIFICATION              ║
╚════════════════════════════════════════════════════════╝

✓ Section 1: Code Implementation
  ✓ Committed to git
  ✓ ESLint: PASS
  ✓ Prettier: PASS
  ✓ No console.log or debug code

✓ Section 2: Testing & Verification
  Frontend detected: Running Playwright tests...
  ✓ Component rendering test: PASS
  ✓ User interaction test: PASS
  ✓ Responsive design test: PASS
  ✓ Screenshot captured

✓ Section 3: Documentation
  ✓ Code comments added
  ✓ Types documented

✓ Section 4: Jira Updates
  ✓ Ready to check items in Jira

═══════════════════════════════════════════════════════
All DoD items verified! ✓
Ready to merge to master.
```

---

### 4. merge
Merge feature branch to master.

```
/jira-ticket merge
```

**What it does:**
- Verifies DoD is complete (blocks if not)
- Rebases on latest master
- Merges to master
- Pushes to remote
- Deletes feature branch
- Reminds: Update Jira ticket status

**Output:**
```
✓ DoD verification: PASS
✓ Rebasing on origin/master...
✓ Merge successful to master
✓ Pushed to remote
✓ Deleted feature branch: DDALKAK-5/course-generation-form

═══════════════════════════════════════════════════════
Merge complete! ✓

Next: Update Jira ticket
  1. Add completion comment with test evidence
  2. Transition status to "완료" (Done)

Example Jira comment:
  ## ✅ DDALKAK-5 Complete

  Code merged to master (commit: {hash})
  All tests passing, DoD verified.
```

---

### 5. close
Close the Jira ticket.

```
/jira-ticket close DDALKAK-5
```

**What it does:**
- Verifies code is merged to master
- Generates Jira completion comment
- Suggests test evidence to include
- Opens Jira ticket for status update
- Confirms ticket transitioned to "완료"

**Output:**
```
✓ Verified: Code merged to master
✓ Generated Jira comment:

  ## ✅ DDALKAK-5 Complete - All DoD Items Verified

  ### Code Implementation
  - ✅ Code merged to master (abc1234)
  - ✅ ESLint: PASS
  - ✅ Prettier: PASS

  ### Testing Verification (Playwright)
  - ✅ Component renders correctly
  - ✅ User interactions work
  - ✅ Mobile responsive (375px)
  - ✅ Screenshot: [attached]

  ### DoD Verification
  - ✅ All sections complete

Ready to:
  1. Paste comment to Jira
  2. Check all DoD items
  3. Transition to "완료" (Done)
```

---

### 6. status
Show current ticket workflow status.

```
/jira-ticket status
/jira-ticket status DDALKAK-5
```

**What it does:**
- Detects current branch (or accepts ticket ID)
- Shows branch name
- Checks commit log since master
- Shows uncommitted changes
- Suggests next action

**Output:**
```
╔════════════════════════════════════════════════════════╗
║           JIRA TICKET WORKFLOW STATUS                 ║
╚════════════════════════════════════════════════════════╝

Ticket: DDALKAK-5
Branch: DDALKAK-5/course-generation-form
Status: In Progress

Commits since master: 3
  • DDALKAK-5: feat: create form component
  • DDALKAK-5: feat: add validation
  • DDALKAK-5: fix: input styling

Uncommitted changes: 2 files
  • src/components/CourseForm.tsx
  • src/styles/form.css

═══════════════════════════════════════════════════════
Next: Commit your changes
  /jira-ticket commit "description"
```

---

## Examples

### Complete Workflow Example

```bash
# Start new ticket
/jira-ticket start DDALKAK-5 course-generation-form

# Make changes, then commit
/jira-ticket commit "create form component"
/jira-ticket commit "add validation logic"

# Check status
/jira-ticket status

# Verify everything is done
/jira-ticket verify

# Merge to master
/jira-ticket merge

# Close in Jira
/jira-ticket close DDALKAK-5
```

### Backend API Example

```bash
# Start ticket
/jira-ticket start DDALKAK-8 api-course-endpoint

# Implement API
/jira-ticket commit "feat: create course recommendation endpoint"

# Test with actual API calls (manual)
# (Using curl or Postman, not Playwright)

# Verify (backend will skip Playwright)
/jira-ticket verify

# Merge
/jira-ticket merge

# Close
/jira-ticket close DDALKAK-8
```

---

## Blocking Rules

⚠️ **These actions will BLOCK execution:**

1. **Cannot merge without DoD**
   - Must complete `/jira-ticket verify` first
   - All 4 sections must be checked

2. **Cannot close without merge**
   - Ticket must exist in master branch
   - Verified by checking commit hash

3. **Cannot commit to master directly**
   - If on master: suggests feature branch
   - Automatically switches to feature branch

4. **Cannot start without clean master**
   - Requires: git pull origin master
   - Prevents stale base branch

---

## Smart Detection

The command automatically:

1. **Detects ticket ID from branch name**
   ```
   On branch: DDALKAK-5/course-generation-form
   Auto-extracts: DDALKAK-5
   ```

2. **Infers commit type from changes**
   ```
   New files → "feat:"
   Fixes only → "fix:"
   Refactor → "refactor:"
   Tests only → "test:"
   ```

3. **Detects frontend vs backend**
   ```
   Changes in src/components/ → Run Playwright tests
   Changes in backend/ → Skip Playwright, remind API testing
   ```

4. **Suggests next action**
   ```
   After commit → "Ready to verify DoD?"
   After verify → "Ready to merge?"
   After merge → "Update Jira ticket!"
   ```

---

## Configuration

Add to `.claude/settings.json`:

```json
{
  "skills": {
    "jira-ticket": {
      "default_remote": "origin",
      "default_base_branch": "master",
      "auto_delete_after_merge": true,
      "require_playwright_for_frontend": true,
      "dod_blocking": true
    }
  }
}
```

---

## Related

- Instinct: `jira-branch-naming`
- Instinct: `jira-commit-message-format`
- Instinct: `jira-dod-verification`
- Instinct: `git-master-push-only`
- Instinct: `playwright-required-for-frontend`
- Skill: `jira-ticket-workflow`

---

*Fast-track your Jira tickets with intelligent workflow automation.*
