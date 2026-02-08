---
id: playwright-required-for-frontend
trigger: "when working on frontend changes or UI components"
confidence: 0.9
domain: "testing"
source: "session-observation"
created: "2026-02-08"
---

# Always Use Playwright MCP for Frontend Testing

## Action
Verify all frontend changes using Playwright MCP before marking DoD complete.

## Required Tests

For every frontend change, test:

1. **Component Rendering**
   - Component loads without errors
   - Correct initial state displayed
   - Text/content displays correctly

2. **User Interactions**
   - Clicks trigger expected actions
   - Input fields accept user data
   - Forms can be submitted
   - Navigation works

3. **Responsive Design**
   - Mobile (375px width)
   - Tablet (768px width)
   - Desktop (1920px width)

4. **Error States**
   - Error messages display correctly
   - Validation works
   - Error UI is clear

5. **Visual Evidence**
   - Screenshots showing working feature
   - Snapshots of HTML structure
   - Video of user interaction (optional but recommended)

## Playwright MCP Tools to Use

| Tool | Purpose |
|------|---------|
| `browser_navigate` | Navigate to page URL |
| `browser_fill` | Fill input fields |
| `browser_click` | Click buttons/elements |
| `browser_snapshot` | Get accessibility tree |
| `browser_take_screenshot` | Capture visual proof |
| `browser_wait_for` | Wait for elements/text |
| `browser_press_key` | Simulate keyboard input |
| `browser_select_option` | Select dropdown options |

## Evidence Collection Checklist

- [ ] Snapshots: HTML structure verification
- [ ] Screenshots: Visual proof of working feature
- [ ] User interaction proof: Click/input/navigation working
- [ ] Error state testing: Error messages displayed
- [ ] Responsive testing: Mobile/tablet/desktop tested

## Implementation Workflow

When user makes frontend changes:

1. **Ask user to specify components/pages changed**
2. **Start dev server** if not running
3. **Navigate to page** using `browser_navigate`
4. **Test all interactions** with appropriate tools
5. **Capture evidence** (screenshots + snapshots)
6. **Verify responsive design** at multiple breakpoints
7. **Test error states** if applicable
8. **Save evidence** to project for documentation

## Examples

### Example 1: Form Component
```
/browser_navigate → http://localhost:3000/courses/new
/browser_fill → region input with "Seoul"
/browser_click → next button
/browser_take_screenshot → capture current state
/browser_wait_for → budget slider to appear
/browser_snapshot → verify form structure
```

### Example 2: Error Handling
```
/browser_fill → invalid email
/browser_click → submit
/browser_take_screenshot → capture error message
/browser_wait_for → "Invalid email" text
```

## Critical Rule

⚠️ **NEVER** mark frontend DoD as complete without Playwright verification

Frontend changes REQUIRE:
- Visual evidence (screenshots)
- Functional verification (user interactions)
- Responsive testing (multiple viewport sizes)
- Error state testing (if applicable)

## Related Instincts
- `jira-dod-verification`
- `definition-of-done-checklist`
