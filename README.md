# Thomas Clark Resume API

This is a REST server and API for Thomas Clark's web resume.

## API

This API primarily manages 3 data types which can be accessed at their corresponding paths:

- **Portfolio Item:** `/portfolio`
- **Skill:**  `/skills`
- **Section:** `/sections`

Each of these data types have 4 routes:

| **Description**           | **Request Type** | Path   |
| ------------------------- | ---------------- | ------ |
| Fetch all instances       | GET              | `/`    |
| Fetch a specific instance | GET              | `/:id` |
| Create a new instance     | POST             | `/`    |
| Update an instance        | PUT              | `/`    |
| Delete an instance        | DELETE           | `/`    |

All routes other than those for fetching require an access key header in the request in order to be processed.