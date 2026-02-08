---
id: git-master-push-only
trigger: "when completing work and preparing to merge"
confidence: 0.95
domain: "git-workflow"
source: "session-observation"
created: "2026-02-08"
---

# Only Merge to Master After DoD Verification and Rebase

## Action
Follow strict git workflow: never commit directly to master, always rebase before merge.

## Workflow (4 Steps)

### 1. Create Feature Branch from Latest Master
```bash
git checkout master
git pull origin master
git checkout -b DDALKAK-{number}/{description}
```

### 2. Work & Commit on Feature Branch
```bash
# Make changes
git add .
git commit -m "DDALKAK-5: feat: description"

# Push feature branch
git push origin DDALKAK-{number}/{description}
```

### 3. Verify DoD Checklist
Before merge, verify ALL items in `jira-dod-verification` instinct are complete.

### 4. Merge to Master
```bash
# Rebase to latest master (keep history clean)
git fetch origin
git rebase origin/master

# Switch to master and merge
git checkout master
git pull origin master
git merge DDALKAK-{number}/{description}

# Push to remote
git push origin master

# Cleanup: delete feature branch
git branch -d DDALKAK-{number}/{description}
git push origin --delete DDALKAK-{number}/{description}
```

## Critical Rules

### ⚠️ NEVER
- [ ] Commit directly to `master`
- [ ] Force push (`git push -f`) to shared branches
- [ ] Merge without DoD verification
- [ ] Leave feature branches unmerged > 7 days

### ✅ ALWAYS
- [ ] Create branch from latest `master`
- [ ] Rebase before merging (keep history clean)
- [ ] Use descriptive commit messages with DDALKAK-{number}
- [ ] Verify all DoD items before closing tickets
- [ ] Delete feature branch after merge

## Evidence
- Defined in CLAUDE.md Git Workflow section
- Prevents accidental commits to master
- Keeps commit history clean and linear
- Ensures only tested code reaches production
- Clear audit trail via ticket references

## Implementation
When user attempts to:
1. **Commit to master**: Suggest feature branch instead
2. **Merge without rebase**: Remind to rebase first
3. **Close ticket without DoD**: Block and list missing items
4. **Force push**: Warn about implications and suggest alternative

## Related Instincts
- `jira-branch-naming`
- `jira-commit-message-format`
- `jira-dod-verification`
