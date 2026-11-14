# Security Specification — Erka's Web Hub Leaderboard (`scores`)

## 1. Data Invariants
1. **No PII Exposure**: `/scores/{scoreId}` contains strictly non-PII game leaderboard metadata (`name`, `score`, `game`, `mode`, `date`, `createdAt`, `uid`). Email addresses or private account info are never stored in `scores`.
2. **Identity Integrity**: Every score document written must have a valid `scoreId` matching `^[a-zA-Z0-9_\\-]+$`, and `uid` must strictly equal `request.auth.uid` for verified users or `'guest'` for unauthenticated players.
3. **Strict Schema & No Shadow Fields**: `incoming().keys().hasAll(['name', 'score', 'game', 'mode', 'date', 'createdAt', 'uid'])` and `incoming().keys().hasOnly(['name', 'score', 'game', 'mode', 'date', 'createdAt', 'uid'])`.
4. **Domain & Boundary Validation**:
   - `name`: string, length `1..40`
   - `score`: integer/number, `0 <= score <= 5000`
   - `game`: `'Anime Guess'` or `'Sport Guess'`
   - `mode`: `'Classic'`, `'Timed'`, or `'Hard'`
   - `date`: string, length `8..40`
   - `createdAt`: must equal `request.time` (`incoming().createdAt == request.time`)
5. **Immutability**: Once a score is recorded, `update` is denied (scores are immutable historical records). Only authenticated score owners (`existing().uid == request.auth.uid`) may delete their own score if needed.
6. **Query Boundaries**: `list` queries on `/scores` are bounded (`request.query.limit <= 100`) and return validated non-PII score records (`resource.data.score >= 0`).

## 2. The "Dirty Dozen" Attack Payloads (Must Return `PERMISSION_DENIED`)
1. **Unauthenticated UID Spoofing**: Unauthenticated user submitting `uid: "otherUser123"` instead of `'guest'`.
2. **Authenticated Non-Owner Spoof**: Signed-in user submitting `uid: "otherUser123"` instead of their own `request.auth.uid`.
3. **Guest Deletion Attempt**: Unauthenticated or non-owner user trying to `delete` a score document.
4. **Shadow Field Injection**: Including extra field `isAdmin: true` or `verified: true`.
5. **Missing Required Field**: Omitting `mode` or `createdAt`.
6. **Client Timestamp Forgery**: Setting `createdAt` to a past/future client timestamp instead of `request.time`.
7. **Score Overflow / Negative Score**: Submitting `score: 999999` or `score: -50`.
8. **Float / Type Poisoning**: Submitting `score: "999"` or `name: 123`.
9. **Oversized Name / DoW Attack**: Submitting a 200KB string in `name` (`name.size() > 40`).
10. **Invalid Game or Mode Enum**: Submitting `game: "HackedGame"` or `mode: "GodMode"`.
11. **ID Poisoning**: Creating `/scores/bad$id!!` or 500-char document ID.
12. **Score Tampering via Update**: Attempting to `update` an existing score to increase `score`.
