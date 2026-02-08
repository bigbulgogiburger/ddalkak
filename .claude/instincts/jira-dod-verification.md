---
id: jira-dod-verification
trigger: "when ready to merge feature branch or close Jira ticket"
confidence: 0.95
domain: "workflow"
source: "session-observation"
created: "2026-02-08"
---

# Always Verify Definition of Done Before Merge

## Action
Verify all DoD checklist items from CLAUDE.md before merging to master or closing Jira ticket.

## DoD Checklist (4 Sections)

### 1. Code Implementation
- [ ] Code written and committed to git
- [ ] Code follows TypeScript/language standards
- [ ] No console.log, debug code, or commented code left
- [ ] No security vulnerabilities introduced
- [ ] Linting passes: `npm run lint`
- [ ] Formatting passes: `npm run format:check`

### 2. Testing & Integration Verification
- [ ] Frontend: Use Playwright MCP to test (if UI changes)
- [ ] Backend: Test actual API calls (if API changes)
- [ ] Component renders correctly
- [ ] User interactions work (clicks, inputs, navigation)
- [ ] Error states handled
- [ ] Screenshots/videos captured showing working feature
- [ ] No console errors or warnings

### 3. Documentation
- [ ] Code comments added for complex logic
- [ ] Function/component types documented
- [ ] API responses documented (if applicable)

### 4. Jira Ticket Updates
- [ ] All DoD checklist items CHECKED in Jira
- [ ] Detailed completion comment added with test evidence
- [ ] Status transitioned to "완료" (Done)

## Evidence
- Mandatory requirement in CLAUDE.md
- Prevents incomplete features from reaching master
- Ensures quality and testing standards
- Provides evidence trail in Jira

## Implementation
When user indicates ticket is "done":
1. Ask to verify each section of DoD
2. Require confirmation for each checkbox
3. Prevent merge if any item is unchecked
4. Request screenshots/test results as evidence
5. Provide Jira comment template with checksums

## Example Jira Comment Template
```markdown
## ✅ DDALKAK-XX Complete - All DoD Items Verified

### Code Implementation
- ✅ Code committed: {commit-hash}
- ✅ ESLint: PASS
- ✅ Prettier: PASS
- ✅ No console logs or debug code

### Testing Verification
{Test results and screenshots here}

### DoD Verification
- ✅ Code implementation
- ✅ Testing complete
- ✅ Documentation added
- ✅ Ready for production
```

## Critical Rule
⚠️ **NEVER** merge or close ticket without ALL items checked

## Related Instincts
- `jira-branch-naming`
- `git-master-push-only`
- `playwright-required-for-frontend`
