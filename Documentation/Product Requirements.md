# Product Requirements (User Side)

## 1. Authentication System
### User Story
- User wants to log into the system.
### User Flow
- Log In Page
### Implementation
- Built a `/login` endpoint.
- Use `pbkdf2` hash.
- Implement session by `express-session` Module.
- Reference [here](https://github.com/expressjs/express/blob/master/examples/auth/index.js)

---

## 2.Security
Restrict any unauthenticated users from acessing 'authenticated page' and 'authenticated resources'.
### User Story
### User Flow
### Implementation
- Build a middleware called `restrict()` to restrict any unauthenticated request.

--- 

## 3.Storage Operations
### User Story
### User Flow
### Implementation

---

## 4.Notification System
### User Story
### User Flow
### Implementation